import { GetCityQuery } from '../get-city.query';
import { GetProfileHandler } from './get-profile.handler';
import { GetMyRequestsHandler } from './get-requests.handler';

export const QueryHandlers = [GetProfileHandler, GetCityQuery, GetMyRequestsHandler];
