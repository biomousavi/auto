import { Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

export abstract class AbstractController {
  @Get('/health')
  checkHealth(@Res() res: Response) {
    res.status(HttpStatus.OK).json({ status: 'ok' });
  }
}
