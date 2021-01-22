import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";
import { getEmployersList } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerListItem from "../EmployerListItem/EmployerListItem";
import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";
import { EmployerRouteContext, EmployerRouteContextData } from "../EmployerRoute/EmployerRouteContext";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

import "./EmployerList.scss";

const itemChunkSize: number = 3;
const itemRowCount: number = 4;
const pageSize: number = itemChunkSize * itemRowCount;

const EmployerList: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const employersList: EmployerRecordMetadata[] | undefined = useSelector(getEmployersList);

	const listContext: EmployerRouteContextData = useContext(EmployerRouteContext);

	if (!employersList) {
		return <LoadingIndicator />;
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

	const pageCount: number = Math.ceil(filteredEmployers.length / pageSize);

	const pageIndex: number = Math.min(listContext.pageIndex, pageCount - 1);

	const startIndex: number = pageIndex * pageSize;
	const endIndex: number = startIndex + pageSize;

	const generatePageButton = (contents: JSX.Element, title: string, pageNumber: number): JSX.Element =>
		<button
			key={`${title}:${pageNumber}`}
			className="App__BigButton"
			disabled={pageNumber === pageIndex || pageNumber < 0 || pageNumber >= pageCount}
			onClick={(): void => listContext.setPageIndex(pageNumber)}
		>
			{contents}
		</button>;

	return (
		<div className="EmployerList__Container">
			<div className="EmployerList__Grid">
				{filteredEmployers.slice(startIndex, endIndex).map(
					(e: EmployerRecordMetadata, i: number): JSX.Element => (
						<div className="EmployerList__Item" key={`${i}-${e.id}`}>
							<EmployerListItem
								employerId={e.id}
								metric="rating"
								showDetails={listContext.listViewMode === "cards"}
							/>
						</div>
					))}
			</div>
			<div className="EmployerList__Pages">
				{generatePageButton(<>&laquo;</>, "First", 0)}
				{generatePageButton(<>&lsaquo;</>, "Previous", pageIndex - 1)}
				<span className="EmployerList__PageNumber">
					{pageIndex + 1} / {pageCount}
				</span>
				{generatePageButton(<>&rsaquo;</>, "Next", pageIndex + 1)}
				{generatePageButton(<>&raquo;</>, "Last", pageCount - 1)}
			</div>
		</div>
	);
};

export default EmployerList;
