import helmet from 'helmet';
import { RoutingControllersOptions } from 'routing-controllers';

import {
	AuthController,
	ContractAttachmentsController,
	ContractPhasesController,
	ContractsController,
	CustomersController,
	FilesController,
	GroupsController,
	OpenAPIDocsController,
	PeopleController,
	PhasesController,
	UsersController,
	WorkLogsController
} from './controllers';
import { BOKARI_GENERATE_API_DOCS } from './env.config';
import { authorizationChecker, currentUserChecker, ErrorHandler } from './middlewares';

// eslint-disable-next-line @typescript-eslint/ban-types
const conditionalControllers: Function[] = [];
if (BOKARI_GENERATE_API_DOCS) conditionalControllers.push(OpenAPIDocsController);

export const routingControllersOptions: RoutingControllersOptions = {
	cors: true,
	routePrefix: '/api',
	controllers: [
		AuthController,
		ContractsController,
		ContractAttachmentsController,
		ContractPhasesController,
		CustomersController,
		FilesController,
		GroupsController,
		PhasesController,
		PeopleController,
		UsersController,
		WorkLogsController,
		...conditionalControllers
	],
	middlewares: [ErrorHandler, helmet()],
	defaultErrorHandler: false,
	classTransformer: true,
	validation: {
		whitelist: true,
		forbidUnknownValues: true,
		forbidNonWhitelisted: true,
		skipMissingProperties: true,
		validationError: {
			target: false
		}
	},
	authorizationChecker,
	currentUserChecker
};
