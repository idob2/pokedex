import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPokemon, IResults } from '../models/pokemon.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class PokemonService implements OnInit {
  url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100/';
  constructor(private http: HttpClient) {}
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  
    fetchAllPokemons(): Observable<IPokemon[]> {
      return this.http.get<IResults>(this.url).pipe(
        map(response => response.results)
      );
    }
    
    fetchSinglePokemon(pokemonUrl: string): Observable<any> {
      return this.http.get<any>(pokemonUrl);
    }
}
