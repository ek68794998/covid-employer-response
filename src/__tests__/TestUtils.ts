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
			propsList.push(`${propKey}=(${props[propKey]?.toString().replace(/=>/g, "→")})`);
		}

		return `${openingTag} ${propsList.join(" ")} ${closingTag}`;
	};
};
