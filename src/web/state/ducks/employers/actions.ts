import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { EmployerRecord } from "../../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../../common/EmployerRecordMetadata";

import {
	getEmployersByIdApi,
	getEmployersListApi,
	GetEmployersByIdApiResponse,
	GetEmployersListApiResponse,
} from "./api";
import {
	GetEmployersByIdErrorType,
	GetEmployersByIdType,
	GetEmployersByIdActionTypes,
	GetEmployersListErrorType,
	GetEmployersListType,
	GetEmployersListActionTypes,
} from "./types";

export const getEmployersByIdError = (): GetEmployersByIdActionTypes => ({
	type: GetEmployersByIdErrorType,
});

export const getEmployersByIdSuccess = (payload: EmployerRecord[]): GetEmployersByIdActionTypes => ({
	payload,
	type: GetEmployersByIdType,
});

export const getEmployersById =
	(ids: string[]): ThunkAction<Promise<void>, GetEmployersByIdActionTypes, undefined, Action> =>
		(dispatch: React.Dispatch<GetEmployersByIdActionTypes>): Promise<void> =>
			getEmployersByIdApi(ids).then((result: GetEmployersByIdApiResponse) => {
				if (result.response.status === 200) {
					dispatch(getEmployersByIdSuccess(result.employers));
				} else {
					dispatch(getEmployersByIdError());
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
