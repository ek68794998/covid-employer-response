import { DataFileLoaderOptions } from "./DataFileLoaderOptions";

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

	public abstract existsAsync(id: string, options: DataFileLoaderOptions): Promise<boolean>;

	public abstract getAllAsync(options: DataFileLoaderOptions): Promise<T[]>;

	public abstract getAllIdsAsync(options: DataFileLoaderOptions): Promise<string[]>;

	public abstract getAsync(id: string, options: DataFileLoaderOptions): Promise<T>;
}