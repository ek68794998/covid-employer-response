import { LocalizedStrings } from "../../../../common/LocalizedStrings";

import { GetAllType, GetStringsActionTypes } from "./types";

export const getLocalizedStringsSuccess = (payload: LocalizedStrings): GetStringsActionTypes => ({
	payload,
	type: GetAllType,
});