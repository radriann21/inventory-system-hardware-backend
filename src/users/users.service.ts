import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      await this.userModel.create({
        ...createUserDto,
        password_hash: hashedPassword,
      });
    } catch {
      throw new InternalServerErrorException('Error creating user');
    }

    return { message: 'User created successfully' };
  }

  async findAll() {
    return await this.userModel.findAll({
      attributes: { exclude: ['password_hash'] },
    });
  }

  async findOne(id: string) {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password_hash'] },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password_hash'] },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.update(updateUserDto);

    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password_hash'] },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.destroy();

    return { message: 'User deleted successfully' };
  }
}
