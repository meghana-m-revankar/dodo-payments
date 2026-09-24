import { useState } from 'react'
import {
  validateCardNumber,
  detectCardType,
  validateExpiry,
  validateName,
  formatCardNumber,
  formatExpiry
} from '../utils/cardUtils'
import type { CardDetails } from '../types'

interface Props {
  onSubmit: (card: CardDetails) => void
  isProcessing: boolean
}

export function CardForm({ onSubmit, isProcessing }: Props) {
  const [card, setCard] = useState<CardDetails>({
    number: '',
    name: '',
    email: '',
    expiry: '',
    cvv: ''
  })

  const [errors, setErrors] = useState<Partial<CardDetails>>({})

  const cardType = detectCardType(card.number)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    let formatted = value

    if (name === 'number') formatted = formatCardNumber(value)
    if (name === 'expiry') formatted = formatExpiry(value)

    setCard(prev => ({ ...prev, [name]: formatted }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function validate(): boolean {
    const newErrors: Partial<CardDetails> = {}

    if (!validateCardNumber(card.number.replace(/\s/g, '')))
      newErrors.number = 'Invalid card number'

    if (!validateName(card.name))
      newErrors.name = 'Name must be letters only, min 3 characters'

    if (!validateExpiry(card.expiry))
      newErrors.expiry = 'Invalid or expired date'

    if (card.cvv.length < 3)
      newErrors.cvv = 'CVV must be 3 or 4 digits'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onSubmit(card)
  }

  return (
    <form onSubmit={handleSubmit} className="card-form">

      {/* Card Number */}
      <div className="field">
        <label>Card Number</label>
        <div className="input-with-icon">
          <input
            name="number"
            value={card.number}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
         <span className="card-badge">{cardType}</span>
        </div>
        {errors.number && <p className="error">{errors.number}</p>}
      </div>

      {/* Name */}
      <div className="field">
        <label>Cardholder Name</label>
        <input
          name="name"
          value={card.name}
          onChange={handleChange}
          placeholder="John Smith"
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
{/* Email */}
<div className="field">
  <label>Email</label>
  <input
    name="email"
    type="email"
    value={card.email}
    onChange={handleChange}
    placeholder="john@example.com"
  />
  {errors.email && <p className="error">{errors.email}</p>}
</div>
      {/* Expiry + CVV */}
      <div className="field-row">
        <div className="field">
          <label>Expiry</label>
          <input
  name="expiry"
  value={card.expiry}
  onChange={handleChange}
  onKeyDown={(e) => {
    // allow backspace to delete slash cleanly
    if (e.key === 'Backspace' && card.expiry.endsWith('/')) {
      e.preventDefault()
      setCard(prev => ({ ...prev, expiry: prev.expiry.slice(0, -1) }))
    }
  }}
  placeholder="MM/YY"
  maxLength={5}
/>
          {errors.expiry && <p className="error">{errors.expiry}</p>}
        </div>

        <div className="field">
          <label>CVV</label>
          <input
            name="cvv"
            value={card.cvv}
            onChange={handleChange}
            placeholder="123"
            maxLength={4}
            type="password"
          />
          {errors.cvv && <p className="error">{errors.cvv}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="pay-button"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>

    </form>
  )
}