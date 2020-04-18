import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";

import { AppState } from "../../state/AppState";
import { getEmployerById, getEmployersById } from "../../state/ducks/employers/actions";
import { getEmployer, getEmployerMetadata } from "../../state/ducks/employers/selectors";

import EmployerPageDetails from "../EmployerPageDetails/EmployerPageDetails";

import "./EmployerPage.scss";

interface Params {
	id: string;
}

type Props = RouteComponentProps<Params>;

const EmployerPage: React.FC<Props> = (props: Props): React.ReactElement => {
	const dispatch: React.Dispatch<any> = useDispatch();

	const employerId: string = props.match.params.id;

	const employerMetadata: EmployerRecordMetadata | undefined =
		useSelector((state: AppState) => getEmployerMetadata(state, employerId));

	const primaryEmployer: EmployerRecord | undefined =
		useSelector((state: AppState) => getEmployer(state, employerId));

	// TODO This is broken. Move it to individual sub-components so they can each use their own selectors.
	const linkedEmployers: EmployerRecord[] = []; // useSelector((state: AppState) => getEmployer(state, employerId));

	useEffect(
		() => {
			const ids: string[] = [ employerId ];

			dispatch(
				ids.length > 1
					? getEmployersById(ids)
					: getEmployerById(ids[0]));
		},
		[ employerMetadata ]);

	if (!primaryEmployer) {
		return (
			<main id="employer-page">
				<div className="EmployerPage__Content">
					Not found.
				</div>
			</main>
		);
	}

	return (
		<main id="employer-page">
			<div className="EmployerPage__Content">
				<EmployerPageDetails
					linkedEmployers={linkedEmployers}
					primaryEmployer={primaryEmployer}
				/>
			</div>
		</main>
	);
};

export default EmployerPage;
