import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
}