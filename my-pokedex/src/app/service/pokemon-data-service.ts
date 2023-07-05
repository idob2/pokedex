import { Injectable, OnInit } from '@angular/core';
import { IPokemon, IPokemonDetails } from '../models/pokemon.model';
import { PokemonService } from './pokemon-service';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService implements OnInit {
  url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100/';
  pokemons: IPokemon[] = [];
  pokemonsDetails: IPokemonDetails[] = [];

  constructor(private pokemonService: PokemonService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async getAllPokemons(): Promise<void> {
    try {
        this.pokemons.splice(0,this.pokemons.length);
        this.pokemonsDetails.splice(0,this.pokemonsDetails.length);

      const pokemonList = await this.pokemonService.fetchAllPokemons();

      for (const pokemon of pokemonList) {
        const pokemoneData = await this.pokemonService.fetchSinglePokemon(
          pokemon.url
        );
        this.pokemons.push({
          imageUrl: pokemoneData.sprites.front_default,
          name: pokemoneData.name,
          url: pokemon.url,
          id: pokemoneData.id,
        });
        this.pokemonsDetails.push({
          id: pokemoneData.id,
          name: pokemoneData.name,
          height: pokemoneData.height,
          weight: pokemoneData.weight,
          species: pokemoneData.species.name,
          types: pokemoneData.types.map(
            (type: { type: { name: string } }) => type.type.name
          ),
        });
      }
    } catch (error) {
      console.error('Error occurred in https request:', error);
    }
  }
}
