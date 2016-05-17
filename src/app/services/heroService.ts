import { Injectable } from '@angular/core';
import { HEROES } from './mockHeros';

@Injectable()
export class HeroService {
	getHeros () {
		return Promise.resolve(HEROES);
	}
}