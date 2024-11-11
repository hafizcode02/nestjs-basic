export class UserMailService {
  send() {
    console.info('send Email');
  }
}

export const mailService = new UserMailService();
