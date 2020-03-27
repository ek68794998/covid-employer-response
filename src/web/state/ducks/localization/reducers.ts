import { GetAllType } from "./types";

import { LocalizedStrings } from "../../../../common/LocalizedStrings";

export const getLocalizedStrings = (state: LocalizedStrings = {}, action: LocalizedStrings): LocalizedStrings => {
	switch (action.type) {
		case GetAllType:
			return { ...state, ...action.payload };

		default:
			return state;
	}
};