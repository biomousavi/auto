import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignUpDto } from '../dtos/sign-up.dto';
import { UserProfileDto } from '../dtos/user-profile.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { SignUpCommand } from '../commands/sign-up.command';
import { GetProfileQuery } from '../queries/get-profile.query';
import { AbstractController } from './abstract.controller';

@ApiTags('Users')

@Controller('users')
export class UserController extends AbstractController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Create new user account' })
  @ApiResponse({ status: 201, description: 'Returns JWT token' })
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    const command = new SignUpCommand(signUpDto.username, signUpDto.password);

    return this.commandBus.execute(command);
  }

  @Get('me')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, type: UserProfileDto })
  async getProfile(@CurrentUser() userId: number): Promise<UserProfileDto> {
    const query = new GetProfileQuery(userId);
    return this.queryBus.execute(query);
  }
}
