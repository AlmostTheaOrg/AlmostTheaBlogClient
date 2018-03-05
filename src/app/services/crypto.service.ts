import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AES, SHA256, enc } from 'crypto-js';

@Injectable()
export class CryptoService {
	public encrypt(value: string): string {
		return AES.encrypt(value, environment.crypto.password).toString();
	}

	public decrypt(value: string): string {
		return AES.decrypt(value, environment.crypto.password).toString(enc.Utf8);
	}

	public hash(value: string): string {
		return SHA256(value).toString();
	}
}
