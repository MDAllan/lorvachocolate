import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Hr,
} from '@react-email/components'
import { OrderFormValues } from '@/lib/validations/order'

export function OrderConfirmationEmail({ name, product, boxSize, quantity, pickupOrDelivery }: OrderFormValues) {
  return (
    <Html>
      <Body style={{ fontFamily: 'Georgia, serif', backgroundColor: '#F6EFE9', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px' }}>
          <Heading style={{ color: '#750A04', fontSize: '28px', margin: '0 0 8px' }}>
            Thank you, {name}!
          </Heading>
          <Text style={{ color: '#242121', fontSize: '16px', margin: '0 0 24px', lineHeight: '1.7' }}>
            We've received your order and will be in touch shortly to confirm the details and arrange {pickupOrDelivery}.
          </Text>

          <Hr style={{ borderColor: '#AC9A86', margin: '24px 0' }} />

          <Heading as="h2" style={{ color: '#242121', fontSize: '18px', margin: '0 0 16px' }}>
            Your Order
          </Heading>
          <Text style={{ color: '#242121', fontSize: '14px', margin: '0 0 8px' }}>
            <span style={{ color: '#AC9A86' }}>Product: </span>{product}
          </Text>
          <Text style={{ color: '#242121', fontSize: '14px', margin: '0 0 8px' }}>
            <span style={{ color: '#AC9A86' }}>Box Size: </span>{boxSize}
          </Text>
          <Text style={{ color: '#242121', fontSize: '14px', margin: '0 0 8px' }}>
            <span style={{ color: '#AC9A86' }}>Quantity: </span>{quantity}
          </Text>

          <Hr style={{ borderColor: '#AC9A86', margin: '24px 0' }} />

          <Text style={{ color: '#AC9A86', fontSize: '13px', lineHeight: '1.6' }}>
            Questions? Simply reply to this email or message us on WhatsApp. We typically respond within a few hours.
          </Text>

          <Text style={{ color: '#750A04', fontSize: '18px', marginTop: '32px' }}>
            — The Lorva Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
