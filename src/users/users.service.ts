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
import { Logger } from '@nestjs/common';
import { UniqueConstraintError, Op } from 'sequelize';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      await this.userModel.create({
        ...createUserDto,
        password_hash: hashedPassword,
      });

      return {
        message: 'Usuario creado exitosamente',
      };
    } catch (error: unknown) {
      if (error instanceof UniqueConstraintError) {
        this.logger.error('El usuario ya existe');
        throw new ConflictException('El usuario ya existe');
      }
      this.logger.error('Error creating user', error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const page = paginationDto.page ?? 1;
      const limit = paginationDto.limit ?? 10;

      const users = await this.userModel.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        where: paginationDto.search
          ? {
              [Op.or]: [
                { username: { [Op.iLike]: `%${paginationDto.search}%` } },
                { name: { [Op.iLike]: `%${paginationDto.search}%` } },
                { lastname: { [Op.iLike]: `%${paginationDto.search}%` } },
              ],
            }
          : {},
      });

      return {
        data: users.rows,
        meta: {
          total: users.count,
          page,
          limit,
        },
      };
    } catch (err) {
      this.logger.error('Error al encontrar los usuarios', err);
      throw new InternalServerErrorException('Error al encontrar los usuarios');
    }
  }

  async findOne(id: string) {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password_hash'] },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async findByUsername(username: string) {
    try {
      const user = await this.userModel.findOne({
        where: { username },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return user;
    } catch (err) {
      this.logger.error('Error al encontrar usuario por username', err);
      throw new InternalServerErrorException(
        'Error al encontrar usuario por username',
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findByPk(id, {
        attributes: { exclude: ['password_hash'] },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      await user.update(updateUserDto);

      return user;
    } catch (err) {
      this.logger.error('Error al actualizar usuario', err);
      throw new InternalServerErrorException('Error al actualizar usuario');
    }
  }

  async remove(id: string) {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password_hash'] },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await user.destroy();

    return { message: 'Usuario eliminado exitosamente' };
  }
}
