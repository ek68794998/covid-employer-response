import { Action } from "redux";

import { EmployerRecord } from "../../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../../common/EmployerRecordMetadata";

export const GetEmployerByIdType: string = "getEmployerByIdSuccess";
export const GetEmployerByIdErrorType: string = "getEmployerByIdError";

export const GetEmployersListType: string = "getEmployersSuccess";
export const GetEmployersListErrorType: string = "getEmployersError";

interface GetEmployerByIdAction extends Action<typeof GetEmployersListType> {
	payload: EmployerRecord;
}

type GetEmployerByIdErrorAction = Action<typeof GetEmployersListErrorType>;

export type GetEmployerByIdActionTypes = GetEmployerByIdAction | GetEmployerByIdErrorAction;

interface GetEmployersListAction extends Action<typeof GetEmployerByIdType> {
	payload: EmployerRecordMetadata[];
}

type GetEmployersListErrorAction = Action<typeof GetEmployerByIdErrorType>;

export type GetEmployersListActionTypes = GetEmployersListAction | GetEmployersListErrorAction;
