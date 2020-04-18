import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProps, useHistory } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";
import { AppState } from "../../state/AppState";
import { getEmployer, getEmployersList } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerListDetails from "../EmployerListDetails/EmployerListDetails";
import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";

import "./EmployerList.scss";

interface Props extends RouteProps {
	searchFilter: EmployerListSearchFilter;
}

const EmployerList: React.FC<Props> = (props: Props): React.ReactElement => {
	const dispatch: React.Dispatch<any> = useDispatch();

	const { push } = useHistory();

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
				const nameMatcher: RegExp = /^(The |A )?(.*)$/i;

				const aName: string | undefined = nameMatcher.exec(a.name)?.[2];
				const bName: string | undefined = nameMatcher.exec(b.name)?.[2];

				return (aName || "").localeCompare(bName || "");
			});

	if (!filteredEmployers.length) {
		return (
			<div className="EmployerList__Container--NoResults">
				{strings.noResults}
			</div>
		);
	}

	return (
		<div className="EmployerList__Container">
			{filteredEmployers.map((e: EmployerRecordMetadata, i: number): JSX.Element => (
				<div className="EmployerList__Item" key={`${i}-${e.id}`}>
					<EmployerListDetails
						employer={e}
						onClick={(): void => push(`/employers/${e.parentId || e.id}`)}
					/>
				</div>
			))}
		</div>
	);
};

export default EmployerList;
