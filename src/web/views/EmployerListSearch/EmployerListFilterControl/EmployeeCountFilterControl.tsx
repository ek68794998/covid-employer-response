import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { LocalizedStrings } from "../../../../common/LocalizedStrings";

import { getStrings } from "../../../state/ducks/localization/selectors";

import EmployerListSearchFiltersPopup, { SelectorProps } from "../../EmployerListSearchFiltersPopup/EmployerListSearchFiltersPopup";

import { EmployerListSearchFilterProps } from "../EmployerListSearchFilterProps";

import "./EmployerListFilterControl.scss";

const EmployeeCountFilterControl: React.FC<EmployerListSearchFilterProps> =
	(props: EmployerListSearchFilterProps): React.ReactElement => {
		const strings: LocalizedStrings = useSelector(getStrings);

		const { initialFilter, onUpdateFilterValue } = props;

		const [ showSmall, setShowSmall ] = useState(initialFilter.small);
		const [ showMedium, setShowMedium ] = useState(initialFilter.medium);
		const [ showLarge, setShowLarge ] = useState(initialFilter.large);
		const [ isPopupOpen, setIsPopupOpen ] = useState(false);
		const [ displayText, setDisplayText ] = useState(strings.filters.employeesDefault);

		const clear = (e: React.MouseEvent<HTMLElement>): void => {
			setShowSmall(true);
			setShowMedium(true);
			setShowLarge(true);

			e.stopPropagation();
		};

		useEffect(
			(): void => {
				let newDisplayText: string;

				if (showSmall && showMedium && showLarge) {
					newDisplayText = strings.filters.employeesDefault;
				} else {
					const displayValues: string[] = [];

					if (showSmall) {
						displayValues.push(strings.filters.employeesSmall);
					}

					if (showMedium) {
						displayValues.push(strings.filters.employeesMedium);
					}

					if (showLarge) {
						displayValues.push(strings.filters.employeesLarge);
					}

					newDisplayText = displayValues.join(", ");
				}

				onUpdateFilterValue({ small: showSmall, medium: showMedium, large: showLarge });
				setDisplayText(newDisplayText);
			},
			[ showSmall, showMedium, showLarge ]);

		const children: SelectorProps[] = [
			{
				initialValue: showSmall,
				label: strings.filters.employeesSmall,
				onChange: (e: React.ChangeEvent<HTMLInputElement>): void => setShowSmall(e.target.checked),
			},
			{
				initialValue: showMedium,
				label: strings.filters.employeesMedium,
				onChange: (e: React.ChangeEvent<HTMLInputElement>): void => setShowMedium(e.target.checked),
			},
			{
				initialValue: showLarge,
				label: strings.filters.employeesLarge,
				onChange: (e: React.ChangeEvent<HTMLInputElement>): void => setShowLarge(e.target.checked),
			},
		];

		const popup: JSX.Element | null =
			isPopupOpen
				? (
					<EmployerListSearchFiltersPopup
						childProps={children}
						multiselect={true}
						onClose={(): void => setIsPopupOpen(false)}
					/>
				)
				: null;

		const isActive: boolean = !(showSmall && showMedium && showLarge);

		const buttonClasses: string[] = [ "EmployerListFilterControl__Button" ];

		if (isActive) {
			buttonClasses.push("EmployerListFilterControl__Button--Active");
		}

		return (
			<div className="EmployerListFilterControl__Container">
				<button className={buttonClasses.join(" ")} onClick={(): void => setIsPopupOpen(!isPopupOpen)}>
					{isActive && <i className="material-icons" onClick={clear}>clear</i>}
					<div>{displayText}</div>
				</button>
				{popup}
			</div>
		);
	};

export default EmployeeCountFilterControl;
