import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { LocalizedStrings } from "../../../../common/LocalizedStrings";

import { getStrings } from "../../../state/ducks/localization/selectors";

import EmployerListSearchFiltersPopup, { SelectorProps } from "../../EmployerListSearchFiltersPopup/EmployerListSearchFiltersPopup";

import { EmployerListSearchFilterProps } from "../EmployerListSearchFilterProps";

import "./EmployerListFilterControl.scss";

const InternationalTypeFilterControl: React.FC<EmployerListSearchFilterProps> =
	(props: EmployerListSearchFilterProps): React.ReactElement => {
		const strings: LocalizedStrings = useSelector(getStrings);

		const [ showNational, setShowNational ] = useState(false);
		const [ showInternational, setShowInternational ] = useState(false);
		const [ isPopupOpen, setIsPopupOpen ] = useState(false);
		const [ displayText, setDisplayText ] = useState(strings.filters.locationDefault);

		const { onUpdateFilterValue } = props;

		const clear = (e: React.MouseEvent<HTMLElement>): void => {
			setShowNational(false);
			setShowInternational(false);

			e.stopPropagation();
		};

		useEffect(
			(): void => {
				let newDisplayText: string;

				if (showNational && !showInternational) {
					newDisplayText = strings.filters.locationNational;
				} else if (showInternational && !showNational) {
					newDisplayText = strings.filters.locationInternational;
				} else {
					newDisplayText = strings.filters.locationDefault;
				}

				onUpdateFilterValue({ international: showInternational, national: showNational });
				setDisplayText(newDisplayText);
			},
			[ showNational, showInternational ]);

		const children: SelectorProps[] = [
			{
				label: strings.filters.locationNational,
				onChange: (e: React.ChangeEvent<HTMLInputElement>): void => setShowNational(e.target.checked),
			},
			{
				label: strings.filters.locationInternational,
				onChange: (e: React.ChangeEvent<HTMLInputElement>): void => setShowInternational(e.target.checked),
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

		const isActive: boolean = showNational !== showInternational;

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

export default InternationalTypeFilterControl;
