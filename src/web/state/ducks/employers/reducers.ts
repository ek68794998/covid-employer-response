import { EmployerRecord } from "../../../../common/EmployerRecord";
import { EmployerRecordBase } from "../../../../common/EmployerRecordBase";
import { EmployerRecordMetadata } from "../../../../common/EmployerRecordMetadata";

import { EmployersState } from "../../EmployersState";

import { GetEmployersByIdType, GetEmployersListType } from "./types";

const toObject = <T extends EmployerRecordBase>(array: T[]): { [id: string]: T } =>
	array.reduce((p: {}, c: T) => {
		p[c.id] = c;
		return p;
	}, {});

export const getEmployers = (state: EmployersState | null = null, action: any): EmployersState | null => {
	if (!state && !action.payload) {
		return null;
	}

	if (action.type === GetEmployersByIdType) {
		const payload: EmployerRecord[] = action.payload;

		return {
			...state,
			itemsComplete: { ...state?.itemsComplete, ...toObject(payload) },
		};
	}

	if (action.type === GetEmployersListType) {
		const payload: EmployerRecordMetadata[] = action.payload;

		return {
			...state,
			itemsMetadata: { ...state?.itemsMetadata, ...toObject(payload) },
		};
	}

	return state;
};
