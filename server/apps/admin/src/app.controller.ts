import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'https';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getText(@Query("name") name:string):string{
    return this.appService.getText(name)
  }
}
