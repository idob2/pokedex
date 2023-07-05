export interface IPokemon {
  name: string;
  imageUrl?: string;
  url: string;
  id?: number;
}
export interface IPokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  species: string;
}

export interface IResults {
  results: IPokemon[];
}
