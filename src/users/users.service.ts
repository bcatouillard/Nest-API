import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = await hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const updatedUser = this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return updatedUser;
  }

  async delete(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
