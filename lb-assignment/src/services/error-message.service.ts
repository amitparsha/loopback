import {HttpErrors} from '@loopback/rest';
import {User} from '../models';

export class ErrorMessage {
  async userErrorMessagePost(user: Promise<User>) {
    await user
      .then(res => {})
      .catch(err => {
        if (err.code === '23505') {
          throw new HttpErrors.UnprocessableEntity(
            'User with this email already exists',
          );
        }
      });
    return user;
  }
  async userErrorMessagePatch(user: Promise<void>) {
    await user
      .then(res => {})
      .catch(err => {
        if (err.code === '23505') {
          throw new HttpErrors.UnprocessableEntity(
            'User with this email already exists',
          );
        }
      });
    return user;
  }
}
