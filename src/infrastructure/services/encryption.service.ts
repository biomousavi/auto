export const ENCRYPTION_CONFIG = {
  ALGORITHM: 'aes-256-cbc',
  SECRET_KEY: process.env.ENCRYPTION_KEY, // 32 bytes key
  IV_LENGTH: 16,
};

import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = ENCRYPTION_CONFIG.ALGORITHM;
  private readonly key = Buffer.from(ENCRYPTION_CONFIG.SECRET_KEY, 'hex');

  encrypt(text: string): { encryptedData: string; iv: string } {
    const iv = crypto.randomBytes(ENCRYPTION_CONFIG.IV_LENGTH);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);

    return {
      encryptedData: encrypted.toString('hex'),
      iv: iv.toString('hex'),
    };
  }

  decrypt(encryptedData: string, iv: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, Buffer.from(iv, 'hex'));

    const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedData, 'hex')), decipher.final()]);

    return decrypted.toString('utf8');
  }
}
