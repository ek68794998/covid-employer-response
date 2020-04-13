export const EmployerStatusValues: string[] = [
	"active",
	"bankruptcy",
	"terminated",
];

export type EmployerStatus = typeof EmployerStatusValues[number];
