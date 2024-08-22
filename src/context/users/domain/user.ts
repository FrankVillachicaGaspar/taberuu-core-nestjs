export interface PrimitiveUser {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  profileImage: string | null;
  phoneNumber: string | null;
  phoneCode: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export class User {
  constructor(private attributes: PrimitiveUser) {}

  toValue(): PrimitiveUser {
    return this.attributes;
  }
}
