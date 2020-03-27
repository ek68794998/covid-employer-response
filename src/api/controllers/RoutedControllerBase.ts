import express from "express";

export abstract class RoutedControllerBase {
	public readonly router: express.Router = express.Router();

	public constructor() {
		this.initializeRoutes();
	}

	protected abstract initializeRoutes(): void;
}