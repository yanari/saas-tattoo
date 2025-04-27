import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Hello, world</h2>
      <p>
        {new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date())}
      </p>

      <div className="mt-6 gap-2 flex items-center">
        <Input placeholder="Search..." />
        <Button>
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
}
