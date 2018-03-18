import { HttpRecaptchaValidatorService } from '../app/services/recaptcha-validator.service';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	recaptcha_site_key: '6LeGMUQUAAAAAO9WIM_XysIDiJO1V8nkRkFSAUvl',
	recaptcha_validator: HttpRecaptchaValidatorService,
	server_url: 'http://localhost:3000/api/',
	crypto : {
		password: 'd6F3Efeq',
	}
};
