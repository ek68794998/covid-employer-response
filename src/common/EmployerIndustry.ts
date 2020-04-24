// For maintainability of union types, do not require a typedef.
// eslint-disable-next-line
export const EmployerIndustryValues = [
	"advertising",
	"agriculture",
	"airline",
	"apparel",
	"automotive",
	"aviation",
	"cannabis",
	"clothing",
	"coffeeShop",
	"construction",
	"cosmetics",
	"courier",
	"eCommerce",
	"education",
	"electronics",
	"energy",
	"engineering",
	"entertainment",
	"financialServices",
	"fishing",
	"foodDelivery",
	"foodProcessing",
	"furniture",
	"groceryStore",
	"healthCare",
	"hemp",
	"hospitality",
	"industrial",
	"insurance",
	"internet",
	"landDevelopment",
	"lodging",
	"manufacturing",
	"media",
	"mining",
	"packaging",
	"plastics",
	"procurement",
	"publicUtilities‎",
	"publishing",
	"rail",
	"realEstate",
	"restaurant",
	"retail",
	"sanitation",
	"signage",
	"software",
	"sports",
	"storage",
	"technology",
	"telecommunications",
	"textile",
	"ticketSales",
	"transport",
	"videoGames",
	"waste",
	"water",
] as const;

export type EmployerIndustry = typeof EmployerIndustryValues[number];
