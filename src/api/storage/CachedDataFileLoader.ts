import { DataFileLoader } from "./DataFileLoader";

export abstract class CachedDataFileLoader<T> extends DataFileLoader<T> {
	protected cachedIds: string[];

	protected cachedItems: { [id: string]: T };

	public constructor(publicDirectory: string, subdirectoryName: string) {
		super(publicDirectory, subdirectoryName);

		this.cachedIds = [];
		this.cachedItems = {};
	}

	public clearCache(): void {
		this.cachedIds = [];
		this.cachedItems = {};
	}
}