import { RouteProps } from "react-router-dom";
import { EmployerListSearchFilter } from "./EmployerListSearchFilter";

export interface EmployerListSearchFilterProps extends RouteProps {
	filter: EmployerListSearchFilter;

	onUpdateFilter: () => void;
}
