import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { UserController } from './controller/user.controller';
import { CityController } from './controller/city.controller';
import { GetProfileHandler } from './queries/handlers/get-profile.handler';
import { GetCityHandler } from './queries/handlers/get-city.handler';
import { GetMyRequestsHandler } from './queries/handlers/get-requests.handler';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';

@Module({
  imports: [CqrsModule, InfrastructureModule],
  controllers: [UserController, CityController],
  providers: [...QueryHandlers, ...CommandHandlers, GetProfileHandler, GetCityHandler, GetMyRequestsHandler],
})
export class ApiModule {}
