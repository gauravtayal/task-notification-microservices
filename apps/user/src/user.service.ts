import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
 
  private users: User[] = [];

  async create(userData: any): Promise<User> {
    const hashedPassword = await crypto.hash(userData.password, 10);

    const user: User = {
      id: Date.now().toString(),
      ...userData,
      password: hashedPassword,
    };

    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }
}
