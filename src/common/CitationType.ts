export type CitationType =
	"hearsay"
	| "independentNews"
	| "publishedNews";

export const GetCitationTypeValue = (type?: CitationType): number => {
	switch (type) {
		case "hearsay": return 0;
		case "independentNews": return 10;
		case "publishedNews": return 20;
		default: return 0;
	}
};
