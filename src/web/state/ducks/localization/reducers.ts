import { LocalizedStrings } from "../../../../common/LocalizedStrings";

export const getLocalizedStrings = (state: LocalizedStrings = {}, action: any): LocalizedStrings => {
	switch (action.type) {
		case "getLocalizedStringsSuccess":
			return { ...state, ...action.payload };

		default:
			return state;
	}
};