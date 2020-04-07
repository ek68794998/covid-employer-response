import { EmployerRecord } from "../../../../common/EmployerRecord";

import { getEmployersApi, GetEmployersApiResponse } from "./api";
import { GetAllErrorType, GetAllType, GetEmployersActionTypes } from "./types";

export const getEmployersError = (): GetEmployersActionTypes => ({
	type: GetAllErrorType,
});

export const getEmployersSuccess = (payload: EmployerRecord[]): GetEmployersActionTypes => ({
	payload,
	type: GetAllType,
});

export const getEmployers = (dispatch: React.Dispatch<GetEmployersActionTypes>): Promise<void> => (
	getEmployersApi().then((result: GetEmployersApiResponse) => {
		if (result.response.status === 200) {
			dispatch(getEmployersSuccess(result.employers));
		} else {
			dispatch(getEmployersError());
		}
	})
);
