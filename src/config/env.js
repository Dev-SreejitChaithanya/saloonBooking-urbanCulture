import dotenv from 'dotenv';
dotenv.config();

export const config = {
  encryptionPassword: process.env.SERVICE_ACCOUNT_KEY_PASSWORD,
  port: process.env.PORT || 3000,
};
