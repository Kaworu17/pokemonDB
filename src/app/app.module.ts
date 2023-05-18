import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';

import { PokeListComponent } from './admin/containers/poke-list/poke-list.component';
import { PokemonSingleComponent } from './admin/containers/pokemon-single/pokemon-single.component';

export const routes: Routes = [
  { path: '', component: PokeListComponent, redirectTo: '', pathMatch: 'full' },

  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), AdminModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
