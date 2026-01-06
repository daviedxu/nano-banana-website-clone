'use client'

import type React from 'react'

import { useEffect, useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Download, Loader2, Sparkles, Trash2, Upload, X } from 'lucide-react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

type ModelId = 'google/gemini-2.5-flash-image'

type UploadedImage = {
  id: string
  file: File
  previewUrl: string
}

type OutputImage = {
  id: string
  dataUrl: string
}

function makeId(prefix: string) {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`
  )
}

export function Generator() {
  const { toast } = useToast()

  const [model, setModel] = useState<ModelId>('google/gemini-2.5-flash-image')
  const [images, setImages] = useState<UploadedImage[]>([])
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [output, setOutput] = useState<OutputImage[]>([])
  const [selectedOutputId, setSelectedOutputId] = useState<string | null>(null)

  const selectedOutput = useMemo(
    () =>
      output.find((o) => o.id === selectedOutputId) ?? output[0] ?? null,
    [output, selectedOutputId],
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList) return

    const incoming = Array.from(fileList)
    const maxFiles = 6
    const maxBytes = 10 * 1024 * 1024

    setImages((prev) => {
      const next: UploadedImage[] = [...prev]

      for (const file of incoming) {
        if (!file.type.startsWith('image/')) continue

        if (file.size > maxBytes) {
          toast({
            variant: 'destructive',
            title: '图片过大',
            description: `“${file.name}” 超过 10MB，已跳过`,
          })
          continue
        }

        if (next.length >= maxFiles) {
          toast({
            variant: 'destructive',
            title: '图片数量过多',
            description: `最多支持 ${maxFiles} 张图片`,
          })
          break
        }

        next.push({
          id: makeId('img'),
          file,
          previewUrl: URL.createObjectURL(file),
        })
      }

      return next
    })

    e.target.value = ''
  }

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl))
    }
  }, [images])

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((p) => p.id === id)
      if (target) URL.revokeObjectURL(target.previewUrl)
      return prev.filter((p) => p.id !== id)
    })
  }

  const clearImages = () => {
    setImages((prev) => {
      prev.forEach((img) => URL.revokeObjectURL(img.previewUrl))
      return []
    })
  }

  const onGenerate = async () => {
    const trimmedPrompt = prompt.trim()

    if (images.length === 0) {
      toast({
        variant: 'destructive',
        title: '请先上传图片',
        description: '点击 Add Image 上传 1 张或多张图片',
      })
      return
    }

    if (!trimmedPrompt) {
      toast({
        variant: 'destructive',
        title: '请输入提示词',
        description: '在 Main Prompt 中输入你想要的编辑指令',
      })
      return
    }

    setIsGenerating(true)
    setOutput([])
    setSelectedOutputId(null)

    try {
      const formData = new FormData()
      formData.set('prompt', trimmedPrompt)
      formData.set('model', model)
      images.forEach((img) => formData.append('images', img.file))

      const res = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      })

      const data = (await res.json()) as {
        images?: string[]
        error?: string
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Request failed')
      }

      const out = (data.images ?? []).map((dataUrl) => ({
        id: makeId('out'),
        dataUrl,
      }))

      if (out.length === 0) {
        throw new Error('No image returned from API')
      }

      setOutput(out)
      setSelectedOutputId(out[0]?.id ?? null)
      toast({ title: '生成成功', description: `已返回 ${out.length} 张图片` })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: '生成失败',
        description: err instanceof Error ? err.message : '未知错误',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section id="generator" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Started</h2>
          <p className="text-xl text-muted-foreground">Try The AI Editor</p>
          <p className="text-muted-foreground mt-2">
            Experience the power of nano-banana&apos;s natural language image
            editing. Transform any photo with simple text commands.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Prompt Engine
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Transform your image with AI-powered editing
            </p>

            <div className="space-y-6">
              <div>
                <Label htmlFor="model" className="text-sm font-medium mb-2 block">
                  AI Model Selection
                </Label>
                <Select value={model} onValueChange={(v) => setModel(v as ModelId)}>
                  <SelectTrigger id="model" className="w-full">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google/gemini-2.5-flash-image">
                      Gemini 2.5 Flash Image (Nano Banana)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Powered by OpenRouter. Your API key stays on the server.
                </p>
              </div>

              <div>
                <Label
                  htmlFor="image-upload"
                  className="text-sm font-medium mb-2 block"
                >
                  Reference Image
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isGenerating}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Add Image</p>
                    <p className="text-xs text-muted-foreground mt-1">Max 10MB</p>
                    {images.length > 0 && (
                      <p className="text-xs text-primary mt-2">
                        {images.length} image(s) selected
                      </p>
                    )}
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-muted-foreground">
                        Preview (click × to remove)
                      </p>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={clearImages}
                        className="bg-transparent"
                        disabled={isGenerating}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {images.map((img) => (
                        <div key={img.id} className="relative group">
                          <img
                            src={img.previewUrl}
                            alt={img.file.name}
                            className="w-full aspect-square object-cover rounded-md border border-border"
                          />
                          <button
                            type="button"
                            aria-label="Remove image"
                            onClick={() => removeImage(img.id)}
                            className="absolute top-1 right-1 rounded-full bg-background/80 border border-border p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={isGenerating}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="prompt" className="text-sm font-medium mb-2 block">
                  Main Prompt
                </Label>
                <Textarea
                  id="prompt"
                  placeholder='E.g. "Make it cinematic with warm tones, keep the subject the same."'
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-32 resize-none"
                  disabled={isGenerating}
                />
              </div>

              <Button
                type="button"
                onClick={onGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Now
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-accent/50">
            <h3 className="text-2xl font-semibold mb-6">Output Gallery</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Your AI results appear here
            </p>

            {selectedOutput ? (
              <div className="space-y-4">
                <div className="aspect-square bg-background rounded-lg border border-border overflow-hidden">
                  <img
                    src={selectedOutput.dataUrl}
                    alt="Generated"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 flex-wrap">
                  <Button asChild variant="outline" size="sm" className="bg-transparent">
                    <a href={selectedOutput.dataUrl} download="nano-banana-output.png">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>

                {output.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {output.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setSelectedOutputId(o.id)}
                        className={[
                          'rounded-md overflow-hidden border transition-colors bg-background',
                          selectedOutputId === o.id
                            ? 'border-primary'
                            : 'border-border hover:border-primary/50',
                        ].join(' ')}
                      >
                        <img
                          src={o.dataUrl}
                          alt="Output thumbnail"
                          className="w-full aspect-square object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-square bg-background rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="text-6xl mb-4">🍌</div>
                  <p className="font-medium">Ready for generation</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Upload image(s) + enter prompt, then click Generate Now
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}

