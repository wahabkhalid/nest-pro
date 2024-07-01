import { TypeOrmModule } from "@nestjs/typeorm";
import { Artist } from "./artists.entity";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([Artist])],
    controllers: [], 
    providers: []
  })
  export class ArtistsModule {}
  