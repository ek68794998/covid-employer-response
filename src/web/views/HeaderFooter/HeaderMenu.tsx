import React, { useState } from "react";
import { slide as HamburgerMenu, State as HamburgerMenuState } from "react-burger-menu";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getIsProd } from "../../state/ducks/environment/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import { ProjectIssueSubmissionUrl } from "../../../common/constants/UrlConstants";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import "./HeaderFooter.scss";

const HeaderMenu: React.FC = (): React.ReactElement => {
	const [ isHamburgerMenuOpen, setIsHamburgerMenuOpen ] = useState(false);

	const isProd: boolean = useSelector(getIsProd);
	const strings: LocalizedStrings = useSelector(getStrings);

	const closeHamburgerMenu = (): void => {
		setIsHamburgerMenuOpen(false);
	};

	const openHamburgerMenu = (): void => {
		setIsHamburgerMenuOpen(true);
	};

	const onHamburgerMenuStateChanged = (state: HamburgerMenuState): void => {
		setIsHamburgerMenuOpen(state.isOpen);
	};

	const navLinks: JSX.Element = (
		<>
			<NavLink exact={true} className="HeaderMenu__Link" onClick={closeHamburgerMenu} to="/">
				{strings.home}
			</NavLink>
			<NavLink exact={true} className="HeaderMenu__Link" onClick={closeHamburgerMenu} to="/about">
				{strings.about}
			</NavLink>
			<a className="HeaderMenu__Link" href={`${ProjectIssueSubmissionUrl}`} onClick={closeHamburgerMenu} target="_blank">
				{strings.submit}
			</a>
		</>
	);

	return (
		<>
			<HamburgerMenu customBurgerIcon={false} isOpen={isHamburgerMenuOpen} onStateChange={onHamburgerMenuStateChanged}>
				{navLinks}
			</HamburgerMenu>
			<header>
				<div className="HeaderFooter__Container">
					<button className="HeaderFooter__OpenHamburgerMenu" onClick={openHamburgerMenu}>
						<i className="material-icons">menu</i>
					</button>
					<div id="brand">
						<NavLink to="/">
							{strings.appTitleShort}
							{!isProd && <span style={{ color: "red" }}>&nbsp; [DEV]</span>}
						</NavLink>
						<div className="HeaderMenu__BrandLarge">{strings.appTitle}</div>
					</div>
					{navLinks}
				</div>
			</header>
		</>
	);
};

export default HeaderMenu;
