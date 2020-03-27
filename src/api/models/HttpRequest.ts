import express from "express";

interface RequestWithProps {
	languageCode: string;
}

export type HttpRequest = express.Request & RequestWithProps;