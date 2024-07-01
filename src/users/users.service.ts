import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dto/create-user-dto";



@Injectable()
export class UsersService{

    constructor(@InjectRepository(User) private readonly usersRepository:Repository<User>){}


    async create(userDto: CreateUserDto): Promise<User>{

        const user = new User();
        user.firstName = userDto.firstName;
        user.lastName = userDto.lastName;
        user.email = userDto.email;
        user.password = userDto.password;

        console.log('user service create function');


        return await this.usersRepository.save(user);

    }
}