import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {
	constructor(private http: Http) {
	}

	get(url: string, headers?: Headers): Observable<Response> {
		return this.http.get(environment.server_url + url, { headers: headers });
	}

	post(url: string, body: any, headers?: Headers): Observable<Response> {
		return this.http.post(environment.server_url + url, body, { headers });
	}

	put(url: string, body: any, headers?: Headers): Observable<Response> {
		return this.http.put(environment.server_url + url, body, { headers: headers });
	}

	delete(url: string, headers?: Headers): Observable<Response> {
		return this.http.delete(environment.server_url + url, { headers: headers });
	}
}
