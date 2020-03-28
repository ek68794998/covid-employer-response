import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import "./EmployerDetail.scss";

interface Props extends RouteComponentProps {
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

	return (
		<>
			<i className="icon material-icons" style={style}>{icon}</i>
			{link ? <a className="label" href={link} target="_blank">{text}</a> : <span className="label">{text}</span>}
		</>
	);
};

export default withRouter(EmployerDetail) as any;
