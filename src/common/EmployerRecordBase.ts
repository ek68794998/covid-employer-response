import { EmployerLocation } from "./EmployerLocation";

export abstract class EmployerRecordBase {
	public aliases?: string[];

	public id: string = "";

	public image?: string;

	public location?: EmployerLocation;

	public name: string = "";

	public shortName?: string;

	public ticker?: string;

	public static copyTo(original: EmployerRecordBase, target: EmployerRecordBase): void {
		target.aliases = original.aliases;
		target.id = original.id;
		target.image = original.image;
		target.location = original.location;
		target.name = original.name;
		target.shortName = original.shortName;
		target.ticker = original.ticker;
	}
}
