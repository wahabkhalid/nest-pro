import { Song } from "src/songs/songs.entity";
import { User } from "src/users/users.entity";
import { Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("artists")
export class Artist{

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToMany(() => Song, (song) => song.artists)
    songs: Song[];

    @PrimaryGeneratedColumn()
    id : number;
}