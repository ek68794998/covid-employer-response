import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { EmployerRecord } from "../../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../../common/EmployerRecordMetadata";

import {
	getEmployerByIdApi,
	GetEmployerByIdApiResponse,
	getEmployersByIdApi,
	GetEmployersByIdApiResponse,
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
	(id: string): ThunkAction<Promise<void>, GetEmployerByIdActionTypes, undefined, Action> =>
		(dispatch: React.Dispatch<GetEmployerByIdActionTypes>): Promise<void> =>
			getEmployerByIdApi(id).then((result: GetEmployerByIdApiResponse): void => {
				if (result.employer) {
					dispatch(getEmployerByIdSuccess(result.employer));
				} else {
					dispatch(getEmployerByIdError());
				}
			});

export const getEmployersById =
	(ids: string[]): ThunkAction<Promise<void>, GetEmployerByIdActionTypes, undefined, Action> =>
		async (dispatch: React.Dispatch<GetEmployerByIdActionTypes>): Promise<void> => {
			getEmployersByIdApi(ids).then((result: GetEmployersByIdApiResponse): void => {
				if (result.employers) {
					result.employers.forEach(
						(employer: EmployerRecord): void => dispatch(getEmployerByIdSuccess(employer)));
				} else {
					dispatch(getEmployerByIdError());
				}
			});
		};

export const getEmployersListError = (): GetEmployersListActionTypes => ({
	type: GetEmployersListErrorType,
});

export const getEmployersListSuccess = (payload: EmployerRecordMetadata[]): GetEmployersListActionTypes => ({
	payload,
	type: GetEmployersListType,
});

export const getEmployersList =
	(dispatch: React.Dispatch<GetEmployersListActionTypes>): Promise<void> =>
		getEmployersListApi().then((result: GetEmployersListApiResponse): void => {
			if (result.employers) {
				dispatch(getEmployersListSuccess(result.employers));
			} else {
				dispatch(getEmployersListError());
			}
		});
