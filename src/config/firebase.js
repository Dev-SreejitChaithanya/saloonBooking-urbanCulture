import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { decryptInMemory } from '../services/encryptionService.js';
import dotenv from 'dotenv';
dotenv.config();

const encryptedFilePath = './serviceAccountKey.enc';
const encryptionPassword = process.env.SERVICE_ACCOUNT_KEY_PASSWORD;

const serviceAccount = decryptInMemory(encryptedFilePath, encryptionPassword);

initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore();
