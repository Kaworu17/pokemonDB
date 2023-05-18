import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'pokemon-card',
  template: `
    <a routerLink="pokemon/{{ pokemon.id }}" class="pokemon-card">
      <img
        src="assets/img/{{ pokemon.icon }}"
        [alt]="pokemon.name"
        class="pokemon-card-icon"
      />
      <div class="pokemon-card-name">
        <p>
          <span class="pokemon-card-number">{{ pokemon.id }}</span
          >{{ pokemon.name }}
        </p>

        <div class="pokemon-card-label-container">
          <span class="pokemon-card-label">{{ pokemon.type01 }}</span>
          <ng-container *ngIf="pokemon.type02">
            <span class="pokemon-card-label">{{ pokemon.type02 }}</span>
          </ng-container>
        </div>
      </div>
    </a>
  `,
  styles: [],
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon = {} as Pokemon;
}
