import { v4 as uuidv4 } from 'uuid';

export interface PrimitiveUser {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  profileImage?: string;
  phoneNumber?: string;
  phoneCode?: string;
  roleId: string;
}

export class User {
  constructor(private attributes: PrimitiveUser) {}

  static create(createUser: {
    name: string;
    lastname: string;
    email: string;
    password: string;
    profileImage?: string;
    phoneNumber?: string;
    phoneCode?: string;
    roleId: string;
  }): User {
    return new User({
      id: uuidv4(),
      name: createUser.name,
      lastname: createUser.lastname,
      email: createUser.email,
      password: createUser.password,
      profileImage: createUser.profileImage,
      phoneNumber: createUser.phoneNumber,
      phoneCode: createUser.phoneCode,
      roleId: createUser.roleId,
    });
  }

  toValue(): PrimitiveUser {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      lastname: this.attributes.lastname,
      email: this.attributes.email,
      password: this.attributes.password,
      profileImage: this.attributes.profileImage,
      phoneNumber: this.attributes.phoneNumber,
      phoneCode: this.attributes.phoneCode,
      roleId: this.attributes.roleId,
    };
  }
}
