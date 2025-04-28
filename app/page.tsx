import { Schedule } from "@/components/features/schedule-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="p-5 grid gap-6">
      <div>
        <h2 className="text-xl font-bold">Hello, world</h2>
        <p>
          {new Intl.DateTimeFormat("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date())}
        </p>
      </div>

      <div className="gap-2 flex items-center">
        <Input placeholder="Search..." />
        <Button>
          <SearchIcon />
        </Button>
      </div>

      <div>
        <h2 className="uppercase text-gray-400 text-sm font-bold mb-3">
          Agendamentos
        </h2>
        <Schedule />
      </div>
    </div>
  );
}
