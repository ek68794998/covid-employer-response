import { LocalizedStrings } from "../../../../common/LocalizedStrings";

import { AppState } from "../../AppState";

export const getStrings = (state: AppState): LocalizedStrings => state.strings;