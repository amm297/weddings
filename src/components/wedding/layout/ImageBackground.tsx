import { SectionStyle } from "@/db";

export function ImageBackground({
  image,
  imagePosition,
  overlay,
}: SectionStyle) {
  
  if (imagePosition !== "background") return <></>;

  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "100%",
        backgroundPosition: "center",
      }}
    >
      {overlay && <div className="absolute inset-0 bg-overlay/[74%]" />}
    </div>
  );
}
