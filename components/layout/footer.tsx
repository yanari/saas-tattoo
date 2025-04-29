import { Card, CardContent } from "../ui/card";

export function Footer() {
  return (
    <footer className="">
      <Card className="rounded-b-none">
        <CardContent>
          © {new Date().getFullYear()} Copyright InkBook
        </CardContent>
      </Card>
    </footer>
  );
}
