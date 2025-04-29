import { TattooStudio } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { StarIcon } from "lucide-react";

interface TattooStudioItemProps {
  tattooStudio: TattooStudio;
}
export function TattooStudioItem({ tattooStudio }: TattooStudioItemProps) {
  return (
    <Card className="min-w-44 p-0 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-40 w-full">
          <Badge variant="secondary" className="absolute top-2 left-2 z-10">
            <StarIcon className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5.0</p>
          </Badge>
          <Image
            src={tattooStudio.imageUrl}
            alt={tattooStudio.name}
            className="object-cover"
            fill={true}
          />
        </div>
        <div className="px-2 py-3 gap-1 flex flex-col">
          <h3 className="truncate font-semibold">{tattooStudio.name}</h3>
          <p className="truncate text-sm text-gray-400">
            {tattooStudio.address}
          </p>
          <Button variant="secondary" className="mt-3 w-full">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
