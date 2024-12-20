import { plainToClass } from "class-transformer";
import {  IsNotEmpty, IsNumber, IsString, validateSync } from "class-validator";

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  BACKEND_PORT: number;

  @IsNotEmpty()
  @IsString()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsNotEmpty()
  @IsString()
  PG_DATABASE: string;

  @IsNotEmpty()
  @IsString()
  PG_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  PG_PASSWORD: string;

  @IsNotEmpty()
  @IsNumber()
  PG_PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
