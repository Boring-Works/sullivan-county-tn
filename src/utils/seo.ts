export const SITE_URL = "https://sullivan-county-tn.codyboring.workers.dev";
export const SITE_NAME = "Sullivan County, Tennessee";

interface SeoOptions {
	title: string;
	description: string;
	image?: string;
	url?: string;
	type?: "website" | "article";
	publishedTime?: string;
}

export function seo({ title, description, image, url, type = "website", publishedTime }: SeoOptions) {
	const ogImage = image?.startsWith("http")
		? image
		: `${SITE_URL}${image || "/images/og/og-default.jpg"}`;
	const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL;

	const meta = [
		{ title },
		{ name: "description", content: description },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:image", content: ogImage },
		{ property: "og:image:width", content: "1200" },
		{ property: "og:image:height", content: "630" },
		{ property: "og:url", content: canonicalUrl },
		{ property: "og:site_name", content: SITE_NAME },
		{ property: "og:type", content: type },
		{ property: "og:locale", content: "en_US" },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: ogImage },
	];

	if (type === "article" && publishedTime) {
		meta.push({ property: "article:published_time", content: publishedTime });
	}

	return meta;
}

export function seoLinks(url?: string) {
	const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL;
	return [{ rel: "canonical", href: canonicalUrl }];
}
