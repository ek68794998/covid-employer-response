type ComponentGenerator = (props: {}) => string;

export const mockComponent = (componentName: string): ComponentGenerator => {
	return (props: {}): string => {
		const openingTag: string = `[component: ${componentName}`;
		const closingTag: string = `/]`;

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
};
