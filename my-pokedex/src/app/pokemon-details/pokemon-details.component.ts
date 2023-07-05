import { Component, Input, OnInit } from '@angular/core';
import { IPokemonDetails } from '../models/pokemon.model';
import { PokemonDataService } from '../service/pokemon-data-service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  @Input() pokemonDetails: IPokemonDetails = {id: 0, name: '', height: 0, weight: 0, species: '', types: [] };
  @Input() imageUrl: string ="";
  constructor(
    private pokemonDataService: PokemonDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id: number = +params['id'];
      const imageUrl = this.pokemonDataService.pokemons.find(pokmon => pokmon.id === id)?.imageUrl;
      if(imageUrl){
        this.imageUrl = imageUrl;
      }
      const details = this.pokemonDataService.pokemonsDetails.find(details => details.id === id);
      if(details){
        this.pokemonDetails = details;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['home-page']);
  }
}
