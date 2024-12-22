import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetProfileQuery } from '../get-profile.query';
import { UserService } from 'src/infrastructure/services/user.service';

@QueryHandler(GetProfileQuery)
export class GetProfileHandler implements IQueryHandler<GetProfileQuery> {
  constructor(private readonly userService: UserService) {}

  async execute(query: GetProfileQuery) {
    return this.userService.getUserProfile(query.userId);
  }
}
