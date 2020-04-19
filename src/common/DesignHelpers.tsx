import React from "react";

export class DesignHelpers {
	public static materialIcon(iconName: string, className?: string): JSX.Element {
		return <i className={`material-icons ${className || ""}`}>{iconName}</i>;
	}
}
