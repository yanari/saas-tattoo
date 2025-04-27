import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Logo } from "../svgs/logo";

export function Header() {
  return (
    <Card className="rounded-none">
      <CardContent className="flex flex-row items-center justify-between ">
        <Logo className="fill-primary h-12 w-32" />
        <Button size="icon" variant={"outline"}>
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
