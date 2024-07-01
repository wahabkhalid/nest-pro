import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "src/dto/create-user-dto";

@Controller('users')
export class UsersController{
    constructor( private usersService : UsersService){}


    @Post()
    create(@Body() createUserDTO: CreateUserDto){
        console.log('user create contoller route');
        return this.usersService.create(createUserDTO);

    }
}