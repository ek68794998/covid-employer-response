import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { RouteProps, Link } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { DesignHelpers } from "../../../common/DesignHelpers";
import { EmployerEmployeeProfile } from "../../../common/EmployerEmployeeProfile";
import { EmployerLocation } from "../../../common/EmployerLocation";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { EmployerRecordBase } from "../../../common/EmployerRecordBase";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { format, LocalizedStrings } from "../../../common/LocalizedStrings";
import { WikipediaHelpers } from "../../../common/WikipediaHelpers";

import { AppState } from "../../state/AppState";
import { getEmployerMetadata, getEmployersList } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerCitationList from "../EmployerCitationList/EmployerCitationList";
import EmployerListItem from "../EmployerListItem/EmployerListItem";
import EmployerLogo from "../EmployerLogo/EmployerLogo";

import "./EmployerPageDetails.scss";
import EmployerRatingPill from "../EmployerRatingPill/EmployerRatingPill";

interface Props extends RouteProps {
	employer: EmployerRecord;
}

const citationSort = (a: Citation, b: Citation): number => {
	if (a.positivity !== b.positivity) {
		return b.positivity - a.positivity;
	}

	return (b.sources ? b.sources.length : 0) - (a.sources ? a.sources.length : 0);
};

const EmployerPageDetails: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const strings: LocalizedStrings = useSelector(getStrings);

	const { employer } = props;

	const employersList: EmployerRecordMetadata[] | undefined =
		useSelector((state: AppState) => getEmployersList(state));

	const employerMetadata: EmployerRecordMetadata | undefined =
		useSelector((state: AppState) => getEmployerMetadata(state, employer?.id));

	if (!employer || !employerMetadata || !employersList) {
		return null;
	}

	const getProfileRow =
		(labelText: string, icon: string, data: JSX.Element, linkUrl?: string): JSX.Element => (
			<tr>
				<td
					className="EmployerPageDetails__ProfileLabel"
					title={labelText}
				>
					{DesignHelpers.materialIcon(icon)}
				</td>
				<td className="EmployerPageDetails__ProfileValue">
					{linkUrl
						? <a href={linkUrl} rel="noopener noreferrer" target="_blank">{data}&nbsp;{DesignHelpers.materialIcon("launch")}</a>
						: data}
				</td>
			</tr>
		);

	const maxRelatedEmployers: number = 5;

	const relatedEmployers: [string, number][] =
		employersList
			.map((e: EmployerRecordMetadata): [string, number] => [
				e.id,
				EmployerRecordBase.calculateRelationshipStrength(employerMetadata, e),
			])
			.filter((value: [string, number]) => {
				if (employer.parentId === value[0] || employer.childIds.indexOf(value[0]) >= 0) {
					return false;
				}

				return value[1] > 0;
			})
			.sort((a: [string, number], b: [string, number]) => {
				if (a[1] === b[1]) {
					return Math.random() - 0.5;
				}

				return b[1] - a[1];
			})
			.slice(0, maxRelatedEmployers);

	let employeeDeltaClass: string = "";
	let employeeDeltaString: string = "";
	let currentEmployees: EmployerEmployeeProfile | undefined;

	if (employer.employeesBefore && employer.employeesAfter) {
		currentEmployees = employer.employeesAfter;
		const employeeDelta: number =
			EmployerEmployeeProfile.subtract(employer.employeesAfter, employer.employeesBefore);

		let employeeDeltaValue: string = employeeDelta.toLocaleString();

		if (employeeDelta > 0) {
			employeeDeltaValue = `+${employeeDeltaValue}`;
			employeeDeltaClass = "EmployerPageDetails__Delta EmployerPageDetails__Delta--Positive";
		} else {
			employeeDeltaClass = "EmployerPageDetails__Delta EmployerPageDetails__Delta--Negative";
		}

		const employeeDeltaDateString: string | null = EmployerEmployeeProfile.getDateString(employer.employeesBefore);

		employeeDeltaString =
			employeeDeltaDateString
				? format(
					strings.employeeDelta,
					{ change: employeeDeltaValue, date: employeeDeltaDateString })
				: employeeDeltaValue;
	} else {
		currentEmployees = employer.employeesBefore || employer.employeesAfter;
	}

	let updateDate: Date | null = null;

	if (employer.lastUpdated) {
		const updateCutoffDate: Date = new Date("2020-01-01T12:00:00Z");
		const actualUpdateDate: Date = new Date(employer.lastUpdated);

		if (actualUpdateDate >= updateCutoffDate) {
			updateDate = actualUpdateDate;
		}
	}

	const isParentCompany: boolean = !!(employer.childIds.length);
	const isChildCompany: boolean = !!(employer.parentId);

	return (
		<div className="EmployerPageDetails__Container">
			<div className="EmployerPageDetails__Header">
				<EmployerLogo employer={employer} />
				<h1 className="EmployerPageDetails__Title">
					{employer.shortName || employer.name}
				</h1>
				<EmployerRatingPill
					employer={employerMetadata}
					isAnnotated={isParentCompany || isChildCompany}
				/>
			</div>
			{(isParentCompany || isChildCompany) && (
				<div className="EmployerPageDetails__ConnectedNote">
					* {isParentCompany ? strings.connectedChild : strings.connectedParent}
				</div>
			)}
			<div className="EmployerPageDetails__Summary">
				<ReactMarkdown source={employer.summary} />
				{updateDate && (
					<div className="EmployerPageDetails__LastUpdated">
						{format(strings.employerUpdatedDate, { date: updateDate.toLocaleDateString() })}
					</div>
				)}
			</div>

			<EmployerCitationList citations={employer.citations.concat().sort(citationSort)} />

			<div className="EmployerPageDetails__MetaFooter">
				<div className="EmployerPageDetails__Profile">
					<h2>{strings.profile}</h2>
					<table className="EmployerPageDetails__ProfileDetails">
						<tbody>
							{getProfileRow(
								strings.detailDescriptions.name,
								"work",
								<>
									{employer.name}
									{employer.aliases && employer.aliases.length > 0 && (
										<div className="EmployerPageDetails__ProfileSublist">
											<h3>AKA</h3>
											<ul>
												{employer.aliases.map((a: string, i: number) => <li key={i}>{a}</li>)}
											</ul>
										</div>
									)}
								</>,
							)}
							{employer.industries && employer.industries.length > 0 && getProfileRow(
								strings.detailDescriptions.industry,
								"category",
								<ul>
									{employer.industries.map(
										(a: string, i: number) => <li key={i}>{strings.industries[a]}</li>)}
								</ul>,
							)}
							{employer.location && getProfileRow(
								strings.detailDescriptions.location,
								"place",
								<>
									{EmployerLocation.toString(employer.location, strings.countryNames)}
									<img
										className="EmployerPageDetails__ProfileFlag"
										src={`/images/flags/${employer.location.country}.svg`}
									/>
								</>,
								WikipediaHelpers.getWikipediaUrl(employer.location.wiki) || "",
							)}
							{currentEmployees && getProfileRow(
								strings.detailDescriptions.employees,
								"people",
								<>
									{EmployerEmployeeProfile.toString(currentEmployees, true, false)}
									{employeeDeltaString && (
										<span className={employeeDeltaClass}>({employeeDeltaString})</span>
									)}
								</>,
							)}
							{employer.ticker && getProfileRow(
								strings.detailDescriptions.ticker,
								"attach_money",
								<>${employer.ticker}</>,
								`https://finance.yahoo.com/quote/${employer.ticker}`,
							)}
							{employer.wiki && getProfileRow(
								strings.detailDescriptions.wikipedia,
								"language",
								<>{format(strings.detailLabels.wikipedia, { page: employer.wiki })}</>,
								WikipediaHelpers.getWikipediaUrl(employer.wiki) || "",
							)}
							{employer.officialWebsite && getProfileRow(
								strings.detailDescriptions.officialWebsite,
								"home",
								<>{strings.detailLabels.officialWebsite}</>,
								employer.officialWebsite,
							)}
							{getProfileRow(
								strings.detailDescriptions.officialWebsite,
								"flag",
								<Link className="EmployerPageDetails__SubmitLink" to="/submit">
									{format(
										strings.employerSubmitChange,
										{ employer: employer.shortName || employer.name },
									)}
								</Link>,
							)}
						</tbody>
					</table>
				</div>
				<div className="EmployerPageDetails__LinkedCompanies">
					{employer.parentId && (
						<>
							<h2>{strings.linkTypes.parent}</h2>
							<EmployerListItem employerId={employer.parentId} showDetails={false} />
						</>
					)}
					{employer.childIds.length > 0 && (
						<>
							<h2>{strings.linkTypes.children}</h2>
							{employer.childIds.map((id: string) => (
								<EmployerListItem key={id} employerId={id} showDetails={false} />
							))}
						</>
					)}
					{relatedEmployers.length > 0 && (
						<>
							<h2>{strings.linkTypes.related}</h2>
							{relatedEmployers.map((value: [string, number]) => (
								<EmployerListItem key={value[0]} employerId={value[0]} showDetails={false} />
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default EmployerPageDetails;
