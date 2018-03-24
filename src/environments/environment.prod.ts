import { DummyRecaptchaValidatorService } from '../app/services/recaptcha-validator.service';

export const environment = {
	production: true,
	recaptcha_site_key: '6LeGMUQUAAAAAO9WIM_XysIDiJO1V8nkRkFSAUvl',
	recaptcha_validator: DummyRecaptchaValidatorService,
	server_url: 'http://localhost:3000/api/',
	crypto : {
		password: '31nfoa',
	}
};
