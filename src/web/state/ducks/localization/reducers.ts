export const getLocalizedStrings = (state: {} = {}, action: any): {} => {
	switch (action.type) {
		case "getLocalizedStringsSuccess":
			return { ...state, ...action.payload };

		default:
			return state;
	}
};