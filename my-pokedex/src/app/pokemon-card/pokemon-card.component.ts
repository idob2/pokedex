import { Component, Input, OnInit } from '@angular/core';
import { IPokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent  {
  @Input() pokemon!: IPokemon ;
  clickFunction():void {
    console.log(this.pokemon.url);
  }
}
