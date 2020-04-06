import React from "react";
import { useSelector } from "react-redux";

import { LocalizedStrings } from "../../../../common/LocalizedStrings";

import { getStrings } from "../../../state/ducks/localization/selectors";

import { EmployerListSearchFilter } from "../EmployerListSearchFilter";
import { EmployerListSearchFilterProps } from "../EmployerListSearchFilterProps";

import EmployerListFilterControl, { ChildSelectorProps } from "./EmployerListFilterControl";

import "./EmployerListFilterControl.scss";

const EmployeeCountFilterControl: React.FC<EmployerListSearchFilterProps> =
	(props: EmployerListSearchFilterProps): React.ReactElement => {
		const strings: LocalizedStrings = useSelector(getStrings);

		const { filter, onUpdateFilter } = props;

		const getDisplayText = (): string => {
			let newDisplayText: string = "";

			if (!(filter.small && filter.medium && filter.large)) {
				const displayValues: string[] = [];

				if (filter.small) {
					displayValues.push(strings.filters.employeesSmall);
				}

				if (filter.medium) {
					displayValues.push(strings.filters.employeesMedium);
				}

				if (filter.large) {
					displayValues.push(strings.filters.employeesLarge);
				}

				newDisplayText = displayValues.join(", ");
			}

			return newDisplayText || strings.filters.employeesDefault;
		};

		const onClear = (): void => {
			filter.small = true;
			filter.medium = true;
			filter.large = true;

			onUpdateFilter();
		};

		const selectorPropsList: ChildSelectorProps[] = [
			{
				initialValue: filter.small,
				label: strings.filters.employeesSmall,
				setValue: (value: boolean): void => onUpdateFilterValue({ small: value }),
			},
			{
				initialValue: filter.medium,
				label: strings.filters.employeesMedium,
				setValue: (value: boolean): void => onUpdateFilterValue({ medium: value }),
			},
			{
				initialValue: filter.large,
				label: strings.filters.employeesLarge,
				setValue: (value: boolean): void => onUpdateFilterValue({ large: value }),
			},
		];

		const onUpdateFilterValue = (updates: Partial<EmployerListSearchFilter>): void => {
			Object.assign(filter, updates);
			onUpdateFilter();
		};

		return (
			<EmployerListFilterControl
				getDisplayText={getDisplayText}
				isActive={!(filter.small && filter.medium && filter.large)}
				onClear={onClear}
				popupTitle={strings.filters.employeesDefault}
				selectorPropsList={selectorPropsList}
			/>
		);
	};

export default EmployeeCountFilterControl;
