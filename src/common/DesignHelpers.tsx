import React from "react";

export class DesignHelpers {
	public static materialIcon(iconName?: string): JSX.Element {
		return <i className="material-icons">{iconName}</i>;
	}
}
