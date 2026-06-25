import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { scrypt, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt)

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const key = await scryptAsync(password.normalize('NFKC'), salt, 64, {
    N: 16384, r: 16, p: 1, maxmem: 128 * 16384 * 16 * 2,
  }) as Buffer
  return `${salt}:${key.toString('hex')}`
}

async function main() {
  const postgres = (await import('postgres')).default
  const client = postgres(process.env.DATABASE_URL!, { prepare: false })

  const email = 'mad.allan2105@gmail.com'
  const password = 'Mad2005Allan!'

  await client`DELETE FROM "user" WHERE email = ${email}`

  const hashedPassword = await hashPassword(password)
  const userId = randomBytes(15).toString('hex')
  const accountId = randomBytes(15).toString('hex')

  await client`
    INSERT INTO "user" (id, name, email, email_verified, created_at, updated_at)
    VALUES (${userId}, 'Madiha', ${email}, true, NOW(), NOW())
  `
  await client`
    INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
    VALUES (${accountId}, ${userId}, 'credential', ${userId}, ${hashedPassword}, NOW(), NOW())
  `

  console.log('Done! Login with:')
  console.log('Email:', email)
  console.log('Password:', password)
  await client.end()
}

main().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1) })
