import { EmployersState } from "../../EmployersState";

export const getEmployers = (state: EmployersState | null = null, action: any): EmployersState | null => {
	switch (action.type) {
		case "getEmployersSuccess":
			return (state || action.payload) && { ...state, items: [ ...action.payload ] };

		default:
			return state;
	}
};