import { Card, CardContent } from "../ui/card";

export function Footer() {
  return (
    <footer>
      <Card className="rounded-b-none font-mono">
        <CardContent>
          © {new Date().getFullYear()} Copyright InkBook
        </CardContent>
      </Card>
    </footer>
  );
}
