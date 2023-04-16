
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from 'src/common/Decorators/Role-Decorator';
import { UserService } from 'src/User/User.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/User/DTOs/CreateUser.DTO';
import { UserEntity } from 'src/Models/User.model';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './DTOs/Login.Dto';
import { DoctorsService } from 'src/Doctors/Doctors.Service';
import { CreateDoctorDTO } from 'src/Doctors/DTOs/CreateDoctor.DTO';

@Injectable()
export class AuthService {
  constructor(

    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly doctorService:DoctorsService,

    ) {
      
    }
  

  async signup(user: CreateUserDTO): Promise<UserEntity> {
    const userExist = await this.userService.findUserByEmail(user.Email)
    if (userExist !=null) {
      throw new BadRequestException('User Already Exist');
    }
    const saltOrRounds = 10;
    const password =user.Password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    
    return await this.userService.create({ ...user, Password: hash });

    
  }

  async signupDoctor(user: CreateDoctorDTO){
    const userExist =await this.userService.findUserByEmail(user.Email)
    if (userExist != null) {
      throw new BadRequestException('User Already Exist');
    }
    const saltOrRounds = 10;
    const password =user.Password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    
    return await this.doctorService.create({ ...user, Password: hash });

    
  }

  async signin(user: LoginDto):Promise<String> {
    
    const existingUser = await this.userService.findUserByEmail(user.email);

    if(existingUser != null){
      const isMatch = await bcrypt.compare(user.password, existingUser.Password);

      if (!isMatch) {
        throw new UnauthorizedException('Password Incorrect');
      }
      var role = Role.User
      if(existingUser.IsAdmin){
        role = Role.Admin
      }
      else if(existingUser.IsDoctor){
        role = Role.Doctor
      }
      
      const payload = { username: existingUser.Email, sub: existingUser.Id , Role:role };
     
      return this.jwtService.sign(payload)
    }
    throw new UnauthorizedException('Email Incorrect');


    
  }
}