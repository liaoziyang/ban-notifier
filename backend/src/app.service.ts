import { Injectable } from '@nestjs/common';

/**
 * General app service
 */
@Injectable()
export class AppService {
  /**
   * Hello world :)
   */
  getHello(): string {
    return 'Hello World!';
  }
}
