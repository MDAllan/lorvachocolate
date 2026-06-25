/**
 * Run once to create the admin account:
 *   npx tsx lib/auth/seed-admin.ts
 *
 * Requires the dev server to be running (or set NEXT_PUBLIC_APP_URL to your deployed URL).
 * Make sure ADMIN_EMAIL and ADMIN_PASSWORD are set in .env.local before running.
 */
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'info@lorvachocolate.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!ADMIN_PASSWORD) {
  console.error('ADMIN_PASSWORD must be set in .env.local')
  process.exit(1)
}

async function seedAdmin() {
  console.log(`Creating admin account for ${ADMIN_EMAIL} at ${APP_URL}…`)

  const res = await fetch(`${APP_URL}/api/auth/sign-up/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      name: 'Madiha',
    }),
  })

  const body = await res.json()

  if (!res.ok) {
    console.error('Failed:', body)
    process.exit(1)
  }

  console.log('Admin account created successfully:', body)
}

seedAdmin()
