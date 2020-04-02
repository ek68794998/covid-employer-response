export type CitationType =
	"hearsay"
	| "statement"
	| "publication";

export const getCitationTypeValue = (type?: CitationType): number => {
	switch (type) {
		case "hearsay": return 0;
		case "statement": return 10;
		case "publication": return 20;
		default: return -1;
	}
};
