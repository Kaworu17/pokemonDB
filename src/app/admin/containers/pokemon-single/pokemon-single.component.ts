import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'pokemon-single',
  template: `
    <div>
      <pokemon-form
        [pokemon]="pokemon"
        [isEdit]="isEdit"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      ></pokemon-form>
    </div>
  `,
  styles: [],
})
export class PokemonSingleComponent {
  pokemon!: Pokemon;
  isEdit!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    let myid: number = 0;

    if (id !== null) {
      myid = parseInt(id);
    }

    console.log(myid);

    this.pokemonService
      .readOne(myid)
      .subscribe((pokemon: Pokemon) => (this.pokemon = pokemon));

    this.isEdit = this.route.snapshot.data['isEdit'];
  }

  onCreate(pokemon: Pokemon) {
    this.pokemonService
      .create(pokemon)
      .subscribe(() => this.router.navigateByUrl('/'));
  }

  onUpdate(pokemon: Pokemon) {
    this.pokemonService.update(pokemon).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => console.log('on update error!', err),
    });
  }

  onDelete(pokemon: Pokemon) {
    this.pokemonService
      .delete(pokemon)
      .subscribe(() => this.router.navigateByUrl('/'));
  }
}
