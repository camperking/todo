import crypto from 'crypto';

export function rndHash(n) {
    return crypto.randomBytes(n).toString('base64').replace(/\/|\+|\=/g, '').substr(0, n);
}