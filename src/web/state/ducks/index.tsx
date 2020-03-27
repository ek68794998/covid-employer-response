import { combineReducers } from "redux";

import { getEmployers } from "./employers/reducers";
import { getLocalizedStrings } from "./localization/reducers";

export default combineReducers({
	employers: getEmployers,
	strings: getLocalizedStrings,
});