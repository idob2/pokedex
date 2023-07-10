import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { HomePageComponent } from './home-apge/home-page.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './service/authGuard';

const appRoutes: Routes = [
  { path: 'pokemon-details/:id', component: PokemonDetailsComponent, canActivate:[AuthGuard] },
  { path: 'home-page', component: HomePageComponent, canActivate:[AuthGuard]  },
  { path: 'login-page', component: LoginPageComponent},
  { path: '', redirectTo: 'login-page', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
    HomePageComponent,
    PokemonDetailsComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
