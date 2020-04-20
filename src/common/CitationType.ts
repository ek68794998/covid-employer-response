// For maintainability of union types, do not require a typedef.
// eslint-disable-next-line
export const CitationTypeValues = [
	"hearsay",
	"statement",
	"publication",
] as const;

export type CitationType = typeof CitationTypeValues[number];

export const getCitationTypeValue = (type?: CitationType): number =>
	type ? CitationTypeValues.indexOf(type) : -1;
