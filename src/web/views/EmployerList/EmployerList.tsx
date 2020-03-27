import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";

import EmployerListDetails from "../EmployerListDetails/EmployerListDetails";

import "./EmployerList.scss";

interface Props extends RouteComponentProps {
	employers: EmployerRecord[];
}

const EmployerList: React.FC<Props> = (props: Props): React.ReactElement => {
	const [ openRow, setOpenRow ] = useState(-1);

	const { employers } = props;

	const onClick = (i: number): void => {
		setOpenRow(openRow === i ? -1 : i);
	};

	const getEmployerComponent = (e: EmployerRecord, i: number): JSX.Element => {
		return (
			<EmployerListDetails
				key={`${i}-${e.id}`}
				employer={e}
				isOpen={openRow === i}
				onClick={(): void => onClick(i)}
			/>
		);
	};

	return (
		<div>
			{employers && employers.map(getEmployerComponent)}
		</div>
	);
};

export default withRouter(EmployerList) as any;
