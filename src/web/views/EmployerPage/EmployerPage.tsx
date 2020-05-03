import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getEmployerById as fetchEmployerById } from "../../state/ducks/employers/actions";
import { getEmployer, getEmployerMetadata, getEmployersList } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import AppHelmet from "../AppHelmet/AppHelmet";
import EmployerPageDetails from "../EmployerPageDetails/EmployerPageDetails";

import "./EmployerPage.scss";

interface Props {
	employerId: string;
}

const EmployerPage: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const dispatch: React.Dispatch<any> = useDispatch();

	const employerId: string = props.employerId;

	const hasLoadedEmployers: boolean =
		useSelector((state: AppState) => !!getEmployersList(state)?.length);

	const employerExists: boolean =
		useSelector((state: AppState) => !!getEmployerMetadata(state, employerId));

	const employer: EmployerRecord | undefined =
		useSelector((state: AppState) => getEmployer(state, employerId));

	useEffect(
		() => {
			dispatch(fetchEmployerById(employerId));
		},
		[ employerId ]);

	if (hasLoadedEmployers && !employerExists) {
		return (
			<main id="employer-page">
				<AppHelmet
					title={strings.notFound}
				/>
				<div className="EmployerPage__Content EmployerPage__Content--NotFound">
					{strings.notFound}
				</div>
			</main>
		);
	}

	if (!hasLoadedEmployers || !employer) {
		return (
			<main id="employer-page">
				<AppHelmet
					title={strings.loading}
				/>
				<div className="EmployerPage__Content EmployerPage__Content--Loading">
					{strings.loading}
				</div>
			</main>
		);
	}

	return (
		<main id="employer-page">
			<AppHelmet
				description={employer.summary}
				title={employer.name}
			/>
			<div className="EmployerPage__Content">
				<EmployerPageDetails employer={employer} />
			</div>
		</main>
	);
};

export default EmployerPage;
