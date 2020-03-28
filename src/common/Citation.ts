import { CitationSource } from "./CitationSource";
import { CitationType } from "./CitationType";

export class Citation {
	public positivity: number = 0;

	public sources?: CitationSource[];

	public summary: string = "";

	public type?: CitationType;
}
