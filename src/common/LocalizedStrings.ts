// tslint:disable-next-line:interface-over-type-literal // An interface cannot work here.
export type LocalizedStrings = { [key: string]: LocalizedStringValue };

// Would prefer to use 'string | { [key: string]: LocalizedStringValue }' here.
// However, then TypeScript complains if you do 'strings.foo.bar', saying that 'bar' does not exist on type 'string'.
type LocalizedStringValue = any;