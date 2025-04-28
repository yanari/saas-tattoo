import { Schedule } from "@/components/features/schedule-item";
import { TattooStudioItem } from "@/components/features/tattoo-studio-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/prisma";
import { TattooStudio } from "@prisma/client";
import { SearchIcon } from "lucide-react";

export default async function Home() {
  const tattooStudios: TattooStudio[] = await db.tattooStudio.findMany();
  console.log({ tattooStudios });
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

      <div>
        <h2 className="uppercase text-gray-400 text-sm font-bold mb-3">
          Recomendados
        </h2>
        <div className="flex gap-4">
          {tattooStudios.map((tattooStudio) => (
            <TattooStudioItem
              key={tattooStudio.id}
              tattooStudio={tattooStudio}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
