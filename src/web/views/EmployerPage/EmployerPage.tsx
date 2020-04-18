import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";

import { AppState } from "../../state/AppState";
import { getEmployerById as fetchEmployerById } from "../../state/ducks/employers/actions";
import { getEmployer } from "../../state/ducks/employers/selectors";

import EmployerPageDetails from "../EmployerPageDetails/EmployerPageDetails";

import "./EmployerPage.scss";

interface Params {
	id: string;
}

type Props = RouteComponentProps<Params>;

const EmployerPage: React.FC<Props> = (props: Props): React.ReactElement => {
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
		return (
			<main id="employer-page">
				<div className="EmployerPage__Content">
					Loading...
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
