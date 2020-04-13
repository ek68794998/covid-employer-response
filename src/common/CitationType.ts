export const CitationTypeValues: string[] = [
	"hearsay",
	"statement",
	"publication",
];

export type CitationType = typeof CitationTypeValues[number];

export const getCitationTypeValue = (type?: CitationType): number =>
	type ? CitationTypeValues.indexOf(type) : -1;
