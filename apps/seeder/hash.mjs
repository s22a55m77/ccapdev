import * as bcrypt from 'bcrypt'

const plain = 'Password';

const salt = bcrypt.genSaltSync();
const hashed = bcrypt.hashSync(plain, salt);

console.log(hashed);
