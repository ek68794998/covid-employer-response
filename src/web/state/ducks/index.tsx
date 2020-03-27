import { combineReducers } from "redux";

import { getLocalizedStrings } from "./localization/reducers";

export default combineReducers({
	strings: getLocalizedStrings,
});