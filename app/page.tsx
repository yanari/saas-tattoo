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
    <div className="flex flex-col gap-6 py-6">
      <div className="px-6">
        <h2 className="text-xl font-bold">Hello, Marcelle</h2>
        <p>
          {new Intl.DateTimeFormat("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date())}
        </p>
      </div>

      <div className="px-6 gap-4 flex items-center">
        <Input placeholder="Search..." />
        <Button>
          <SearchIcon />
        </Button>
      </div>

      <div className="px-6">
        <h2 className="uppercase text-gray-400 text-sm font-bold mb-3">
          Agendamentos
        </h2>
        <Schedule />
      </div>

      <div>
        <h2 className="px-6 uppercase text-gray-400 text-sm font-bold mb-3">
          Recomendados
        </h2>
        <div className="pl-6 flex gap-4 max-w-full overflow-auto [&::-webkit-scrollbar]:hidden">
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
