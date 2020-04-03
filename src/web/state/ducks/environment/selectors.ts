import { Production } from "../../../../common/constants/EnvironmentConstants";

import { AppState } from "../../AppState";

export const getIsProd = (state: AppState): boolean => state.environment === Production;
