import { Component, OnInit } from '@angular/core';
import { IPokemon } from '../models/pokemon.model';
import { PokemonDataService } from '../service/pokemon-data-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  pokemons: IPokemon[] = [];
  searchText: string = '';
  selectedType: string = '';
  searchHistory: string[] = [];

  constructor(private pokemonDataService: PokemonDataService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonDataService.getAllPokemons();
    this.displayAllPokemons();
    this.searchHistory = this.getSearchHistory();
  }

  logOut(): void {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login-page']);
  }
  maps(): void{
    this.router.navigate(['home-page/google-maps']);
  }
  displayAllPokemons(): void {
    this.pokemons = this.pokemonDataService.pokemons;
  }

  searchByNameAndType(): void {
    if (this.searchText === '' && this.selectedType === '') {
      this.pokemons = [...this.pokemonDataService.pokemons];
    } else {
      if (this.searchText) {
        this.saveItemToSearchHistory(this.searchText);
      }
      const idOfSelectedPokemons: number[] = [];
      this.pokemons = [];
      this.pokemonDataService.pokemonsDetails.forEach((pokemonDetails) => {
        if (
          this.nameMatches(pokemonDetails) &&
          this.typeMatches(pokemonDetails)
        ) {
          idOfSelectedPokemons.push(pokemonDetails.id);
        }
      });
      this.filterIdOfPokemons(idOfSelectedPokemons);
    }
  }

  saveItemToSearchHistory(pokemonName: string): void {
    const searchHistory = this.getSearchHistory();
    searchHistory.unshift(pokemonName);
    this.searchHistory = searchHistory.slice(0, 5);
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    console.log(searchHistory);
  }

  getSearchHistory(): string[] {
    const searchHistory = localStorage.getItem('searchHistory');
    return searchHistory ? JSON.parse(searchHistory) : [];
  }

  nameMatches(pokemonDetails: any): boolean {
    return (
      this.searchText === '' || pokemonDetails.name.startsWith(this.searchText)
    );
  }

  typeMatches(pokemonDetails: any): boolean {
    return (
      this.selectedType === '' ||
      pokemonDetails.types.some((type: string) =>
        type.startsWith(this.selectedType)
      )
    );
  }

  filterIdOfPokemons(idOfSelectedPokemons: number[]) {
    idOfSelectedPokemons.forEach((id) => {
      this.pokemonDataService.pokemons.forEach((pokemon) => {
        if (pokemon.id === id) {
          this.pokemons.push(pokemon);
        }
      });
    });
  }

  get types(): string[] {
    return this.pokemonDataService.types;
  }
}
