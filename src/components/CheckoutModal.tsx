import { CardForm } from './CardForm'
import { PaymentStatus } from './PaymentStatus'
import { usePayment } from '../hooks/usePayment'
import type { CardDetails, CheckoutConfig, Product } from '../types'
import { Lock, Globe, ShieldCheck, X } from 'lucide-react'
interface Props {
  product: Product
  config: CheckoutConfig
  onClose: () => void
}

export function CheckoutModal({ product, config, onClose }: Props) {
  const { status, errorMessage, sessionId, processPayment, reset } = usePayment()

  async function handleSubmit(card: CardDetails) {
    const result = await processPayment(card)
  
    if (result?.success && result.sessionId) {
      setTimeout(() => {
        config.onSuccess({ sessionId: result.sessionId! })
      }, 1500)
    }
  
    if (result?.success === false && result.code) {
      config.onError({
        code: result.code,
        message: 'Payment could not be completed'
      })
    }
  }
  function handleClose() {
    config.onClose({ reason: 'user_closed' })
    onClose()
  }

  const isProcessing = status === 'processing'
  const showForm = status === 'idle' || status === 'processing'

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        {/* LEFT PANEL */}
        <div className="modal-left">
          <div className="modal-left-content">

            <div className="dodo-logo">
              <span>⬤</span>
              <span>Dodo Payments</span>
            </div>

            <div className="merchant-section">
  <p className="merchant-label">Paying to</p>
  <p className="merchant-name">AcmeStore</p>

  <div className="left-divider" style={{ margin: '16px 0' }} />

  <p className="product-name-left">{product.name}</p>
  <p className="product-price-left">${product.price.toFixed(2)}</p>
  <p className="product-period">per month · cancel anytime</p>
</div>
          

            <div className="trust-list">
  <div className="trust-item">
    <div className="trust-icon"><Lock size={14} /></div>
    <span className="light-text">256-bit SSL encryption</span>
  </div>
  <div className="trust-item">
    <div className="trust-icon"><ShieldCheck size={14} /></div>
    <span className="light-text">PCI DSS compliant</span>
  </div>
  <div className="trust-item">
    <div className="trust-icon"><Globe size={14} /></div>
    <span className="light-text">Accepted in 150+ countries</span>
  </div>
</div>

<div className="powered-by">
  <Lock size={12} />
  <span className="light-text">Secured & powered by</span>
  <span>Dodo Payments</span>
</div>

          </div>
        </div>

      {/* RIGHT PANEL */}
      <div className="modal-right">

{/* Header */}
<div className="modal-right-header">
  <div>
    <h3>Payment details</h3>
    <p className="modal-right-subtitle">
      Complete your purchase securely
    </p>
  </div>
  <button className="close-btn" onClick={handleClose}>
    <X size={16} />
  </button>
</div>

{/* SweetAlert trigger */}
<PaymentStatus
  status={status}
  errorMessage={errorMessage}
  sessionId={sessionId}
  onReset={reset}
/>

{/* Form */}
{showForm && (
  <CardForm
    onSubmit={handleSubmit}
    isProcessing={isProcessing}
  />
)}

</div>
      </div>
    </div>
  )
}