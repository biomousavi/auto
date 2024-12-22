import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from '../sign-up.command';
import { UserService } from '../../../infrastructure/services/user.service';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(command: SignUpCommand) {
    return this.userService.signUp({
      username: command.username,
      password: command.password,
    });
  }
}
