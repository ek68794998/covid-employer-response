import { EmployerRecordMetadata } from "./EmployerRecordMetadata";

describe("EmployerRecordMetadata", (): void => {
	test("constructs", (): void => {
		const record: EmployerRecordMetadata = new EmployerRecordMetadata(-5, 3, 2, "fair");

		expect(record.negativeCount).toBe(-5);
		expect(record.positiveCount).toBe(3);
		expect(record.rating).toBe("fair");
		expect(record.score).toBe(2);
	});

	test.each([
		[ "good", "trending_up" ],
		[ "fair", "trending_flat" ],
		[ "poor", "trending_down" ],
		[ "NOT_VALID", "trending_flat" ],
	])("gets trend icons", (rating: string, expectedIcon: string): void => {
		const record: EmployerRecordMetadata =
			new EmployerRecordMetadata(-5, 3, 0, rating as any);

		expect(EmployerRecordMetadata.getTrendIcon(record)).toBe(expectedIcon);
	});
});
