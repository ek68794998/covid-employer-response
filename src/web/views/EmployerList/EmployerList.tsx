import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";
import { getEmployersList } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerListItem from "../EmployerListItem/EmployerListItem";
import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";
import { EmployerRouteContext, EmployerRouteContextData } from "../EmployerRoute/EmployerRouteContext";

import "./EmployerList.scss";

const itemChunkSize: number = 3;
const itemRowCount: number = 4;
const pageSize: number = itemChunkSize * itemRowCount;

const EmployerList: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const employersList: EmployerRecordMetadata[] | undefined = useSelector(getEmployersList);

	const listContext: EmployerRouteContextData = useContext(EmployerRouteContext);

	const [ pageIndex, setPageIndex ] = useState(listContext.pageIndex);

	useEffect(
		(): void => {
			listContext.setPageIndex(pageIndex);
		},
		[ pageIndex ]);

	if (!employersList) {
		return (
			<div className="EmployerList__Container--Loading">
				{strings.loading}
			</div>
		);
	}

	const filteredEmployers: EmployerRecordMetadata[] =
		employersList
			.filter((e: EmployerRecordMetadata) => EmployerListSearchFilter.isMatch(listContext.searchFilters, e))
			.sort((a: EmployerRecordMetadata, b: EmployerRecordMetadata) => {
				const nameMatcher: RegExp = /^(The |A )?(.*)$/i;

				const aName: string | undefined = nameMatcher.exec(a.shortName || a.name)?.[2];
				const bName: string | undefined = nameMatcher.exec(b.shortName || b.name)?.[2];

				return (aName || "").localeCompare(bName || "");
			});

	if (!filteredEmployers.length) {
		return (
			<div className="EmployerList__Container--NoResults">
				{strings.noResults}
			</div>
		);
	}

	const startIndex: number = pageIndex * pageSize;
	const endIndex: number = startIndex + pageSize;

	const pageCount: number = Math.ceil(filteredEmployers.length / pageSize);
	const pageNumbers: (number | null)[] = [];

	let showedPreviousPage: boolean = false;

	for (let i: number = 0; i < pageCount; i++) {
		const shouldShowPage: boolean =
			i <= 1
			|| i >= pageCount - 2
			|| (i >= pageIndex - 1 && i <= pageIndex + 1);

		if (shouldShowPage) {
			pageNumbers.push(i + 1);

			showedPreviousPage = true;
		} else {
			if (showedPreviousPage) {
				pageNumbers.push(null);
			}

			showedPreviousPage = false;
		}
	}

	return (
		<div className="EmployerList__Container">
			<div className="EmployerList__Grid">
				{filteredEmployers.slice(startIndex, endIndex).map(
					(e: EmployerRecordMetadata, i: number): JSX.Element => (
						<div className="EmployerList__Item" key={`${i}-${e.id}`}>
							<EmployerListItem employerId={e.id} showDetails={true} />
						</div>
					))}
			</div>
			<div className="EmployerList__Pages">
				{pageNumbers.map((v: number | null, i: number): JSX.Element => (
					<button key={i} className="App__BigButton" disabled={!v} onClick={(): void => setPageIndex((v || 0) - 1)}>
						{v || "..."}
					</button>
				))}
			</div>
		</div>
	);
};

export default EmployerList;
