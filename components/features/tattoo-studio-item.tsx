import { TattooStudio } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

interface TattooStudioItemProps {
  tattooStudio: TattooStudio;
}
export function TattooStudioItem({ tattooStudio }: TattooStudioItemProps) {
  return (
    <Card className="min-w-full max-w-full">
      <CardContent className="p-0">
        <div className="relative h-40">
          <Image
            src={tattooStudio.imageUrl}
            alt={tattooStudio.name}
            className="object-cover"
            fill={true}
          />
        </div>
        <h2 className="text-xl font-bold">{tattooStudio.name}</h2>
      </CardContent>
    </Card>
  );
}
