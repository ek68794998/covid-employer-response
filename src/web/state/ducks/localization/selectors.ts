export const getStrings = (state: any): { [key: string]: string } =>
	state && state.localization && state.localization.strings;