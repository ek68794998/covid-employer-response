import { combineReducers } from "redux";

import LocalizationReducers from "./localization/reducers";

export default combineReducers({
	localization: LocalizationReducers,
});