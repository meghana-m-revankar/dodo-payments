import { useState } from 'react'
import { CheckoutModal } from './components/CheckoutModal'
import type { Product, CheckoutConfig } from './types'
import './App.css'

interface LogEntry {
  type: 'success' | 'close' | 'error'
  message: string
  time: string
}

const product: Product = {
  id: 'prod_001',
  name: 'Pro Plan',
  price: 29.99,
  currency: 'USD'
}

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])

  function addLog(type: LogEntry['type'], message: string) {
    const time = new Date().toLocaleTimeString()
    setLogs(prev => [{ type, message, time }, ...prev])
  }

  const config: CheckoutConfig = {
    productId: product.id,
    onSuccess: ({ sessionId }) => {
      // wait for confetti + sweetalert to show first
      setTimeout(() => {
        addLog('success', `Payment success • ${sessionId}`)
        setShowModal(false)
      }, 2000)
    },
    onClose: ({ reason }) => {
      addLog('close', `Modal closed • ${reason}`)
    },
    onError: ({ code, message }) => {
      addLog('error', `Error • ${code}: ${message}`)
    }
  }

  function handleOpen() {
    if (showModal) return
    setShowModal(true)
  }

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>

  

      {/* CENTER CONTENT */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        padding: '40px 24px'
      }}>

        {/* PRODUCT CARD */}
        <div style={{
          background: 'white',
       
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-block',
            background: '#CFF16E',
            color: '#0E100C',
            padding: '4px 12px',
            borderRadius: '100px',
            fontSize: '12px',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            ✦ Most Popular
          </div>

          <h2 style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#0E100C',
            margin: '0 0 8px'
          }}>
            {product.name}
          </h2>

          <div style={{
            fontSize: '40px',
            fontWeight: '800',
            color: '#0E100C',
            margin: '0 0 4px'
          }}>
            $29.99
          </div>

          <p style={{
            color: '#888',
            fontSize: '13px',
            margin: '0 0 24px'
          }}>
            per month · cancel anytime
          </p>

          <button
            onClick={handleOpen}
            style={{
              width: '100%',
              background: '#0E100C',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '14px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              marginBottom: '12px'
            }}
          >
            Buy Now — $29.99/mo
          </button>

          <p style={{
            fontSize: '12px',
            color: '#aaa',
            margin: 0
          }}>
            🔒 Secured by Dodo Payments
          </p>
        </div>

        {/* EVENT LOG */}
        <div style={{
          width: '100%',
          maxWidth: '380px',
          background: '#0E100C',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <h3 style={{
            color: '#CFF16E',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: '0 0 12px'
          }}>
            ⚡ Live Event Log
          </h3>

          {logs.length === 0 ? (
            <p style={{ color: '#444', fontSize: '13px', margin: 0 }}>
              Click "Buy Now" to see events...
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {logs.map((log, i) => (
                <div key={i} style={{
                  padding: '8px 12px',
                  background: '#1a1a1a',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}>
                  <span style={{ color: '#CFF16E', fontWeight: '700' }}>
                    {log.type === 'success' && '✅ onSuccess'}
                    {log.type === 'close' && '🔒 onClose'}
                    {log.type === 'error' && '❌ onError'}
                  </span>
                  <span style={{ color: '#888', marginLeft: '8px' }}>
                    {log.message}
                  </span>
                  <span style={{ float: 'right', color: '#444', fontSize: '11px' }}>
                    {log.time}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <CheckoutModal
          product={product}
          config={config}
          onClose={() => {
            setShowModal(false)
            addLog('close', 'Modal closed • user_closed')
          }}
        />
      )}
    </div>
  )
}