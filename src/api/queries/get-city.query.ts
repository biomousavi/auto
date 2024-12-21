export class GetCityQuery {
  constructor(
    public readonly postCode: string,
    public readonly userId: number
  ) {}
}