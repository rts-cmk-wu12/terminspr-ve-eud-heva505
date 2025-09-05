// يبني SVG كـ data URL (يشتغل كمصدر صورة لأي عدد عناصر)

export function makeActivityPlaceholder(text = "A", {

  w = 356,          // عرض placeholder بالبكسل (طابق الكارد)

  h = 236,          // ارتفاع الصورة داخل الكارد

  radius = 24,      // تقويس الحواف (الكونتينر أصلاً فيه rounded، هذا احتياطي)

  fg = "#000000",   // لون النص (أسود شفاف)

  fgOpacity = 0.75,

  // تدرّج متناسق مع تصميمك (بنفس أجواء البنفسجي/الزهري)

  gradFrom = "#000000",

  gradFromOpacity = 1.0,

  gradTo = "#E1A1E9",

  gradToOpacity = 0.8,

} = {}) {

  const initials = (text || "A")

    .trim()

    .split(/\s+/)

    .slice(0, 2)

    .map(s => s[0]?.toUpperCase() || "")

    .join("") || "A";

  const svg = `
<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
<defs>
<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
<stop offset='0%' stop-color='${gradFrom}' stop-opacity='${gradFromOpacity}' />
<stop offset='100%' stop-color='${gradTo}' stop-opacity='${gradToOpacity}' />
</linearGradient>
</defs>
<rect x='0' y='0' width='${w}' height='${h}' rx='${radius}' ry='${radius}' fill='url(#g)' />
<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'

            font-family='ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto'

            font-size='${Math.round(h * 0.28)}'

            fill='${fg}' fill-opacity='${fgOpacity}'>

        ${initials}
</text>
</svg>`.trim();

  // نحولها لـ data URL

  const encoded = encodeURIComponent(svg)

    // تصليحات بسيطة للأحرف حتى تبقى أصغر

    .replace(/%20/g, " ")

    .replace(/%0A/g, "")

    .replace(/%3D/g, "=")

    .replace(/%3A/g, ":")

    .replace(/%2F/g, "/")

    .replace(/%22/g, "'");

  return `data:image/svg+xml;charset=utf-8,${encoded}`;

}
 