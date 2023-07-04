import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from "@angular/router";

import { AppComponent } from './app.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { HomePageComponent } from './home-apge/home-page.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

const appRoutes: Routes =[
  {path:'', component: HomePageComponent}
];
@NgModule({
  declarations: [AppComponent, PokemonCardComponent, HomePageComponent, PokemonDetailsComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
