import { EmployerRecordMetadata } from "./EmployerRecordMetadata";

describe("EmployerRecordMetadata", () => {
	test("constructs", () => {
		const record: EmployerRecordMetadata = new EmployerRecordMetadata(-5, 3, "fair");

		expect(record.negativeCount).toBe(-5);
		expect(record.positiveCount).toBe(3);
		expect(record.rating).toBe("fair");
	});

	test.each([
		[ "good", "trending_up" ],
		[ "fair", "trending_flat" ],
		[ "poor", "trending_down" ],
		[ "NOT_VALID", "trending_flat" ],
	])("gets trend icons", (rating: string, expectedIcon: string) => {
		const record: EmployerRecordMetadata =
			new EmployerRecordMetadata(-5, 3, rating as any);

		expect(EmployerRecordMetadata.getTrendIcon(record)).toBe(expectedIcon);
	});
});
