import { EmployerRecord } from "../../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../../common/EmployerRecordMetadata";

export interface GetEmployerByIdApiResponse {
	employer?: EmployerRecord;

	response: Response;
}

export interface GetEmployersByIdApiResponse {
	employers?: EmployerRecord[];

	response: Response;
}

export interface GetEmployersListApiResponse {
	employers?: EmployerRecordMetadata[];

	response: Response;
}

export const getEmployerByIdApi = async (id: string): Promise<GetEmployerByIdApiResponse> => {
	const response: Response = await fetch(`/api/employers/${id}`, { method: "GET" });

	const apiResponse: GetEmployerByIdApiResponse = {
		response,
	};

	if (response.status === 200) {
		apiResponse.employer = await response.json();
	}

	return apiResponse;
};

export const getEmployersByIdApi = async (ids: string[]): Promise<GetEmployersByIdApiResponse> => {
	const response: Response = await fetch(`/api/employers/${ids.join(",")}`, { method: "GET" });

	const apiResponse: GetEmployersByIdApiResponse = {
		response,
	};

	if (response.status === 200) {
		apiResponse.employers = await response.json();
	}

	return apiResponse;
};

export const getEmployersListApi = async (): Promise<GetEmployersListApiResponse> => {
	const response: Response = await fetch("/api/employers", { method: "GET" });

	const apiResponse: GetEmployersListApiResponse = {
		response,
	};

	if (response.status === 200) {
		apiResponse.employers = await response.json();
	}

	return apiResponse;
};
