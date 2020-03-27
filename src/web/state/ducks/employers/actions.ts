import { AnyAction } from "redux";

import { getEmployersApi, GetEmployersApiResponse } from "./api";

import { EmployerRecord } from "../../../../common/EmployerRecord";

export const getEmployersError = (): AnyAction => {
	return {
		type: "getEmployersError",
	};
};

export const getEmployersRequest = (): AnyAction => {
	return {
		type: "getEmployersRequest",
	};
};

export const getEmployersSuccess = (payload: EmployerRecord[]): AnyAction => {
	return {
		payload,
		type: "getEmployersSuccess",
	};
};

export const getEmployers = (dispatch: React.Dispatch<AnyAction>): Promise<void> => {
	dispatch(getEmployersRequest());

	return (
		getEmployersApi().then((result: GetEmployersApiResponse) => {
			if (result.response.status === 200) {
				dispatch(getEmployersSuccess(result.employers));
			} else {
				dispatch(getEmployersError());
			}
		})
	);
};