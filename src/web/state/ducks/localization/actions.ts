import { GetAllType, GetStringsActionTypes } from "./types";

import { LocalizedStrings } from "../../../../common/LocalizedStrings";

export const getLocalizedStringsSuccess = (payload: LocalizedStrings): GetStringsActionTypes => {
	return {
		payload,
		type: GetAllType,
	};
};