export interface IPokemon{
    name: string,
    imageUrl: string,
    url: string,
    //need to add details to the card
}
export interface IPokemonDetails{
    name: string;
    height: number;
    weight: number;
    types: string[];
}