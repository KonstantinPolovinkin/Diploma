'use strict';

import {readFile} from 'fs/promises';
import * as jose from 'jose'
import path from 'path';

export async function verify(jwt) {
  try {
    const privateKey = await readFile(path.join('./verification/id_rsa'));
    const isVerified = await jose.jwtVerify(jwt, privateKey);

    console.log('Verification pased');
    return true;
  } catch (err) {
    console.log(`Verification error: ${err}`);
    return false;
  }
}