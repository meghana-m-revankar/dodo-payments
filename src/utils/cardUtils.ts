export function detectCardType(number: string): 'visa' | 'mastercard' | 'unknown' {
    const digits = number.replace(/\D/g, '')
    
    if (digits.startsWith('4')) return 'visa'
    
    const mastercardPrefixes = ['51', '52', '53', '54', '55']
    if (mastercardPrefixes.some(prefix => digits.startsWith(prefix))) {
      return 'mastercard'
    }
    
    return 'unknown'
  }
  export function formatCardNumber(value: string): string {
    const digits = value.replace(/\D/g, '')
    return digits.slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
  }
  
  export function formatExpiry(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    
    if (digits.length >= 3) {
      return digits.slice(0, 2) + '/' + digits.slice(2, 4)
    }
    
    if (digits.length === 2) {
      return digits + '/'
    }
    
    return digits
  }
  
  export function validateCardNumber(number: string): boolean {
    const digits = number.replace(/\D/g, '')
    
    if (digits.length !== 16) return false
    
    let sum = 0
    let isEven = false
    
    for (let i = digits.length - 1; i >= 0; i--) {   //Luhn algorithm
      let digit = parseInt(digits[i])
      
      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      
      sum += digit
      isEven = !isEven
    }
    
    return sum % 10 === 0
  }
  export function validateName(name: string): boolean {
    const trimmed = name.trim()
    
    if (trimmed.length < 3) return false
    
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) return false
    
    return true
  }
  
  export function validateExpiry(expiry: string): boolean {
    const [month, year] = expiry.split('/')
    
    if (!month || !year) return false
    
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1
    
    const expMonth = parseInt(month)
    const expYear = parseInt(year)
    
    if (expMonth < 1 || expMonth > 12) return false
    
    if (expYear < currentYear) return false
    
    if (expYear === currentYear && expMonth < currentMonth) return false
    
    return true
  }