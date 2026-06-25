import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function main() {
  const { auth } = await import('./config')
  const result = await auth.api.signUpEmail({
    body: {
      email: 'mad.allan2105@gmail.com',
      password: 'Mad2005Allan!',
      name: 'Madiha',
    },
  })
  console.log('Created:', JSON.stringify(result))
}

main().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1) })
