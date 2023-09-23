import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { Group } from './entities/group.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
  ) {}

  async createWithEmailPassword(
    email: string,
    password: string,
    groupId: string,
  ) {
    const accounts = await this.accountRepository.findBy({ email: email });
    if (accounts.length > 0) {
      throw new BadRequestException('Email already exists');
    }
    const res = await this.accountRepository.save({
      email: email,
      password: password,
      groups: [{ id: groupId }],
    });

    return res;
  }

  async findByEmail(groupId: string, email: string) {
    return await this.accountRepository.findOne({
      where: {
        email: email,
        groups: [{ id: groupId }],
      },
      relations: ['groups'],
    });
  }

  async findByUserId(userId: string) {
    return await this.accountRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['groups'],
    });
  }

  async findGroupById(id: string) {
    return await this.groupRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
