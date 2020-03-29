import express from "express";

export abstract class RoutedControllerBase {
	public readonly router: express.Router = express.Router();

	public constructor() {
		this.initializeRoutes();
	}

	public get hasRoutes(): boolean {
		return this.router.stack && this.router.stack.length > 0;
	}

	protected abstract initializeRoutes(): void;
}