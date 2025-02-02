import { Body, Controller, DefaultValuePipe, Delete, Get ,HttpException,HttpStatus,Inject,Param,ParseIntPipe,Post,Put, Query, Scope} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from 'src/dto/create-song-dto';
import {Connection} from 'src/common/constants/connection';
import { Song } from './songs.entity';
import { UpdateSongDto } from 'src/dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('songs')
//@Controller({path :"songs", scope: Scope.REQUEST})
export class SongsController {

    constructor(private songsService : SongsService,
        @Inject('CONNECTION') 
        private connection : Connection,
    ){
        console.log(`This is the connection string : ${this.connection.CONNECTION_STRING}`);
    }

    @Post()
      create(@Body() createSongDTO : CreateSongDTO){
         console.log('song controller function');
        return this.songsService.create(createSongDTO);
    }


        


    @Get()
    getAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
           @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10): Promise <Pagination<Song>>{

            limit = limit > 100 ? 100 : limit;
        try{
        //return this.songsService.findAll();
        return this.songsService.paginate({
            page,
            limit,
        });
    }
    catch(e){
        console.log('Im in the catch block ',e);
        throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR,
            {
                cause : e,
            },
        )
    }
    }

    

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe) id : number){
       // return ` find a song based on id ${typeof id}`;
        return this.songsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id :number, @Body() updateSongDTO : UpdateSongDto){

        //return ' update a song based on id'

        return this.songsService.update(id,updateSongDTO);

    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id:number){
        //return 'delete a song based on id'

        return this.songsService.remove(id);
    }
}
