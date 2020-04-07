import { EmployersState } from "../../EmployersState";

import { GetAllType } from "./types";

export const getEmployers = (state: EmployersState | null = null, action: any): EmployersState | null => {
	switch (action.type) {
		case GetAllType:
			return (state || action.payload) && { ...state, items: [ ...action.payload ] };

		default:
			return state;
	}
};