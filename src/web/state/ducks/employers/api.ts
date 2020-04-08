import { EmployerRecord } from "../../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../../common/EmployerRecordMetadata";

export interface GetEmployersByIdApiResponse {
	employers: EmployerRecord[];

	response: Response;
}

export interface GetEmployersListApiResponse {
	employers: EmployerRecordMetadata[];

	response: Response;
}

export const getEmployersByIdApi = async (ids: string[]): Promise<GetEmployersByIdApiResponse> => {
	const response: Response = await fetch(`/api/employers${ids.join(",")}`, { method: "GET" });

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
