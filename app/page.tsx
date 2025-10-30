"use client"

import { useState } from "react"
import { Editor } from "@/components/editor"
import { Preview } from "@/components/preview"
import { Button } from "@/components/ui/button"
import { FileText, Eye } from "lucide-react"

export default function Home() {
  const [content, setContent] = useState("")
  const [documents, setDocuments] = useState<Array<{ id: string; title: string; content: string; date: string }>>([])
  const [showPreview, setShowPreview] = useState(false)

  const handlePublish = () => {
    if (!content.trim()) return

    const newDoc = {
      id: Date.now().toString(),
      title: content.split("\n")[0].replace(/^#\s*/, "").slice(0, 50) || "无标题文档",
      content,
      date: new Date().toLocaleDateString("zh-CN"),
    }

    setDocuments([newDoc, ...documents])
    setContent("")
    setShowPreview(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            <h1 className="text-xl font-bold">文档编辑器</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={showPreview ? "default" : "outline"}
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? "编辑模式" : "预览模式"}
            </Button>
            <Button onClick={handlePublish} size="sm">
              发布文档
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-muted-foreground">编辑区</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 min-h-[600px]">
              <Editor content={content} onChange={setContent} />
            </div>
          </div>

          {/* Preview/Documents Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-muted-foreground">{showPreview ? "实时预览" : "已发布文档"}</h2>
            </div>

            {showPreview ? (
              <div className="bg-card border border-border rounded-lg p-6 min-h-[600px]">
                <Preview content={content} />
              </div>
            ) : (
              <div className="space-y-4">
                {documents.length === 0 ? (
                  <div className="bg-card border border-border rounded-lg p-12 text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">暂无已发布的文档</p>
                    <p className="text-sm text-muted-foreground mt-2">开始编写并发布你的第一篇文档</p>
                  </div>
                ) : (
                  documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors cursor-pointer"
                      onClick={() => {
                        setContent(doc.content)
                        setShowPreview(true)
                      }}
                    >
                      <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground">{doc.date}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
