import { MapPin } from "lucide-react";
import { TransportLocation, TransportSection } from "@/db/wedding-model";
import { Fragment } from "react";

export function Transport({ section }: { section: TransportSection }) {
  const { fromLocations, toLocations } = section;

  const renderLocation = (location: TransportLocation, key: string) => {
    return (
      <div
        key={key}
        className="flex flex-col gap-1 py-1"
        onClick={() => window.open(location.gmaps, "_blank")}
      >
        <div className="flex flex-row items-center gap-2 hover:cursor-pointer">
          <MapPin className="w-4 h-4" />
          <p>
            {location.name} - {location.stop}
          </p>
          <p>{location.time}</p>
        </div>

        {location.route && (
          <div className="flex flex-col gap-1 ml-6">
            {location.route.map((route: TransportLocation, index: number) =>
              renderLocation(route, `route-${location.name}-${key}-${index}`)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 text-center ">
      <div className="flex items-start p-2 gap-2  flex-row max-sm:flex-col">
        <div className=" flex-1">
          <p className="text-xl">Ida</p>
          {fromLocations.map((location, index) =>
            renderLocation(location, `from-${index}`)
          )}
        </div>
        <div className=" flex-1">
          <p className="text-xl">Vuelta</p>
          {toLocations.map((location, index) =>
            renderLocation(location, `to-${index}`)
          )}
        </div>
      </div>
    </div>
  );
}
