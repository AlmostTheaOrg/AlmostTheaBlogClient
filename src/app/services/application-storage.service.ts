import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { CryptoService } from './crypto.service';

@Injectable()
export class ApplicationStorageService {
	constructor(private cryptoService: CryptoService) { }

	save(key: string, value: any) {
		window.sessionStorage.setItem(this.cryptoService.hash(key),
			this.cryptoService.encrypt(JSON.stringify(value)));
	}

	get(key: string): any {
		const value = window.sessionStorage.getItem(this.cryptoService.hash(key));
		if (!value) {
			return value;
		}

		return JSON.parse(this.cryptoService.decrypt(value));
	}

	remove(key: string) {
		window.sessionStorage.removeItem(this.cryptoService.hash(key));
	}

	clear() {
		window.sessionStorage.clear();
	}
}
