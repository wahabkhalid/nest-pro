import {  MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
//import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/devConfigService';
import {TypeOrmModule} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';


const devConfig = {port : 3000};
const proConfig = {port : 400};
@Module({
  /*imports: [SongsModule, TypeOrmModule.forRoot({
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 'postgres',
    password : '1234',
    database : 'nest-pro',
    entities : [],
    synchronize : true,

  })],*/

  imports:[SongsModule,UsersModule,ArtistsModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide : 'CONFIG',
      useFactory: () =>{
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
})
/*
export class AppModule implements NestMiddleware{
   use(req: any, res: any, next: (error?: any) => void) {
     throw new Error('Method not implemented.');
   }

   configure(consumer : MiddlewareConsumer){
    //consumer.apply(LoggerMiddleware).forRoutes('songs'); // option 1
    //consumer.apply(LoggerMiddleware).forRoutes({path : 'songs', method: RequestMethod.POST}); // option 2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController); // option 3 

   }
  }*/

  export class AppModule implements NestModule{
    constructor(private dataSource : DataSource){
      console.log(dataSource.driver.database);
    }
  configure(consumer: MiddlewareConsumer) {
    //throw new Error('Method not implemented.');
  }
  //configure(consumer: MiddlewareConsumer) {
    //throw new Error('Method not implemented.');
 // }
  }


