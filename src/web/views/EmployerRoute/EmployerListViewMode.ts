// For maintainability of union types, do not require a typedef.
// eslint-disable-next-line
export const EmployerListViewModeValues = [
	"cards",
	"rows",
] as const;

export type EmployerListViewMode = typeof EmployerListViewModeValues[number];
