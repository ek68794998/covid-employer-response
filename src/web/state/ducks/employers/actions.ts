import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { EmployerRecord } from "../../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../../common/EmployerRecordMetadata";

import {
	getEmployerByIdApi,
	GetEmployerByIdApiResponse,
	getEmployersListApi,
	GetEmployersListApiResponse,
} from "./api";
import {
	GetEmployerByIdErrorType,
	GetEmployerByIdType,
	GetEmployerByIdActionTypes,
	GetEmployersListErrorType,
	GetEmployersListType,
	GetEmployersListActionTypes,
} from "./types";

export const getEmployerByIdError = (): GetEmployerByIdActionTypes => ({
	type: GetEmployerByIdErrorType,
});

export const getEmployerByIdSuccess = (payload: EmployerRecord): GetEmployerByIdActionTypes => ({
	payload,
	type: GetEmployerByIdType,
});

export const getEmployerById =
	(ids: string[]): ThunkAction<Promise<void>, GetEmployerByIdActionTypes, undefined, Action> =>
		(dispatch: React.Dispatch<GetEmployerByIdActionTypes>): Promise<void> =>
			getEmployerByIdApi(ids).then((result: GetEmployerByIdApiResponse) => {
				if (result.response.status === 200) {
					dispatch(getEmployerByIdSuccess(result.employer));
				} else {
					dispatch(getEmployerByIdError());
				}
			});

export const getEmployersListError = (): GetEmployersListActionTypes => ({
	type: GetEmployersListErrorType,
});

export const getEmployersListSuccess = (payload: EmployerRecordMetadata[]): GetEmployersListActionTypes => ({
	payload,
	type: GetEmployersListType,
});

export const getEmployersList =
	(dispatch: React.Dispatch<GetEmployersListActionTypes>): Promise<void> =>
		getEmployersListApi().then((result: GetEmployersListApiResponse) => {
			if (result.response.status === 200) {
				dispatch(getEmployersListSuccess(result.employers));
			} else {
				dispatch(getEmployersListError());
			}
		});
