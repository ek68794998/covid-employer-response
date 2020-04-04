import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import EmployeeCountFilterControl from "./EmployerListFilterControl/EmployeeCountFilterControl";
import InternationalTypeFilterControl from "./EmployerListFilterControl/InternationalTypeFilterControl";
import { EmployerListSearchFilter } from "./EmployerListSearchFilter";

import "./EmployerListSearch.scss";

interface Props extends RouteProps {
	onChange: (value: EmployerListSearchFilter) => void;
}

const EmployerListSearch: React.FC<Props> = (props: Props): React.ReactElement => {
	const [ searchFilters, setSearchFilters ] = useState(new EmployerListSearchFilter());
	const [ isFiltersetVisible, setIsFiltersetVisible ] = useState(false);

	const strings: LocalizedStrings = useSelector(getStrings);
	const { onChange } = props;

	useEffect(
		(): void => {
			onChange(searchFilters);
		},
		[ searchFilters ]);

	const updateSearchFilters = (updates: Partial<EmployerListSearchFilter>): void => {
		setSearchFilters({ ...searchFilters, ...updates });
	};

	const filterContainer: JSX.Element | null =
		isFiltersetVisible
			? (
				<div className="EmployerListSearch__FilterContainer">
					<InternationalTypeFilterControl initialFilter={searchFilters} onUpdateFilterValue={updateSearchFilters} />
					<EmployeeCountFilterControl initialFilter={searchFilters} onUpdateFilterValue={updateSearchFilters} />
				</div>
			)
			: null;

	return (
		<div className="EmployerListSearch__Container">
			<div className="EmployerListSearch__InputContainer">
				<i className="material-icons">search</i>
				<input
					onInput={(e: React.FormEvent<HTMLInputElement>): void => updateSearchFilters({ text: e.currentTarget.value })}
					placeholder={strings.search}
					type="search"
				/>
				<button
					className="EmployerListSearch__ExpandFilters"
					onClick={(): void => setIsFiltersetVisible(!isFiltersetVisible)}
				>
					<i className="material-icons">{isFiltersetVisible ? "expand_less" : "expand_more"}</i>
				</button>
			</div>
			{filterContainer}
		</div>
	);
};

export default EmployerListSearch;
