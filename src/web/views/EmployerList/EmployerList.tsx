import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getEmployers as getEmployersRequest } from "../../state/ducks/employers/actions";
import { getEmployers } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerListDetails from "../EmployerListDetails/EmployerListDetails";
import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";
import EmployerPageDetails from "../EmployerPageDetails/EmployerPageDetails";

import "./EmployerList.scss";

interface Props extends RouteProps {
	searchFilter: EmployerListSearchFilter;
}

const EmployerList: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const employers: EmployerRecord[] = useSelector(getEmployers);

	const [ openRow, setOpenRow ] = useState("");

	const { searchFilter } = props;

	const dispatch: React.Dispatch<any> = useDispatch();

	useEffect(
		() => {
			dispatch(getEmployersRequest);
		},
		[]);

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
				{employer && <EmployerPageDetails employer={employer} />}
			</Modal>
		</div>
	);
};

export default EmployerList;
