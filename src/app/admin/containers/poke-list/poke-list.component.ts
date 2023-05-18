import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'poke-list',
  template: `
    <div class="list-buttons">
      <a routerLink="pokemon/new" class="btn btn--green">
        New Pokemon
        <img src="/assets/img/icon/plus.svg" />
      </a>
    </div>
    <ng-container *ngIf="pokemons?.length; else emptyList">
      <div class="list-container">
        <pokemon-card
          *ngFor="let pokemon of pokemons; trackBy: trackByID"
          [pokemon]="pokemon"
        ></pokemon-card>
      </div>
    </ng-container>

    <ng-template #emptyList>
      <div class="pokemon-error">
        <img
          src="assets/img/Ditto.gif"
          alt="Error"
          class="pokemon-error-icon"
        />
        <p class="pokemon-error-text">¡ OPS !</p>
        <p class="pokemon-error-text">¡ No pokemons found !</p>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class PokeListComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService
      .read()
      .subscribe((pokemons: Pokemon[]) => (this.pokemons = pokemons));
  }

  trackByID(index: number, item: Pokemon) {
    //console.log(index, item);
    return item.id; // usa la propiedad 'id' del elemento como identificador
  }
}
