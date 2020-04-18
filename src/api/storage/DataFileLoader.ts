import { DataLoadOptions } from "./DataLoadOptions";

export abstract class DataFileLoader<T> {
	protected directoryPath: string;

	public constructor(publicDirectory: string, subdirectoryName: string) {
		if (!publicDirectory.length) {
			throw new Error("<publicDirectory> argument must not be empty.");
		}

		if (!subdirectoryName.length) {
			throw new Error("<subdirectoryName> argument must not be empty.");
		}

		this.directoryPath = `${publicDirectory}/${subdirectoryName}`;
	}

	public abstract existsAsync(id: string, options: DataLoadOptions): Promise<boolean>;

	public abstract getAllAsync(options: DataLoadOptions): Promise<T[]>;

	public abstract getAllIdsAsync(options: DataLoadOptions): Promise<string[]>;

	public abstract getAsync(id: string, options: DataLoadOptions): Promise<T>;
}