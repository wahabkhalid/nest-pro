import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/devConfigService';

@Injectable()
export class AppService {

  constructor(private devConfigService : DevConfigService,
    @Inject('CONFIG')
      private config : {port : string},
    
  ){}
  getHello(): string {
    return `Hello World from app service! ${this.devConfigService.getDBHOST()} PORT = ${this.config.port}`;
  }
}
