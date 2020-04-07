import { EmployerRecord } from "../../../../common/EmployerRecord";

export class GetEmployersApiResponse {
	public employers: EmployerRecord[];

	public response: Response;

	public constructor(employers: EmployerRecord[], response: Response) {
		this.employers = employers;
		this.response = response;
	}
}

export const getEmployersApi = (): Promise<GetEmployersApiResponse> =>
	fetch("/api/employers?$select=*", { method: "GET" })
		.then((response: Response) => Promise.all([ response, response.json() ]))
		.then((value: [ Response, EmployerRecord[] ]) => new GetEmployersApiResponse(value[1], value[0]));