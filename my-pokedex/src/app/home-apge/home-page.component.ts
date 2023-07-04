import { Component, OnInit } from '@angular/core';
import { IPokemon } from '../models/pokemon.model';
import { PokemoneService } from '../service/pokemon-service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  pokemons: IPokemon[] = [];
  pokemonsFiltered: IPokemon[] = [];
  searchText:string ='';
  constructor(
    private pokemoneService: PokemoneService
  ) {}
  ngOnInit(): void {
    this.displayAllPokemons();
  }
  displayAllPokemons():void{
    this.pokemoneService
    .fetchAllPokemons()
    .subscribe((pokemonList: any) => {
      for(const pokemon of pokemonList){
        this.pokemoneService.fetchSinglePokemon(pokemon.url).subscribe((pokemoneData:any) => {
          this.pokemons.push({imageUrl:pokemoneData.sprites.front_default,name:pokemoneData.name,url:pokemon.url})
          this.pokemonsFiltered.push({imageUrl:pokemoneData.sprites.front_default,name:pokemoneData.name,url:pokemon.url})
        })
      }
    });
  }
  search():void{
    if(this.searchText === ''){
      this.pokemons = [...this.pokemonsFiltered]
    }
    else{
      this.pokemons.splice(0, this.pokemons.length)
      for(const pokemon of this.pokemonsFiltered){
        if(pokemon.name.startsWith(this.searchText)){
          this.pokemons.push(pokemon);
        }
      }
    }
  }
}
