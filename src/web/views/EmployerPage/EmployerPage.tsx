import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";

import { AppState } from "../../state/AppState";
import { getEmployerById as fetchEmployerById, getEmployersById as fetchEmployersById } from "../../state/ducks/employers/actions";
import { getEmployer, getEmployerMetadata, getEmployersById } from "../../state/ducks/employers/selectors";

import EmployerPageDetails from "../EmployerPageDetails/EmployerPageDetails";

import "./EmployerPage.scss";

interface Params {
	id: string;
}

type Props = RouteComponentProps<Params>;

const EmployerPage: React.FC<Props> = (props: Props): React.ReactElement => {
	const dispatch: React.Dispatch<any> = useDispatch();

	const [ linkedEmployerIds, setLinkedEmployerIds ] = useState<string[] | undefined>(undefined);

	const employerId: string = props.match.params.id;

	const employerMetadata: EmployerRecordMetadata | undefined =
		useSelector((state: AppState) => getEmployerMetadata(state, employerId));

	const primaryEmployer: EmployerRecord | undefined =
		useSelector((state: AppState) => getEmployer(state, employerId));

	const linkedEmployers: EmployerRecord[] | undefined =
		useSelector((state: AppState) => linkedEmployerIds && getEmployersById(state, linkedEmployerIds));

	useEffect(
		() => {
			dispatch(fetchEmployerById(employerId));
		},
		[ employerId ]);

	useEffect(
		() => {
			if (!employerMetadata || !primaryEmployer) {
				setLinkedEmployerIds([]);

				return;
			}

			const ids: string[] =
				employerMetadata.parentId
					? [ employerMetadata.parentId ]
					: primaryEmployer.childIds;

			dispatch(
				ids.length > 1
					? fetchEmployersById(ids)
					: fetchEmployerById(ids[0]));

			setLinkedEmployerIds(ids);
		},
		[ employerMetadata, primaryEmployer ]);

	if (!employerMetadata) {
		return (
			<main id="employer-page">
				<div className="EmployerPage__Content">
					Not found.
				</div>
			</main>
		);
	}

	if (!primaryEmployer || !linkedEmployers) {
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
					linkedEmployers={linkedEmployers}
					primaryEmployer={primaryEmployer}
				/>
			</div>
		</main>
	);
};

export default EmployerPage;
