// Komponent / المكوّن الرئيسي
export default function LogoWordmark({
  className = "",
  style,
  align = "left",
  landrupWidth = 140,
  dansWidth = 200,
  barDarkWidth = 205,
}) {
  const alignClass = align === "center" ? "items-start" : "items-center";
  // UI
  return (
    <div
      className={`inline-flex flex-col ${alignClass} ${className}`}
      style={style}
    >
      <img
        src="/brand/LANDRUP.svg"
        alt="LANDRUP"
        style={{ width: landrupWidth }}
      />
      <img
        src="/brand/DANS.svg"
        alt="DANS"
        style={{ width: dansWidth, marginTop: -4 }}
      />
      <div
        className="mt-2 h-[6px] rounded-full bg-line shadow-[0_3px_0_rgba(0,0,0,0.25)]"
        style={{ width: barDarkWidth }}
      />
    </div>
  );
}
