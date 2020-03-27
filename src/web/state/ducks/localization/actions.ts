import { AnyAction } from "redux";

export const getLocalizedStringsSuccess = (payload: any): AnyAction => {
	return {
		payload,
		type: "getLocalizedStringsSuccess",
	};
};