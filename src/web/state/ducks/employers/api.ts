import { EmployerRecord } from "../../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../../common/EmployerRecordMetadata";

export interface GetEmployerByIdApiResponse {
	employer: EmployerRecord;

	response: Response;
}

export interface GetEmployersByIdApiResponse {
	employers: EmployerRecord[];

	response: Response;
}

export interface GetEmployersListApiResponse {
	employers: EmployerRecordMetadata[];

	response: Response;
}

export const getEmployerByIdApi = async (id: string): Promise<GetEmployerByIdApiResponse> => {
	const response: Response = await fetch(`/api/employers/${id}`, { method: "GET" });

	const employer: EmployerRecord = await response.json();

	return {
		employer,
		response,
	};
};

export const getEmployersByIdApi = async (ids: string[]): Promise<GetEmployersByIdApiResponse> => {
	const response: Response = await fetch(`/api/employers/${ids.join(",")}`, { method: "GET" });

	const employers: EmployerRecord[] = await response.json();

	return {
		employers,
		response,
	};
};

export const getEmployersListApi = async (): Promise<GetEmployersListApiResponse> => {
	const response: Response = await fetch("/api/employers", { method: "GET" });

	const employers: EmployerRecordMetadata[] = await response.json();

	return {
		employers,
		response,
	};
};
