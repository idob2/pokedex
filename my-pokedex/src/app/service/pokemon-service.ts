import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPokemon, IResults } from '../models/pokemon.model';


@Injectable({
  providedIn: 'root',
})
export class PokemonService implements OnInit {
  url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100/';
  constructor(private http: HttpClient) {}
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  
  async fetchAllPokemons(): Promise<IPokemon[]> {
    const response = await this.http.get<IResults>(this.url).toPromise();
    return response.results;
  }
  async fetchSinglePokemon(pokemonUrl: string): Promise<any> {
    const response = await this.http.get<any>(pokemonUrl).toPromise();
    return response;
  }
}
