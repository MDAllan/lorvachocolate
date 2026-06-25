import { db } from '@/lib/db/client'
import { siteContent } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'
import { ContentEditor } from '@/components/admin/content-editor'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Site Content | Admin' }

export default async function AdminContentPage() {
  const rows = await db.select().from(siteContent).orderBy(asc(siteContent.section))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cormorant text-3xl text-deep-cocoa">Site Content</h1>
        <p className="font-inter text-sm text-taupe mt-1">
          Edit text across your website. Changes are reflected immediately — no rebuild needed.
        </p>
      </div>
      <ContentEditor rows={rows} />
    </div>
  )
}
