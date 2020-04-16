import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";
import { AppState } from "../../state/AppState";
import { getEmployerById } from "../../state/ducks/employers/actions";
import { getEmployer, getEmployersList } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerListDetails from "../EmployerListDetails/EmployerListDetails";
import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";
import EmployerPageDetails from "../EmployerPageDetails/EmployerPageDetails";

import "./EmployerList.scss";

interface Props extends RouteProps {
	searchFilter: EmployerListSearchFilter;
}

const EmployerList: React.FC<Props> = (props: Props): React.ReactElement => {
	const dispatch: React.Dispatch<any> = useDispatch();

	const strings: LocalizedStrings = useSelector(getStrings);
	const [ openEmployerId, setOpenEmployerId ] = useState("");
	const employersList: EmployerRecordMetadata[] | undefined = useSelector(getEmployersList);

	const openEmployer: EmployerRecord | undefined =
		useSelector((state: AppState) => getEmployer(state, openEmployerId));

	const { searchFilter } = props;

	if (!employersList) {
		return (
			<div className="EmployerList__Container--Loading">
				{strings.loading}
			</div>
		);
	}

	const filteredEmployers: EmployerRecordMetadata[] =
		employersList
			.filter((e: EmployerRecordMetadata) => EmployerListSearchFilter.isMatch(searchFilter, e))
			.sort((a: EmployerRecordMetadata, b: EmployerRecordMetadata) => {
				const aName: string | undefined = /^(The |A )?(.*)$/i.exec(a.name)?.[2];
				const bName: string | undefined = /^(The |A )?(.*)$/i.exec(b.name)?.[2];

				return (aName || "").localeCompare(bName || "");
			});

	if (!filteredEmployers.length) {
		return (
			<div className="EmployerList__Container--NoResults">
				{strings.noResults}
			</div>
		);
	}

	const openModal = (id: string): void => {
		dispatch(getEmployerById(id));
		setOpenEmployerId(id);
	};

	const closeModal = (): void => {
		setOpenEmployerId("");
	};

	const getEmployerComponent = (e: EmployerRecordMetadata, i: number): JSX.Element => (
		<div className="EmployerList__Item" key={`${i}-${e.id}`}>
			<EmployerListDetails
				employer={e}
				onClick={(): void => openModal(e.id)}
			/>
		</div>
	);

	return (
		<div className="EmployerList__Container">
			{filteredEmployers.map(getEmployerComponent)}
			<Modal isOpen={!!openEmployer} onRequestClose={closeModal}>
				<button className="EmployerList__CloseModal" onClick={closeModal}>
					<i className="material-icons">close</i>
				</button>
				{openEmployer && <EmployerPageDetails employer={openEmployer} />}
			</Modal>
		</div>
	);
};

export default EmployerList;
