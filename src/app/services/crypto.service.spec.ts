import { CryptoService } from './crypto.service';

describe('crypto-service should', () => {
	const cryptoService = new CryptoService();

	it('should return same hash for equal string values', () => {
		const first = cryptoService.hash('value');
		const second = cryptoService.hash('value');

		expect(first).toEqual(second);
	});

	it('should be return same value after encrypt-decrypt cycle', () => {
		const value = 'value';
		const encrypted = cryptoService.encrypt(value);
		const decrypted = cryptoService.decrypt(encrypted);

		expect(decrypted).toEqual(value);
	});
});
