import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { Song } from './songs.entity';
import { Repository, UpdateResult ,In} from 'typeorm';
import { CreateSongDTO } from 'src/dto/create-song-dto';
import { UpdateSongDto } from 'src/dto/update-song-dto';
import { paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artists.entity';


@Injectable()
export class SongsService {

    constructor(@InjectRepository(Song) private readonly songsRepository: Repository<Song>,
                @InjectRepository(Artist) private readonly artistsRepository: Repository<Artist>){}

    //private readonly songs = [];

    /*create(song){
        this.songs.push(song);
        return this.songs;
    }*/

        async create(songDTO : CreateSongDTO):Promise<Song>{

            const song = new Song();
            song.title = songDTO.title;
            song.artists = songDTO.artists;
            song.duration = songDTO.duration;
            song.lyrics = songDTO.lyrics;
            song.releaseDate = songDTO.releaseDate;
            console.log('song service function');
            
           // const artists = await this.artistsRepository.findBy({id:In[songDTO.artists]});
            const artists = await this.artistsRepository.find({
                where: {
                    id: In(songDTO.artists),
                },
            });
            song.artist = artists;
            

            return await this.songsRepository.save(song);
            

        }

    findAll(): Promise<Song[]>{

        console.log('findall fucntion');
        // fetch the song from DB
        // error comes while fetching song from DB
       // throw new error("error in DB while fetching data");
        return this.songsRepository.find();    
    }

    findOne(id: number):Promise<Song>{
        return this.songsRepository.findOneBy({id});
    }

    async remove(id: number): Promise<void>{
         await this.songsRepository.delete(id);
    }

    update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult>{

        return this.songsRepository.update(id,recordToUpdate);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Song>>{

        const queryBuilder = this.songsRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.id', 'DESC');

        //return  paginate<Song>(this.songsRepository, options);
        return paginate<Song>(queryBuilder,options);
    }
   
}
