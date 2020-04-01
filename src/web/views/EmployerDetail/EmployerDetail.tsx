import React from "react";
import { RouteProps } from "react-router-dom";

import "./EmployerDetail.scss";

interface Props extends RouteProps {
	icon: string;

	iconSize: number;

	link: string;

	text: string;
}

const EmployerDetail: React.FC<Props> = (props: Props): React.ReactElement => {
	const { icon, iconSize, link, text } = props;

	const style: React.CSSProperties = {
		fontSize: iconSize || 24,
	};

	const iconElement: JSX.Element = <i className="icon material-icons" style={style}>{icon}</i>;

	if (link) {
		return (
			<a className="employer-detail" href={link} target="_blank">
				{iconElement}
				<span className="label">{text}</span>
			</a>
		);
	}

	return (
		<span className="employer-detail">
			{iconElement}
			<span className="label">{text}</span>
		</span>
	);
};

export default EmployerDetail as any;
