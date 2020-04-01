import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerListDetails from "../EmployerListDetails/EmployerListDetails";

import { EmployerListSearchFilter } from "./EmployerListSearchFilter";

import "./EmployerList.scss";

interface Props extends RouteProps {
	employers: EmployerRecord[];

	searchFilter: EmployerListSearchFilter;
}

const EmployerList: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));
	const { employers, searchFilter } = props;

	const [ openRow, setOpenRow ] = useState("");

	if (!employers) {
		return (
			<div className="loading">
				{strings.loading}
			</div>
		);
	}

	const filteredEmployers: EmployerRecord[] =
		employers.filter((e: EmployerRecord) => EmployerListSearchFilter.isMatch(searchFilter, e));

	if (!filteredEmployers.length) {
		return (
			<div className="no-results">
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
		<EmployerListDetails
			key={`${i}-${e.id}`}
			employer={e}
			isOpen={openRow === e.id}
			onClick={(): void => openModal(e.id)}
		/>
	);

	return (
		<div>
			{filteredEmployers.map(getEmployerComponent)}
			<Modal isOpen={!!openRow.length} onRequestClose={closeModal}>Test</Modal>
		</div>
	);
};

export default EmployerList as any;
