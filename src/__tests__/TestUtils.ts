type ComponentGenerator = (props: {}) => string;

const lowerCharMin: number = "a".charCodeAt(0);
const lowerCharMax: number = "z".charCodeAt(0);
const upperCharMin: number = "A".charCodeAt(0);
const upperCharMax: number = "Z".charCodeAt(0);

const plocLowercase: string = "áβçδèƒϱλïJƙℓ₥ñôƥ9řƨƭúƲωж¥ƺ";
const plocUppercase: string = "ÂßÇÐÉFGHÌJK£MNÓÞQR§TÛVWXÝZ";

export const mockComponent = (componentName: string): ComponentGenerator =>
	(props: {}): string => {
		const openingTag: string = `[component: ${componentName}`;
		const closingTag: string = "/]";

		const propKeys: string[] = Object.keys(props);

		if (propKeys.length === 0) {
			return `${openingTag} ${closingTag}`;
		}

		const propsList: string[] = [];

		for (const propKey of propKeys) {
			const value: any = props[propKey];
			const valueString: string =
				value
					? typeof value === "function"
						? "[Function]"
						: value.toString().replace(/</g, "⋖").replace(/>/g, "⋗")
					: "undefined";

			propsList.push(`${propKey}=(${valueString})`);
		}

		return `${openingTag} ${propsList.join(" ")} ${closingTag}`;
	};

export const ploc = (value: string): string => {
	let newValue: string = "";

	for (let i: number = 0; i < value.length; i++) {
		const code: number = value.charCodeAt(i);

		if (code >= lowerCharMin && code <= lowerCharMax) {
			newValue += plocLowercase[code - lowerCharMin];
			continue;
		}

		if (code >= upperCharMin && code <= upperCharMax) {
			newValue += plocUppercase[code - upperCharMin];
			continue;
		}

		newValue += value[i];
	}

	return newValue;
};
