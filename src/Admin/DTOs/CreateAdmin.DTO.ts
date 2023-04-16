import { InputType } from "@nestjs/graphql";
import { CreateUserDTO } from "src/User/DTOs/CreateUser.DTO";

@InputType()
export class CreateAdminDTO extends CreateUserDTO{
}