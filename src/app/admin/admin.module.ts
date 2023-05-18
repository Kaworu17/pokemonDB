import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

//containers
import { PokeListComponent } from './containers/poke-list/poke-list.component';
import { PokemonSingleComponent } from './containers/pokemon-single/pokemon-single.component';

//components
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';

export const routes: Routes = [
  {
    path: 'pokemon/new',
    component: PokemonSingleComponent,
    data: { isEdit: false },
  },
  {
    path: 'pokemon/:id',
    component: PokemonSingleComponent,
    data: { isEdit: true },
  },
  { path: 'pokemon', redirectTo: '' },
];

@NgModule({
  declarations: [
    PokeListComponent,
    PokemonSingleComponent,
    PokemonCardComponent,
    PokemonFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
})
export class AdminModule {}
