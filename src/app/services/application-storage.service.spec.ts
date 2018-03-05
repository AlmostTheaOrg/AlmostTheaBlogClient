import { TestBed, inject } from '@angular/core/testing';
import { ApplicationStorageService } from './application-storage.service';
import { CryptoService } from './crypto.service';

describe('application-storage.service should', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CryptoService,
				ApplicationStorageService
			]
		}).compileComponents();
	});

	it('be able to retrieve saved object', inject([ApplicationStorageService], (applicationStorage: ApplicationStorageService) => {
		const user = { username: 'username', token: 'hidden.token.api' };
		const key = 'user';

		applicationStorage.save(key, user);
		const savedUser = applicationStorage.get(key);

		expect(savedUser).toEqual(user);
	}));

	it('be able to save simple information', inject([ApplicationStorageService], (applicationStorage: ApplicationStorageService) => {
		const value = 3;
		const key = 'lucky-number';

		applicationStorage.save(key, value);
		const savedUser = applicationStorage.get(key);

		expect(savedUser).toEqual(value);
	}));

	it('be able to remove saved information from storage', inject([ApplicationStorageService],
		(applicationStorage: ApplicationStorageService) => {
			const user = { username: 'username', token: 'hidden.token.api' };
			const key = 'user';

			applicationStorage.save(key, user);
			applicationStorage.remove(key);

			const removedUser = applicationStorage.get(key);
			expect(removedUser).toBeFalsy();
		}));

	it('be able to clear all saved information from storage', inject([ApplicationStorageService],
		(applicationStorage: ApplicationStorageService) => {
			const times = 10;
			for (let i = 0; i < times; i++) {
				applicationStorage.save(i.toString(), i.toString());
			}

			applicationStorage.clear();

			for (let i = 0; i < times; i++) {
				expect(applicationStorage.get(i.toString())).toBeFalsy();
			}
		}));
});
