"use client"

interface PreviewProps {
  content: string
}

export function Preview({ content }: PreviewProps) {
  if (!content) {
    return (
      <div className="text-muted-foreground text-center py-12">
        <p>开始编写内容，这里将实时显示预览</p>
      </div>
    )
  }

  return <div className="prose prose-invert max-w-none tiptap" dangerouslySetInnerHTML={{ __html: content }} />
}
