import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
describe('UserEntity', () => {
  describe('validatePassword', () => {
    let user: User;

    beforeEach(() => {
      user = new User();
      user.password = 'testPassword';
      user.salt = 'testSalt';
      bcrypt.hash = jest.fn();
    });

    it('returns true if password is valid', async () => {
      bcrypt.hash.mockResolvedValue('testPassword');

      expect(bcrypt.hash).not.toHaveBeenCalled();

      const result = await user.validatePassword('123456');
      expect(bcrypt.hash).toHaveBeenCalledWith('123456', user.salt);
      expect(result).toEqual(true);
    });

    it('returns false if password is invalid', async () => {
      bcrypt.hash.mockResolvedValue('wrongPassword');

      expect(bcrypt.hash).not.toHaveBeenCalled();

      const result = await user.validatePassword('wrongPassword');
      expect(bcrypt.hash).toHaveBeenCalledWith('wrongPassword', user.salt);
      expect(result).toEqual(false);
    });
  });
});
