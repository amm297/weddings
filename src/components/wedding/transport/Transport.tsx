import { MapPin } from "lucide-react";
import { TransportLocation, TransportSection } from "@/db/wedding-model";

export function Transport({ section }: { section: TransportSection }) {
  const { fromLocations, toLocations } = section;

  const renderLocation = (
    location: TransportLocation,
    key: string,
    routeIndex: number | string | null
  ) => {
    return (
      <div
        key={key}
        className="flex flex-col gap-1 py-1"
        onClick={() => window.open(location.gmaps, "_blank")}
      >
        {routeIndex && <p className="text-left">Ruta {routeIndex}</p>}
        {location.name && (
          <div className="flex flex-row items-center hover:cursor-pointer ml-4">
            <div className="flex flex-1 flex-row gap-1 max-sm:flex-col">
              <p className="flex flex-row items-start text-left ">
                {location.name} - {location.stop}
              </p>
              <p>
                {location.stopHint && (
                  <span className="text-xs">{location.stopHint}</span>
                )}
              </p>
            </div>

            <p className="font-medium">{location.time}</p>
          </div>
        )}

        {location.route && (
          <div className="flex flex-col">
            {location.route.map((route: TransportLocation, index: number) =>
              renderLocation(
                route,
                `route-${location.name}-${key}-${index}`,
                null
              )
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 text-center ">
      <div
        className="flex 
          gap-10
          flex-row 
          max-sm:flex-col"
      >
        {fromLocations?.length > 0 && (
          <div className="flex-1">
            <p className="text-xl">Ida</p>
            {fromLocations?.map((location, index) =>
              renderLocation(location, `from-${index}`, index + 1)
            )}
          </div>
        )}
        {toLocations?.length > 0 && (
          <div className="flex-1">
            <p className="text-xl">Vuelta</p>
            {toLocations?.map((location, index) =>
              renderLocation(
                location,
                `to-${index}`,
                `${index + 1} - ${location.time}`
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
