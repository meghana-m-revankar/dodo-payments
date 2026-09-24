import { useState } from 'react'
import './App.css'
declare global {
  interface Window {
    DodoCheckout: {
      open: (opts: {
        productId: string
        onSuccess: (d: { sessionId: string }) => void
        onClose:   (d: { reason: string }) => void
        onError:   (d: { code: string; message: string }) => void
      }) => void
    }
  }
}
interface LogEntry {
  type: 'success' | 'close' | 'error'
  message: string
  time: string
}

export default function App() {
 
  const [logs, setLogs] = useState<LogEntry[]>([])

  function addLog(type: LogEntry['type'], message: string) {
    const time = new Date().toLocaleTimeString()
    setLogs(prev => [{ type, message, time }, ...prev])
  }


  function handleBuy() {
    window.DodoCheckout.open({
      productId: 'prod_001',
      onSuccess: ({ sessionId }) => addLog('success', `Payment success • ${sessionId}`),
      onClose:   ({ reason })    => addLog('close',   `Modal closed • ${reason}`),
      onError:   ({ code, message }) => addLog('error', `Error • ${code}: ${message}`)
    })
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
           Pro Plan
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
            onClick={handleBuy}
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

      
  
    </div>
  )
}