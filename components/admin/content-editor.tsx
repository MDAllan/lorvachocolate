'use client'

import { useState, useTransition } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { updateSiteContent } from '@/lib/actions/content-actions'
import { ImageUploader } from '@/components/admin/image-uploader'
import type { siteContent } from '@/lib/db/schema'
import type { InferSelectModel } from 'drizzle-orm'

type ContentRow = InferSelectModel<typeof siteContent>

const SECTION_LABELS: Record<string, string> = {
  hero:       'Hero',
  featured:   'Featured Products',
  manifesto:  'Brand Story',
  process:    'Craft Process',
  gallery:    'Gallery Teaser',
  services:   'Services',
  navigation: 'Navigation',
  footer:     'Footer',
  seo:        'SEO & Metadata',
  cta:        'Call to Action',
}

export function ContentEditor({ rows }: { rows: ContentRow[] }) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(rows.map(r => [r.key, r.value]))
  )

  const sections = [...new Set(rows.map(r => r.section))]
  const bySection = Object.fromEntries(
    sections.map(s => [s, rows.filter(r => r.section === s)])
  )

  function handleSave(key: string) {
    startTransition(async () => {
      try {
        await updateSiteContent(key, values[key] ?? '')
        toast({ title: 'Saved!' })
      } catch {
        toast({ title: 'Error saving', variant: 'destructive' })
      }
    })
  }

  if (rows.length === 0) {
    return (
      <div className="text-center py-20 border border-taupe/20 bg-white/50">
        <p className="font-cormorant text-2xl text-taupe">No content rows found</p>
        <p className="font-inter text-sm text-taupe/60 mt-2">
          Run the seed script to populate initial content:
        </p>
        <code className="block mt-3 font-mono text-xs text-deep-cocoa bg-vanilla px-4 py-2 inline-block">
          npx tsx lib/db/seed-content.ts
        </code>
      </div>
    )
  }

  return (
    <Tabs defaultValue={sections[0]} className="space-y-4">
      <TabsList className="flex-wrap h-auto gap-1">
        {sections.map(s => (
          <TabsTrigger key={s} value={s} className="font-inter text-xs tracking-wide">
            {SECTION_LABELS[s] ?? s}
          </TabsTrigger>
        ))}
      </TabsList>

      {sections.map(section => (
        <TabsContent key={section} value={section}>
          <div className="space-y-6">
            {bySection[section].map(row => {
              const isImage = row.key.endsWith('_image')
              return (
                <div key={row.key} className="bg-white border border-taupe/20 p-5 space-y-3">
                  <div>
                    <p className="font-inter text-sm font-medium text-deep-cocoa">{row.label}</p>
                    <p className="font-inter text-xs text-taupe/60 font-mono">{row.key}</p>
                  </div>

                  {isImage ? (
                    <ImageUploader
                      contentKey={row.key}
                      currentUrl={values[row.key] ?? ''}
                      label={row.label}
                    />
                  ) : (
                    <>
                      <Textarea
                        value={values[row.key] ?? ''}
                        onChange={e => setValues(prev => ({ ...prev, [row.key]: e.target.value }))}
                        rows={(values[row.key] ?? '').length > 80 ? 3 : 1}
                        className="font-inter text-sm resize-none"
                      />
                      <Button
                        onClick={() => handleSave(row.key)}
                        disabled={isPending}
                        size="sm"
                        className="bg-cocoa-wine hover:bg-cocoa-wine/80 text-cream rounded-none font-inter text-xs tracking-widest uppercase px-6"
                      >
                        {isPending ? 'Saving…' : 'Save'}
                      </Button>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
