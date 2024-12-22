import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CityRequestDto } from '../dtos/city-request.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { GetRequestsQuery } from '../queries/get-requests.query';
import { GetCityQuery } from '../queries/get-city.query';
import { AbstractController } from './abstract.controller';

@ApiTags('Cities')
@Controller('cities')
// @UseGuards(JwtAuthGuard)
export class CityController extends AbstractController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  @Get(':postCode')
  @ApiOperation({ summary: 'Get city details by post code' })
  @ApiResponse({ status: 200, type: CityRequestDto })
  async getCityByPostCode(
    @Param('postCode') postCode: string,
    @CurrentUser() userId: number,
  ): Promise<CityRequestDto> {
    const query = new GetCityQuery(postCode, userId);
    return this.queryBus.execute(query);
  }

  @Get('my-requests')
  @ApiOperation({ summary: "Get user's city requests history" })
  @ApiResponse({ status: 200, type: [CityRequestDto] })
  async getMyRequests(
    @CurrentUser() userId: number,
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<CityRequestDto[]> {
    const query = new GetRequestsQuery(userId, paginationQuery.page, paginationQuery.limit);
    return this.queryBus.execute(query);
  }
}
