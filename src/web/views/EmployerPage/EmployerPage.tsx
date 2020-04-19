import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getEmployerById as fetchEmployerById } from "../../state/ducks/employers/actions";
import { getEmployer } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerPageDetails from "../EmployerPageDetails/EmployerPageDetails";

import "./EmployerPage.scss";

interface Params {
	id: string;
}

type Props = RouteComponentProps<Params>;

const EmployerPage: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const dispatch: React.Dispatch<any> = useDispatch();

	const employerId: string = props.match.params.id;

	const employer: EmployerRecord | undefined =
		useSelector((state: AppState) => getEmployer(state, employerId));

	useEffect(
		() => {
			dispatch(fetchEmployerById(employerId));
		},
		[ employerId ]);

	if (!employer) {
		// TODO This doubles as a 404, and shouldn't.

		return (
			<main id="employer-page">
				<div className="EmployerPage__Content">
					{strings.loading}
				</div>
			</main>
		);
	}

	return (
		<main id="employer-page">
			<div className="EmployerPage__Content">
				<EmployerPageDetails
					employer={employer}
				/>
			</div>
		</main>
	);
};

export default EmployerPage;
