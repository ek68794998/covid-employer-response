import { Production, Test } from "../../../../common/constants/EnvironmentConstants";

import { AppState } from "../../AppState";

export const getIsProd = (state: AppState): boolean => state.environment === Production;

export const getIsTest = (state: AppState): boolean => state.environment === Test;
