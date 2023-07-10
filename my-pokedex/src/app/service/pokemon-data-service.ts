import { Injectable, OnInit } from '@angular/core';
import { IPokemon, IPokemonDetails, IStats } from '../models/pokemon.model';
import { PokemonService } from './pokemon-service';
import { concatMap, finalize } from 'rxjs/operators';
import { Observable, concat } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService implements OnInit {
  url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100/';
  pokemons: IPokemon[] = [];
  pokemonsDetails: IPokemonDetails[] = [];
  types: string[] = [
    '',
    'bug',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'grass',
    'ghost',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water',
  ];
  constructor(private pokemonService: PokemonService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getAllPokemons(): void {
    this.pokemons = [];
    this.pokemonsDetails = [];

    this.pokemonService
      .fetchAllPokemons()
      .pipe(
        concatMap((pokemonList: IPokemon[]) => {
          const requests: Observable<IPokemon>[] = [];

          for (const pokemon of pokemonList) {
            const request$ = this.pokemonService.fetchSinglePokemon(
              pokemon.url
            );

            requests.push(request$);
          }

          return concat(...requests);
        })
      )
      .subscribe(
        (pokemoneData) => {
          this.pushPokemonToPokemonsArray(pokemoneData, pokemoneData.url);
          this.pushPokemonDetailsToPokemonsDetailsArray(pokemoneData);
        },
        (error: any) => {
          console.error('Error occurred:', error);
        }
      );
  }

  pushPokemonToPokemonsArray(pokemoneData: IPokemon, url: string): void {
    this.pokemons.push({
      imageUrl: pokemoneData.sprites?.front_default,
      name: pokemoneData.name,
      url: url,
      id: pokemoneData.id,
    });
  }

  pushPokemonDetailsToPokemonsDetailsArray(pokemonDetails: any) {
    this.pokemonsDetails.push({
      id: pokemonDetails.id,
      name: pokemonDetails.name,
      height: pokemonDetails.height,
      weight: pokemonDetails.weight,
      types: pokemonDetails.types.map(
        (type: { type: { name: string } }) => type.type.name
      ),
      stats: this.getStatsFromPokemonDetails(pokemonDetails),
    });
  }

  getStatsFromPokemonDetails(pokemonDetails: {
    id: string;
    name: string;
    height: string;
    weight: string;
    species?: string;
    stats: [];
  }): IStats[] {
    const statValues: IStats[] = [];
    pokemonDetails.stats.forEach(
      (stat: { stat: { name: string }; base_stat: number }) => {
        const name = stat.stat.name;
        const value = stat.base_stat;
        statValues.push({ name: name, value: value });
      }
    );
    return statValues;
  }
}
