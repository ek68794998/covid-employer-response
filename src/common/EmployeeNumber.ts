type EmployeeMagnitude = 3 | 6 | 9 | null;

export class EmployeeNumber {
	public exactValue: number;

	public magnitude: EmployeeMagnitude;

	public constructor(value: number) {
		this.exactValue = value;

		this.magnitude = EmployeeNumber.getEmployeeMagnitude(value);
	}

	public getAdjustedValue(): number {
		return this.magnitude
			? Math.round(this.exactValue / Math.pow(10, this.magnitude - 1)) / 10
			: this.exactValue;
	}

	public getMagnitudeLabel(useShortText: boolean = false): string | null {
		switch (this.magnitude) {
			case 3: return useShortText ? "k" : null;
			case 6: return useShortText ? "m" : "million";
			case 9: return useShortText ? "b" : "billion";
			default: return null;
		}
	}

	public toString(useShortText: boolean = false): string {
		const label: string | null = this.getMagnitudeLabel(useShortText);

		if (!label) {
			return this.exactValue.toLocaleString();
		}

		const value: number = this.getAdjustedValue();

		if (useShortText) {
			return `${value}${label}`;
		}

		return `${value} ${label}`;
	}

	private static getEmployeeMagnitude(value: number): EmployeeMagnitude {
		if (value >= 1000000000) {
			return 9;
		}

		if (value >= 1000000) {
			return 6;
		}

		if (value >= 1000 && value % 1000 === 0) {
			return 3;
		}

		return null;
	}
}