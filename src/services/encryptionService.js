import crypto  from 'crypto';
import { readFileSync } from 'fs';

export const decryptInMemory = (encryptedFilePath, password) => {
  
  const encryptedData = readFileSync(encryptedFilePath);

  const salt = encryptedData.slice(8, 16);
 
    const keyIv = crypto.pbkdf2Sync(password, salt, 10000, 32 + 16, 'sha256');
    const key = keyIv.slice(0, 32);
    const iv = keyIv.slice(32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);


  try {
    // Decrypt the file content (after the salt and IV)
    let decryptedData = decipher.update(encryptedData.slice(16)); // Encrypted content starts after the IV
    decryptedData = Buffer.concat([decryptedData, decipher.final()]); // Finalize the decryption

    // Return the decrypted data as a string (assuming the original data was JSON)
    return JSON.parse(decryptedData.toString()); // Assuming the content was JSON-encoded
  } catch (error) {
    console.error('Decryption error:', error.message);
    throw new Error('Failed to decrypt the data. The password or encrypted file might be incorrect.');
  }
};
