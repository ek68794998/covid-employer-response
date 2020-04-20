import React from "react";

export class DesignHelpers {
	public static materialIcon(iconName: string, className?: string): JSX.Element {
		const classes: string[] = [ "material-icons" ];

		if (className) {
			classes.push(className);
		}

		return <i className={classes.join(" ")}>{iconName}</i>;
	}
}
