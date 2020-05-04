import {HttpErrors} from '@loopback/rest';

export class Validation {
  validatePhoneNummber(phoneNumber: string) {
    const regexpPhoneNo = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (!regexpPhoneNo.test(phoneNumber) || phoneNumber.length !== 14) {
      throw new HttpErrors.UnprocessableEntity('Invlaid Phone Number');
    }
  }
  validateName(name: string) {
    const regexpName = /^[a-zA-Z_\-]+$/;
    if (!regexpName.test(name)) {
      throw new HttpErrors.UnprocessableEntity(`${name} is Invalid`);
    }
  }
}
