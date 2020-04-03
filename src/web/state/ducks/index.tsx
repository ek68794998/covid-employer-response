import { combineReducers } from "redux";

import { getEmployers } from "./employers/reducers";
import { getEnvironment } from "./environment/reducers";
import { getLocalizedStrings } from "./localization/reducers";

export default combineReducers({
	employers: getEmployers,
	environment: getEnvironment,
	strings: getLocalizedStrings,
});