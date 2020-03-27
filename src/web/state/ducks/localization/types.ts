import { Action } from "redux";

import { LocalizedStrings } from "../../../../common/LocalizedStrings";

export const GetAllType: string = "getLocalizedStringsSuccess";

interface GetStringsAction extends Action<typeof GetAllType> {
	payload: LocalizedStrings;
}

export type GetStringsActionTypes = GetStringsAction;
