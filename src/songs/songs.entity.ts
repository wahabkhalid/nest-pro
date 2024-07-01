import { Artist } from "src/artists/artists.entity";
import { Playlist } from "src/playlists/playlists.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("song")
export class Song{


    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    @Column("varchar", {array : true})
    artists : string[];

    @Column({type : "date"})
    releaseDate : Date;

    @Column({type : "time"})
    duration : Date;

    @Column({type : "text"})
    lyrics : string;

    @ManyToMany(() => Artist, (artist) => artist.songs,{cascade: true})
    @JoinTable({ name: "songs_artists"})
      artist: Artist[];

      /**
   * Many songs can belong to playlist for each unique user
   */
    @ManyToOne(() => Playlist, (playList) => playList.songs)
     playList: Playlist;
}


