import { SectionStyle } from "@/db";

export function ImageBackground({
  image,
  imagePosition,
  overlay,
  noRepeat,
}: SectionStyle) {
  if (imagePosition !== "background") return <></>;

  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `url(${image})`,
        ...(!noRepeat && {
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }),
      }}
    >
      {overlay && <div className="absolute inset-0 bg-overlay/[60%]" />}
    </div>
  );
}
