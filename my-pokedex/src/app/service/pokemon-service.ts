import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemoneService {
  url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100/';
  constructor(private http: HttpClient) {}
  fetchAllPokemons(): any {
    return this.http.get<any>(this.url).pipe(
        map(response => response.results)
      );
  }
  fetchSinglePokemon(pokemoneUrl:string):any{
    return this.http.get<any>(pokemoneUrl);
  }
}
