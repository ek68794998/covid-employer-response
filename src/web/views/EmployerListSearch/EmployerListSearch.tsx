import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";

import { DesignHelpers } from "../../../common/DesignHelpers";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import { EmployerRouteContext, EmployerRouteContextData } from "../EmployerRoute/EmployerRouteContext";

import EmployeeCountFilterControl from "./EmployerListFilterControl/EmployeeCountFilterControl";
import InternationalTypeFilterControl from "./EmployerListFilterControl/InternationalTypeFilterControl";
import { EmployerListSearchFilter } from "./EmployerListSearchFilter";

import "./EmployerListSearch.scss";

const EmployerListSearch: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);

	const listContext: EmployerRouteContextData = useContext(EmployerRouteContext);

	const [ listViewMode, setListViewMode ] = useState(listContext.listViewMode);
	const [ searchFilters, setSearchFilters ] = useState(listContext.searchFilters);
	const [ isFiltersetVisible, setIsFiltersetVisible ] = useState(false);

	useEffect(
		(): void => {
			listContext.setSearchFilters(searchFilters);
		},
		[ searchFilters ]);

	useEffect(
		(): void => {
			listContext.setListViewMode(listViewMode);
		},
		[ listViewMode ]);

	const updateSearchFilters = (updates?: Partial<EmployerListSearchFilter>): void => {
		setSearchFilters({ ...searchFilters, ...updates });
	};

	const onInput =
		(e: React.FormEvent<HTMLInputElement>): void => updateSearchFilters({ text: e.currentTarget.value });

	return (
		<div className="EmployerListSearch__Container">
			<div className="EmployerListSearch__SearchContainer">
				<div className="EmployerListSearch__InputContainer">
					<div className="EmployerListSearch__Input">
						{DesignHelpers.materialIcon("search")}
						<input
							defaultValue={searchFilters.text}
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
			<div className="EmployerListSearch__ViewTypeContainer">
				<button
					onClick={(): void => setListViewMode("rows")}
				>
					{DesignHelpers.materialIcon("view_headline")}
				</button>
				<button
					onClick={(): void => setListViewMode("cards")}
				>
					{DesignHelpers.materialIcon("view_module")}
				</button>
			</div>
		</div>
	);
};

export default EmployerListSearch;
