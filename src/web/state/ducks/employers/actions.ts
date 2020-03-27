import { getEmployersApi, GetEmployersApiResponse } from "./api";
import { GetAllErrorType, GetAllType, GetEmployersActionTypes } from "./types";

import { EmployerRecord } from "../../../../common/EmployerRecord";

export const getEmployersError = (): GetEmployersActionTypes => {
	return {
		type: GetAllErrorType,
	};
};

export const getEmployersSuccess = (payload: EmployerRecord[]): GetEmployersActionTypes => {
	return {
		payload,
		type: GetAllType,
	};
};

export const getEmployers = (dispatch: React.Dispatch<GetEmployersActionTypes>): Promise<void> => (
	getEmployersApi().then((result: GetEmployersApiResponse) => {
		if (result.response.status === 200) {
			dispatch(getEmployersSuccess(result.employers));
		} else {
			dispatch(getEmployersError());
		}
	})
);