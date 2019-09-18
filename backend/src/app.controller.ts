import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * General app controller
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Hello world :)
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
