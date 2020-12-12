import { EntityFilter } from './entity-filter';
import { BadRequestException } from '@nestjs/common';

export class ApiUtil {

  public static isAdminApi = process.env.SERVICE === 'admin-api';

  public static parseFilterJson<T = any>(str: string): EntityFilter<T>[] | EntityFilter<T> {
    try {
      return !!str ? JSON.parse(str) : undefined;

    } catch (e) {
      throw new BadRequestException('Unable to parse filter JSON');
    }
  }

}
