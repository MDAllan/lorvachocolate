import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
} from '@react-email/components'
import { OrderFormValues } from '@/lib/validations/order'

export function OrderNotificationEmail(order: OrderFormValues) {
  return (
    <Html>
      <Body style={{ fontFamily: 'Georgia, serif', backgroundColor: '#F6EFE9', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px' }}>
          <Heading style={{ color: '#750A04', fontSize: '28px', margin: '0 0 8px' }}>
            New Order — Lorva Chocolate
          </Heading>
          <Text style={{ color: '#AC9A86', fontSize: '14px', margin: '0 0 24px' }}>
            A new order has been placed. Please follow up with the customer.
          </Text>

          <Hr style={{ borderColor: '#AC9A86', margin: '24px 0' }} />

          <Section>
            <Heading as="h2" style={{ color: '#242121', fontSize: '18px', margin: '0 0 16px' }}>
              Customer Details
            </Heading>
            <Row label="Name" value={order.name} />
            <Row label="Email" value={order.email} />
            <Row label="Phone" value={order.phone} />
          </Section>

          <Hr style={{ borderColor: '#AC9A86', margin: '24px 0' }} />

          <Section>
            <Heading as="h2" style={{ color: '#242121', fontSize: '18px', margin: '0 0 16px' }}>
              Order Details
            </Heading>
            <Row label="Product" value={order.product} />
            <Row label="Box Size" value={order.boxSize} />
            <Row label="Quantity" value={String(order.quantity)} />
            <Row label="Pickup / Delivery" value={order.pickupOrDelivery} />
            {order.occasion && <Row label="Occasion" value={order.occasion} />}
            {order.notes && <Row label="Special Notes" value={order.notes} />}
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Text style={{ color: '#242121', fontSize: '14px', margin: '0 0 8px' }}>
      <span style={{ color: '#AC9A86', fontWeight: 600 }}>{label}: </span>
      {value}
    </Text>
  )
}
