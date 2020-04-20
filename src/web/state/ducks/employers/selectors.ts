import { AppState } from "../../AppState";

import { EmployerRecord } from "../../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../../common/EmployerRecordMetadata";

const isNotNullOrUndefined = <T >(input: null | undefined | T): input is T => !!input;

export const getEmployer =
	(state: AppState, id: string): EmployerRecord | undefined  =>
		state.employers
		&& state.employers.itemsComplete
		&& state.employers.itemsComplete[id];

export const getEmployerIds =
	(state: AppState): string[] | undefined =>
		state.employers
		&& state.employers.itemsMetadata
		&& Object.keys(state.employers.itemsMetadata);

export const getEmployerMetadata =
	(state: AppState, id: string): EmployerRecordMetadata | undefined =>
		state.employers
		&& state.employers.itemsMetadata
		&& state.employers.itemsMetadata[id];

export const getEmployersById =
	(state: AppState, ids: string[]): EmployerRecord[] =>
		state.employers
		&& state.employers.itemsComplete
		&& ids.map((id: string) => getEmployer(state, id)).filter(isNotNullOrUndefined)
		|| [];

export const getEmployersList =
	(state: AppState): EmployerRecordMetadata[] | undefined =>
		state.employers
		&& state.employers.itemsMetadata
		&& Object.values(state.employers.itemsMetadata);
