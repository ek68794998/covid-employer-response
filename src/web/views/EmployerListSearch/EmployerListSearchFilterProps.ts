import { RouteProps } from "react-router-dom";
import { EmployerListSearchFilter } from "./EmployerListSearchFilter";

export interface EmployerListSearchFilterProps extends RouteProps {
	onUpdateFilterValue: (filters: Partial<EmployerListSearchFilter>) => void;
}
