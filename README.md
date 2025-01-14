ssl key generated using :
openssl aes-256-cbc -salt -pbkdf2 -in serviceAccountKey.json -out serviceAccountKey.enc -k <PASSWORD>