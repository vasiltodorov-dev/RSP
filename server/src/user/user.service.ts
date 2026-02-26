import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
// Import the DTOs that the CLI generated for you
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // This is what talks to Postgres
  ) {}

  // Change this to use the repository
  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  // Add this method (The CLI doesn't create it by default)
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  // You can leave these CLI-generated ones as is or update them later
  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

// @Injectable()
// export class UserService {
//   private readonly MOCK_HASH = '$2b$10$Pa09SIdY6S3fUvI6nO6.0eO.NfL.C7f.O6f.P6f.O6f.O6f.O6f.O6';

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     // Returns a mock user object instead of a string
//     return {
//       id: 1,
//       email: createUserDto.email,
//       password: this.MOCK_HASH, 
//       recipes: [],
//     } as User;
//   }
//   findAll() {
//     return `This action returns all user`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} user`;
//   }

//   async findOneByEmail(email: string): Promise<User | null> {
//     // If the email is test@test.com, return our mock user
//     if (email === 'test@test.com') {
//       return {
//         id: 1,
//         email: 'test@test.com',
//         password: this.MOCK_HASH, // bcrypt will compare against this
//         recipes: [],
//       } as User;
//     }
//     return null;
//   }

//   update(id: number, updateUserDto: UpdateUserDto) {
//     return `This action updates a #${id} user`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} user`;
//   }
// }
