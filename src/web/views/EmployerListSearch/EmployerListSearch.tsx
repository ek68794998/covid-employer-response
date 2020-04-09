import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { DesignHelpers } from "../../../common/DesignHelpers";
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

	const updateSearchFilters = (updates?: Partial<EmployerListSearchFilter>): void => {
		setSearchFilters({ ...searchFilters, ...updates });
	};

	const onInput =
		(e: React.FormEvent<HTMLInputElement>): void => updateSearchFilters({ text: e.currentTarget.value });

	return (
		<div className="EmployerListSearch__Container">
			<div className="EmployerListSearch__InputContainer">
				<div className="EmployerListSearch__Input">
					{DesignHelpers.materialIcon("search")}
					<input
						onInput={onInput}
						placeholder={strings.search}
						type="search"
					/>
				</div>
				<button
					className={`EmployerListSearch__ExpandFilters EmployerListSearch__ExpandFilters--${isFiltersetVisible ? "Open" : "Closed"}`}
					onClick={(): void => setIsFiltersetVisible(!isFiltersetVisible)}
				>
					{DesignHelpers.materialIcon("filter_list")}
					{strings.filter}
				</button>
			</div>
			{isFiltersetVisible && (
				<div className="EmployerListSearch__FilterContainer">
					<InternationalTypeFilterControl filter={searchFilters} onUpdateFilter={updateSearchFilters} />
					<EmployeeCountFilterControl filter={searchFilters} onUpdateFilter={updateSearchFilters} />
				</div>
			)}
		</div>
	);
};

export default EmployerListSearch;
