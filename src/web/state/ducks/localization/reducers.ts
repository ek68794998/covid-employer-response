import { combineReducers } from "redux";

const getLocalizedStrings = (state: {} = {}, action: any): {} => {
	switch (action.type) {
		case "getLocalizedStringsSuccess":
			return { ...state, ...action.payload };

		default:
			return state;
	}
};

export default combineReducers({
	strings: getLocalizedStrings,
});