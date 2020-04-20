// For maintainability of union types, do not require a typedef.
// eslint-disable-next-line
export const EmployerRatingValues = [
	"good",
	"fair",
	"poor",
] as const;

export type EmployerRating = typeof EmployerRatingValues[number];
