import { AppState } from "../../AppState";

import { LocalizedStrings } from "../../../../common/LocalizedStrings";

export const getStrings = (state: AppState): LocalizedStrings => state.strings;