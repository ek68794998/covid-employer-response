import { EmployerRecord } from "../../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../../common/EmployerRecordMetadata";

export interface GetEmployerByIdApiResponse {
	employer: EmployerRecord;

	response: Response;
}

export interface GetEmployersListApiResponse {
	employers: EmployerRecordMetadata[];

	response: Response;
}

export const getEmployerByIdApi = async (ids: string[]): Promise<GetEmployerByIdApiResponse> => {
	const response: Response = await fetch(`/api/employers${ids.join(",")}`, { method: "GET" });

	const employer: EmployerRecord = await response.json();

	return {
		employer,
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
