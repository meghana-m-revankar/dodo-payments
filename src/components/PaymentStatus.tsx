import { useEffect } from 'react'
import Swal from 'sweetalert2'
import confetti from 'canvas-confetti'
import type { PaymentStatus as Status } from '../types'

interface Props {
  status: Status
  errorMessage: string
  sessionId: string
  onReset: () => void
}

export function PaymentStatus({ status, errorMessage, onReset }: Props) {

  useEffect(() => {

    if (status === 'processing') {
      Swal.fire({
        title: 'Processing payment...',
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px 0">
            <div style="
              width:48px;height:48px;
              border:3px solid #e5e5e5;
              border-top-color:#0E100C;
              border-radius:50%;
              animation:spin 0.8s linear infinite;
            "></div>
            <p style="color:#888;font-size:14px;margin:0">
              Please don't close this window
            </p>
          </div>
          <style>
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          </style>
        `,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      })
    }

    if (status === 'success') {
      // fire confetti!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#CFF16E', '#0E100C', '#ffffff']
      })

      // second burst
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#CFF16E', '#0E100C']
        })
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#CFF16E', '#0E100C']
        })
      }, 200)

      Swal.fire({
        icon: 'success',
        title: 'Payment Successful! 🎉',
        html: `
          <p style="color:#666;margin-bottom:8px;font-size:14px">
            Your order is confirmed
          </p>
          
        `,
        confirmButtonText: 'Done ✓',
        confirmButtonColor: '#0E100C',
      })
    }

    if (status === 'declined') {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Card Declined',
        text: errorMessage,
        confirmButtonText: 'Try Another Card',
        confirmButtonColor: '#0E100C',
      }).then(() => onReset())
    }

    if (status === 'failed') {
      Swal.close()
      Swal.fire({
        icon: 'warning',
        title: 'Payment Failed',
        text: errorMessage,
        confirmButtonText: 'Retry Payment',
        confirmButtonColor: '#0E100C',
      }).then(() => onReset())
    }

  }, [status])

  return null
}