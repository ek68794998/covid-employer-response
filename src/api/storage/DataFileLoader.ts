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

	public abstract existsAsync(id: string): Promise<boolean>;

	public abstract getAllIdsAsync(): Promise<string[]>;

	public abstract loadAsync(id: string): Promise<T>;

	public abstract loadAllAsync(): Promise<T[]>;
}