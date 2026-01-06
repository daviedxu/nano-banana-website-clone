import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type ImagePart = {
  type: 'image_url'
  image_url: { url: string }
}

function toDataUrl(file: File) {
  if (!file.type || !file.type.startsWith('image/')) {
    throw new Error('Only image files are supported')
  }

  return file.arrayBuffer().then((buf) => {
    const base64 = Buffer.from(buf).toString('base64')
    return `data:${file.type};base64,${base64}`
  })
}

function extractImagesFromCompletion(payload: unknown): string[] {
  const images: string[] = []

  const p = payload as any
  const choices = Array.isArray(p?.choices) ? p.choices : []

  for (const choice of choices) {
    const message = choice?.message

    const msgImages = Array.isArray(message?.images) ? message.images : []
    for (const img of msgImages) {
      const url = img?.image_url?.url
      if (typeof url === 'string' && (url.startsWith('data:image/') || url.startsWith('http')))
        images.push(url)
    }

    const content = message?.content
    if (Array.isArray(content)) {
      for (const part of content) {
        const url = part?.image_url?.url
        if (typeof url === 'string' && (url.startsWith('data:image/') || url.startsWith('http')))
          images.push(url)
      }
    }
  }

  return images
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing OPENROUTER_API_KEY in .env.local' },
        { status: 500 },
      )
    }

    const form = await req.formData()
    const prompt = String(form.get('prompt') ?? '').trim()
    const model = String(form.get('model') ?? 'google/gemini-2.5-flash-image').trim()
    const files = form.getAll('images').filter((v): v is File => v instanceof File)

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
    }

    if (files.length === 0) {
      return NextResponse.json({ error: 'Missing images' }, { status: 400 })
    }

    if (model !== 'google/gemini-2.5-flash-image') {
      return NextResponse.json({ error: 'Unsupported model' }, { status: 400 })
    }

    const maxImages = 3
    const limitedFiles = files.slice(0, maxImages)
    const imageDataUrls = await Promise.all(limitedFiles.map((f) => toDataUrl(f)))

    const referer =
      process.env.OPENROUTER_HTTP_REFERER ??
      req.headers.get('origin') ??
      req.headers.get('referer') ??
      'http://localhost:3000'

    const title = process.env.OPENROUTER_X_TITLE ?? 'Nano Banana'

    const content: Array<{ type: 'text'; text: string } | ImagePart> = [
      { type: 'text', text: prompt },
      ...imageDataUrls.map(
        (url): ImagePart => ({
          type: 'image_url',
          image_url: { url },
        }),
      ),
    ]

    const upstreamRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': referer,
        'X-Title': title,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are an image editor. Return an edited image as the primary output. Keep the subject consistent unless the user requests otherwise.',
          },
          {
            role: 'user',
            content,
          },
        ],
        modalities: ['image', 'text'],
        stream: false,
      }),
      cache: 'no-store',
    })

    const upstreamJson = await upstreamRes.json().catch(() => null)

    if (!upstreamRes.ok) {
      const message =
        upstreamJson?.error?.message ||
        upstreamJson?.error ||
        upstreamJson?.message ||
        `OpenRouter error (${upstreamRes.status})`

      return NextResponse.json(
        { error: typeof message === 'string' ? message : 'OpenRouter error' },
        { status: 502 },
      )
    }

    const images = extractImagesFromCompletion(upstreamJson)

    if (images.length === 0) {
      return NextResponse.json(
        {
          error:
            'No images returned. Make sure your prompt requests an image output and the model supports image generation.',
        },
        { status: 502 },
      )
    }

    return NextResponse.json({ images })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
