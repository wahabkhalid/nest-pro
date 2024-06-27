import { Type } from "class-transformer";
import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { isTypedArray } from "util/types";

export class CreateSongDTO{
    @IsNotEmpty()  
    @IsString() 
    readonly title : string;

    @IsNotEmpty()  
    
    @IsArray() 
    //@Type(()=> String)
    @IsString({ each: true }) 
    readonly artists : string[];


    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate : Date;
     
    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration : Date;

    @IsString()
    @IsOptional()
     readonly lyrics : string;


}