export class EmployerEmployeeProfile {
	public lowerBound: number = -1;

	public type: "range" | "approximately" | "exactly" = "exactly";

	public upperBound: number = 0;

	public year: number = 0;

	public yearQuarter?: "Q1" | "Q2" | "Q3" | "Q4";
}
