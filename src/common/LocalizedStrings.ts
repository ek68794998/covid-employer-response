export interface LocalizedStrings { [key: string]: LocalizedStringValue }

export const format = (translation: string, args?: Record<string, any>): string => {
	if (!translation) {
		throw new Error("Translated string must not be empty.");
	}

	if (!args) {
		return translation;
	}

	return translation.replace(
		/\{([^\}]+)\}/g,
		(value: string, argName: string): string => argName in args ? args[argName] : argName,
	);
};

// Would prefer to use 'string | { [key: string]: LocalizedStringValue }' here.
// However, then TypeScript complains if you do 'strings.foo.bar', saying that 'bar' does not exist on type 'string'.
type LocalizedStringValue = any;
