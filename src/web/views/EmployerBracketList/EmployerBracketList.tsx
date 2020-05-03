import React from "react";

import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";

import EmployerListItem, { EmployerMetric } from "../EmployerListItem/EmployerListItem";

import "./EmployerBracketList.scss";

interface Props {
	employers: EmployerRecordMetadata[];

	metric: EmployerMetric;

	title: string;
}

const EmployerBracketList: React.FC<Props> = (props: Props): React.ReactElement => {
	const { employers, metric, title } = props;

	return (
		<div className="EmployerBracketList__Container">
			<h2>{title}</h2>
			<div className="EmployerBracketList__Grid">
				{employers.map(
					(e: EmployerRecordMetadata, i: number): JSX.Element => (
						<div className="EmployerBracketList__Item" key={`${i}-${e.id}`}>
							<EmployerListItem
								employerId={e.id}
								metric={metric}
								showDetails={false}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default EmployerBracketList;
