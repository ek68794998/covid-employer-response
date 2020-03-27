import { GetAllType } from "./types";

import { EmployersState } from "../../EmployersState";

export const getEmployers = (state: EmployersState | null = null, action: any): EmployersState | null => {
	switch (action.type) {
		case GetAllType:
			return (state || action.payload) && { ...state, items: [ ...action.payload ] };

		default:
			return state;
	}
};