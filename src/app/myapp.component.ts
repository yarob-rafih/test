import { Component } from '@angular/core';
import {Hero} from './models/hero';
import { HeroService } from './services/heroService';
import { HeroDetailComponent } from './shared/heroDetailComponent';

@Component({
  moduleId: module.id,
  selector: 'myapp-app',
  templateUrl: 'myapp.component.html',
  styleUrls: ['myapp.component.css'],
  providers: [HeroService],
  directives: [HeroDetailComponent]
})

export class MyappAppComponent {
  title = 'Hero App!'
  heros: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) { 

  }

  ngOnInit() {
  	this.getHeros();
  }

  getHeros() {
	  this.heroService.getHeros().then(heros => this.heros = heros);
	}

	onSelect (hero) {
		this.selectedHero  = hero;
	}	
}
