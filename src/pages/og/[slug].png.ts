import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";
import { site } from "../../site";

/* Hex values copied from the palette in src/styles/global.css. Satori cannot read CSS variables. */
const ink950 = "#171724";
const indigo800 = "#222275";
const blue200 = "#b4c6ed";
const blue500 = "#133cd0";

const headings: Record<string, string> = {
	about: site.about.heading,
	initiatives: site.whatWeDo.heading,
	team: site.team.heading,
	faq: site.faq.heading,
};

export function getStaticPaths() {
	return Object.keys(headings).map((slug) => ({ params: { slug } }));
}

const fetchFont = async (weight: number) =>
	Buffer.from(
		await (
			await fetch(
				`https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-${weight}-normal.ttf`,
			)
		).arrayBuffer(),
	);

/* Module-level promise, so the four pages share one download. */
const fonts = Promise.all([fetchFont(400), fetchFont(800)]);

const card = (heading: string) => ({
	type: "div",
	props: {
		style: {
			width: "1200px",
			height: "630px",
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-end",
			padding: "80px",
			backgroundColor: ink950,
			backgroundImage: `radial-gradient(circle at 18% 12%, ${indigo800} 0%, transparent 65%)`,
			fontFamily: "Inter",
		},
		children: [
			{
				type: "div",
				props: {
					style: { display: "flex", alignItems: "center", gap: "16px" },
					children: [
						{
							type: "div",
							props: {
								style: {
									width: "14px",
									height: "14px",
									borderRadius: "7px",
									backgroundColor: blue500,
								},
							},
						},
						{
							type: "div",
							props: {
								style: {
									color: blue200,
									fontSize: "28px",
									letterSpacing: "8px",
								},
								children: site.name.toUpperCase(),
							},
						},
					],
				},
			},
			{
				type: "div",
				props: {
					style: {
						marginTop: "16px",
						color: "#ffffff",
						fontSize: "120px",
						fontWeight: 800,
						textTransform: "uppercase",
						letterSpacing: "-2px",
						lineHeight: 1.05,
					},
					children: heading,
				},
			},
		],
	},
});

export const GET: APIRoute = async ({ params }) => {
	const [regular, extrabold] = await fonts;
	const svg = await satori(card(headings[params.slug as string]), {
		width: 1200,
		height: 630,
		fonts: [
			{ name: "Inter", data: regular, weight: 400, style: "normal" },
			{ name: "Inter", data: extrabold, weight: 800, style: "normal" },
		],
	});
	const png = await sharp(Buffer.from(svg)).png().toBuffer();
	return new Response(png, { headers: { "Content-Type": "image/png" } });
};
