import { Component, OnInit } from '@angular/core';
import { IPokemon } from '../models/pokemon.model';
import { PokemonDataService } from '../service/pokemon-data-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  pokemons: IPokemon[] = [];
  searchText: string = '';
  searchTextType: string = '';
  constructor(private pokemonDataService: PokemonDataService) {}
  ngOnInit(): void {
    this.pokemonDataService.getAllPokemons();
    this.displayAllPokemons();
  }

  displayAllPokemons(): void {
    this.pokemons = this.pokemonDataService.pokemons;
  }

  searchByNameAndType(): void {
    if (this.searchText === '' && this.searchTextType === '') {
      this.pokemons = [...this.pokemonDataService.pokemons];
    } else {
      const idOfSelectedPokemons: number[] = [];
      this.pokemons = [];
      for (const pokemonDetails of this.pokemonDataService.pokemonsDetails) {
        const nameMatches =
          this.searchText === '' ||
          pokemonDetails.name.startsWith(this.searchText);
        const typeMatches =
          this.searchTextType === '' ||
          pokemonDetails.types.some((type) =>
            type.startsWith(this.searchTextType)
          );
        if (nameMatches && typeMatches) {
          idOfSelectedPokemons.push(pokemonDetails.id);
        }
      }
      for (const id of idOfSelectedPokemons) {
        for (const pokemon of this.pokemonDataService.pokemons) {
          if (pokemon.id === id) {
            this.pokemons.push(pokemon);
          }
        }
      }
    }
  }
}
