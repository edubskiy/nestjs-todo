import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

const mockCredentialsDTO = {
  username: 'test username',
  password: 'test password',
};

describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('successfully signs up user', () => {
      save.mockResolvedValue(undefined);
      return expect(
        userRepository.signUp(mockCredentialsDTO),
      ).resolves.not.toThrow();
    });

    it('throws conflict exception when username already exists', () => {
      save.mockRejectedValue({ code: '23505' });

      return expect(userRepository.signUp(mockCredentialsDTO)).rejects.toThrow(
        ConflictException,
      );
    });

    it('throws unhandled internal server error exception', () => {
      save.mockRejectedValue({ code: '12345' });

      return expect(userRepository.signUp(mockCredentialsDTO)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('validateUserPassword', () => {
    let user;

    beforeEach(() => {
      userRepository.findOne = jest.fn();

      user = new User();
      user.username = 'test username';
      user.validatePassword = jest.fn();
    });

    it('returns username when validation is successful', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);

      const result = await userRepository.validateUserPassword(
        mockCredentialsDTO,
      );

      return expect(result).toEqual(user.username);
    });

    it('returns null if user can not be found', async () => {
      userRepository.findOne.mockResolvedValue(null);

      const result = await userRepository.validateUserPassword(
        mockCredentialsDTO,
      );

      expect(user.validatePassword).not.toHaveBeenCalled();

      return expect(result).toEqual(null);
    });

    it('returns null if password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);

      const result = await userRepository.validateUserPassword(
        mockCredentialsDTO,
      );

      expect(user.validatePassword).toHaveBeenCalled();

      return expect(result).toEqual(null);
    });
  });

  describe('hashPassword', () => {
    it('calls bcrypt.hash to generate hash', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue('testHash');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await userRepository.hashPassword(
        'testPassword',
        'testSalt',
      );
      expect(bcrypt.hash).toHaveBeenCalledWith('testPassword', 'testSalt');

      return expect(result).toEqual('testHash');
    });
  });
});
