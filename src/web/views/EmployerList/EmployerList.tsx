import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { format, LocalizedStrings } from "../../../common/LocalizedStrings";
import { getEmployersList } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerListItem from "../EmployerListItem/EmployerListItem";
import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";

import "./EmployerList.scss";

const loadChunkSize: number = 3;
const loadMoreRowCount: number = 4;
const loadMoreCount: number = loadChunkSize * loadMoreRowCount;

interface Props extends RouteProps {
	searchFilter: EmployerListSearchFilter;
}

const EmployerList: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const employersList: EmployerRecordMetadata[] | undefined = useSelector(getEmployersList);

	const [ visibleItemCount, setVisibleItemCount ] = useState(loadMoreCount);

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

	return (
		<div className="EmployerList__Container">
			<div className="EmployerList__Grid">
				{filteredEmployers.slice(0, visibleItemCount).map(
					(e: EmployerRecordMetadata, i: number): JSX.Element => (
						<div className="EmployerList__Item" key={`${i}-${e.id}`}>
							<EmployerListItem employerId={e.id} showDetails={true} />
						</div>
					))}
			</div>
			{visibleItemCount < filteredEmployers.length && (
				<button className="EmployerList__LoadMore" onClick={(): void => setVisibleItemCount(visibleItemCount + loadMoreCount)}>
					{format(
						strings.loadMore,
						{
							count: Math.min(filteredEmployers.length - visibleItemCount, loadMoreCount),
						})}
				</button>
			)}
		</div>
	);
};

export default EmployerList;
