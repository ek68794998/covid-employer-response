type EmployeeMagnitude = 6 | 9 | null;

export class EmployeeNumber {
	public exactValue: number;

	public magnitude: EmployeeMagnitude;

	public value: number;

	public constructor(value: number) {
		this.exactValue = value;

		this.magnitude = EmployeeNumber.getEmployeeMagnitude(value);

		this.value =
			this.magnitude
				? Math.round(value / Math.pow(10, this.magnitude - 1)) / 10
				: value;
	}

	public getMagnitudeLabel(useShortText: boolean = false): string | null {
		switch (this.magnitude) {
			case 6: return useShortText ? "m" : "million";
			case 9: return useShortText ? "b" : "billion";
			default: return null;
		}
	}

	public toString(useShortText: boolean = false): string {
		return this.magnitude ? `${this.value} ${this.getMagnitudeLabel(useShortText)}` : this.value.toLocaleString();
	}

	private static getEmployeeMagnitude(value: number): EmployeeMagnitude {
		if (value >= 1000000000) {
			return 9;
		}

		if (value >= 1000000) {
			return 6;
		}

		return null;
	}
}