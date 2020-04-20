// For maintainability of union types, do not require a typedef.
// eslint-disable-next-line
export const EmployerStatusValues = [
	"active",
	"bankruptcy",
	"terminated",
] as const;

export type EmployerStatus = typeof EmployerStatusValues[number];
