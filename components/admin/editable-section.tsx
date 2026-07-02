import { Pencil } from 'lucide-react'

interface EditableSectionProps {
  children: React.ReactNode
  isAdmin: boolean
  section: string
  label?: string
  anchorKey?: string
}

export function EditableSection({ children, isAdmin, section, label, anchorKey }: EditableSectionProps) {
  if (!isAdmin) return <>{children}</>

  const editUrl = `/admin/content?section=${section}${anchorKey ? `&key=${anchorKey}` : ''}`

  return (
    <div className="relative group/editable">
      {children}
      <a
        href={editUrl}
        className="absolute top-3 right-3 z-50 opacity-0 group-hover/editable:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 bg-cocoa-wine text-cream text-[10px] font-inter tracking-[0.25em] uppercase shadow-lg hover:bg-cocoa-wine/80 transition-colors"
      >
        <Pencil className="h-3 w-3" />
        Edit {label ?? section}
      </a>
    </div>
  )
}
