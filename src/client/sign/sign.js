'use strict';

import path from 'path';
import * as jose from 'jose'
import {readFile} from 'fs/promises';

export async function sign() {
  const jwt = await new jose.SignJWT({ 
    'id': 'id',
    'type': 'workstation',
  })
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  .setIssuer('serialNumber')
  .setAudience('jwtAuthServer')
  .sign(await readFile(path.join('./sign/id_rsa')))

  return jwt;
}
