import { HttpRecaptchaValidatorService } from '../app/services/recaptcha-validator.service';

export const environment = {
	production: true,
	recaptcha_site_key: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
	recaptcha_validator: HttpRecaptchaValidatorService,
	server_url: 'http://localhost:3000/api/',
	crypto : {
		password: 'dsa213p',
	}
};
