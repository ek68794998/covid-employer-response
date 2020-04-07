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

	const iconElement: JSX.Element = <i className="EmployerDetail__Icon material-icons" style={style}>{icon}</i>;

	if (link) {
		return (
			<a className="EmployerDetail__Container" href={link} rel="noopener noreferrer" target="_blank">
				{iconElement}
				<span className="EmployerDetail__Label">{text}</span>
			</a>
		);
	}

	return (
		<span className="EmployerDetail__Container">
			{iconElement}
			<span className="EmployerDetail__Label">{text}</span>
		</span>
	);
};

export default EmployerDetail;
