export interface LocalizedStrings { [key: string]: LocalizedStringValue }

export const format = (translation: string, args: { [key: string]: any }): string =>
	translation.replace(/\{([^\}]+)\}/g, (value: string, argName: string) => args[argName] || argName);

// Would prefer to use 'string | { [key: string]: LocalizedStringValue }' here.
// However, then TypeScript complains if you do 'strings.foo.bar', saying that 'bar' does not exist on type 'string'.
type LocalizedStringValue = any;