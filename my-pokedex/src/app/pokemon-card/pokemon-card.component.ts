import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPokemon } from '../models/pokemon.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon!: IPokemon;
  constructor(private router: Router) {}
  clickFunction(): void {
    this.router.navigate(['pokemon-details', this.pokemon.id], {
      queryParams: { imageUrl: this.pokemon.imageUrl },
    });
  }
}
