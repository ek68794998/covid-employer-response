import { RouteProps } from "react-router-dom";
import { EmployerListSearchFilter } from "./EmployerListSearchFilter";

export interface EmployerListSearchFilterProps extends RouteProps {
	initialFilter: EmployerListSearchFilter;

	onUpdateFilterValue: (filters: Partial<EmployerListSearchFilter>) => void;
}
