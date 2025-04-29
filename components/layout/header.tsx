import { MenuIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Logo } from '../ui/logo'
import Link from 'next/link'

export function Header() {
  return (
    <Card className="rounded-t-none">
      <CardContent className="flex flex-row items-center justify-between">
        <Link href="/">
          <Logo className="fill-primary h-12 w-32" />
        </Link>
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}
