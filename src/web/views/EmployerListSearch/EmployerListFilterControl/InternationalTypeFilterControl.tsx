import React from "react";
import { useSelector } from "react-redux";

import { LocalizedStrings } from "../../../../common/LocalizedStrings";

import { getStrings } from "../../../state/ducks/localization/selectors";

import { EmployerListSearchFilter } from "../EmployerListSearchFilter";
import { EmployerListSearchFilterProps } from "../EmployerListSearchFilterProps";

import EmployerListFilterControl, { ChildSelectorProps } from "./EmployerListFilterControl";

import "./EmployerListFilterControl.scss";

const InternationalTypeFilterControl: React.FC<EmployerListSearchFilterProps> =
	(props: EmployerListSearchFilterProps): React.ReactElement => {
		const strings: LocalizedStrings = useSelector(getStrings);

		const { filter, onUpdateFilter } = props;

		const getDisplayText = (): string => {
			if (filter.national && !filter.international) {
				return strings.filters.locationNational;
			}

			if (filter.international && !filter.national) {
				return strings.filters.locationInternational;
			}

			return strings.filters.locationDefault;
		};

		const onClear = (): void => {
			filter.national = true;
			filter.international = true;

			onUpdateFilter();
		};

		const selectorPropsList: ChildSelectorProps[] = [
			{
				initialValue: filter.national,
				label: strings.filters.locationNational,
				setValue: (value: boolean): void => onUpdateFilterValue({ national: value }),
			},
			{
				initialValue: filter.international,
				label: strings.filters.locationInternational,
				setValue: (value: boolean): void => onUpdateFilterValue({ international: value }),
			},
		];

		const onUpdateFilterValue = (updates: Partial<EmployerListSearchFilter>): void => {
			Object.assign(filter, updates);
			onUpdateFilter();
		};

		return (
			<EmployerListFilterControl
				getDisplayText={getDisplayText}
				isActive={!(filter.national && filter.international)}
				onClear={onClear}
				popupTitle={strings.filters.locationDefault}
				selectorPropsList={selectorPropsList}
			/>
		);
	};

export default InternationalTypeFilterControl;
