import { Card, CardContent } from '../ui/card'

export function Footer() {
  return (
    <footer className="mt-8">
      <Card className="rounded-b-none font-mono">
        <CardContent>
          © {new Date().getFullYear()} Copyright InkBookd
        </CardContent>
      </Card>
    </footer>
  )
}
