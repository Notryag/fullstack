import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getText(name:string):string{
    return `jhsds2332dello ${name}`
  }
}

