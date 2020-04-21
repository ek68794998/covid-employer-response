import { EmployerRecord } from "../../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../../common/EmployerRecordMetadata";

import { EmployersState } from "../../EmployersState";

import { GetEmployerByIdType, GetEmployersListType } from "./types";

export const getEmployers = (state: EmployersState | null = null, action: any): EmployersState | null => {
	if (!state && !action.payload) {
		return null;
	}

	if (action.type === GetEmployerByIdType) {
		const payload: EmployerRecord = action.payload;

		return {
			...state,
			itemsComplete: { ...state?.itemsComplete, ...{ [payload.id]: payload } },
		};
	}

	if (action.type === GetEmployersListType) {
		const payload: EmployerRecordMetadata[] = action.payload;

		return {
			...state,
			itemsMetadata: {
				...state?.itemsMetadata,
				...(
					payload.reduce((p: {}, c: EmployerRecordMetadata) => {
						const complete: EmployerRecordMetadata =
							new EmployerRecordMetadata(
								c.negativeCount,
								c.positiveCount,
								c.rating);

						p[c.id] = Object.assign(complete, c);

						return p;
					}, {})
				),
			},
		};
	}

	return state;
};
