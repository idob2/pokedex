import { Component, OnInit } from '@angular/core';
import { Pokemon } from './models/pokemon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-pokedex';
  pokemons: Pokemon[] = [];
  constructor(){}
  ngOnInit(): void {
    this.pokemons.push({id:0, imageUrl:"gggg", name:"charizard"});
    this.pokemons.push({id:1,imageUrl:"www",name:"pikachu"});
  }

}
