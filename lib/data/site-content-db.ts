import { unstable_noStore as noStore } from 'next/cache'
import { db } from '@/lib/db/client'
import { siteContent } from '@/lib/db/schema'

export async function getSiteContent(): Promise<Record<string, string>> {
  noStore()
  const rows = await db.select().from(siteContent)
  return Object.fromEntries(rows.map(r => [r.key, r.value]))
}
