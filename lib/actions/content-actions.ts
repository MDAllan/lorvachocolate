'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db/client'
import { siteContent, auditLog } from '@/lib/db/schema'

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error('Unauthorized')
  return session
}

export async function updateSiteContent(key: string, value: string) {
  const session = await requireAdmin()

  const [before] = await db.select().from(siteContent).where(eq(siteContent.key, key)).limit(1)

  await db.update(siteContent)
    .set({ value, updatedAt: new Date() })
    .where(eq(siteContent.key, key))

  await db.insert(auditLog).values({
    actor: session.user.email,
    action: 'update_site_content',
    before: before?.value ?? null,
    after: value,
  })

  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath('/admin/content')
  return { success: true }
}
