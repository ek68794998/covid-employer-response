import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerListDetails from "../EmployerListDetails/EmployerListDetails";
import EmployerPageDetails from "../EmployerPageDetails/EmployerPageDetails";

import { EmployerListSearchFilter } from "./EmployerListSearchFilter";

import "./EmployerList.scss";

interface Props extends RouteProps {
	employers: EmployerRecord[];

	searchFilter: EmployerListSearchFilter;
}

const EmployerList: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const { employers, searchFilter } = props;

	const [ openRow, setOpenRow ] = useState("");

	if (!employers) {
		return (
			<div className="EmployerList__Container--Loading">
				{strings.loading}
			</div>
		);
	}

	const filteredEmployers: EmployerRecord[] =
		employers.filter((e: EmployerRecord) => EmployerListSearchFilter.isMatch(searchFilter, e));

	if (!filteredEmployers.length) {
		return (
			<div className="EmployerList__Container--NoResults">
				{strings.noResults}
			</div>
		);
	}

	const openModal = (id: string): void => {
		setOpenRow(id);
	};

	const closeModal = (): void => {
		setOpenRow("");
	};

	const getEmployerComponent = (e: EmployerRecord, i: number): JSX.Element | null => (
		<div className="EmployerList__Item" key={`${i}-${e.id}`}>
			<EmployerListDetails
				employer={e}
				isOpen={openRow === e.id}
				onClick={(): void => openModal(e.id)}
			/>
		</div>
	);

	const employer: EmployerRecord | undefined = employers.find((e: EmployerRecord) => e.id === openRow);
	const isOpen: boolean = !!(employer && openRow.length);

	return (
		<div className="EmployerList__Container">
			{filteredEmployers.map(getEmployerComponent)}
			<Modal isOpen={isOpen} onRequestClose={closeModal}>
				<button className="EmployerList__CloseModal" onClick={closeModal}>
					<i className="material-icons">close</i>
				</button>
				<EmployerPageDetails employer={employer} />
			</Modal>
		</div>
	);
};

export default EmployerList as any;
