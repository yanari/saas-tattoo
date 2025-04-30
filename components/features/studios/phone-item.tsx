'use client'

import { SmartphoneIcon } from 'lucide-react'
import { Button } from '../../ui/button'
import { toast } from 'sonner'

export function PhoneItem({ phone }: { phone: string }) {
  const handleCopyToClipboard = async () => {
    const formattedPhone = phone.replace(/\D/g, '')
    await navigator.clipboard.writeText(formattedPhone)
    toast.success('Telefone copiado para a área de transferência.')
  }
  return (
    <div className="flex justify-between" key={phone}>
      <div className="flex items-center gap-2">
        <SmartphoneIcon className="text-primary" />
        <p className="font-mono">{phone}</p>
      </div>
      <Button variant="outline" onClick={handleCopyToClipboard}>
        Copiar
      </Button>
    </div>
  )
}
