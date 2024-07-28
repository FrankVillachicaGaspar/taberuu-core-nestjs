export class CreateUserDto {
  name: string;
  lastname: string;
  email: string;
  password: string;
  profileImage?: string;
  phoneNumber?: string;
  phoneCode?: string;
  roleId: string;
}
