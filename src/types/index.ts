export interface Product {
    id: string
    name: string
    price: number
    currency: string
  }
  
  export interface CardDetails {
    number: string
    expiry: string
    cvv: string
    name: string
    email: string
  }
  
  export type PaymentStatus = 
    | 'idle'
    | 'processing'
    | 'success'
    | 'failed'
    | 'declined'
  
  export interface CheckoutConfig {
    productId: string
    onSuccess: (data: { sessionId: string }) => void
    onClose: (data: { reason: string }) => void
    onError: (data: { code: string; message: string }) => void
  }


  