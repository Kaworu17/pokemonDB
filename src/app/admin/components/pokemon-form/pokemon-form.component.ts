import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'pokemon-form',
  template: `
    <form class="pokemon-form" #form="ngForm" *ngIf="pokemon; else loading">
      <label>
        <span> ID </span>
        <input
          type="number"
          name="id"
          class="input"
          required
          #id="ngModel"
          [ngModel]="pokemon.id"
          ngModel
        />

        <ng-container *ngIf="id.invalid && id.touched">
          <div class="pokemon-form-error" *ngIf="id.errors?.required">
            ID is required
          </div>
        </ng-container>
      </label>

      <label>
        <span> Name </span>
        <input
          type="text"
          name="name"
          class="input"
          required
          minlength="3"
          [ngModel]="pokemon.name"
          [ngModelOptions]="{ updateOn: 'blur' }"
          #name="ngModel"
        />

        <ng-container *ngIf="name.invalid && name.touched">
          <div class="pokemon-form-error" *ngIf="name.errors?.required">
            Name is required
          </div>
          <div class="pokemon-form-error" *ngIf="name.errors?.minlength">
            Minimun length is 3 characters
          </div>
        </ng-container>
      </label>

      <!-- Estados de un formulario
      <pre> {{ name.valid }} </pre>
      <pre> {{ name.invalid }} </pre>
      <pre> {{ name.touched }} </pre>
      <pre> {{ name.untouched }} </pre>
      <pre> {{ name.pristine }} </pre>
      <pre> {{ name.dirty }} </pre>
      <pre> {{ name.errors | json }} </pre> -->

      <label>
        <span> Icon </span>
        <select
          name="icon"
          class="input input--select"
          required
          #icon="ngModel"
          [ngModel]="pokemon.icon"
        >
          <option *ngFor="let icon of icons" [ngValue]="icon">
            {{ icon }}
          </option>
        </select>

        <ng-container *ngIf="icon.invalid && icon.touched">
          <div class="pokemon-form-error" *ngIf="name.errors?.required">
            Icon is required
          </div>
        </ng-container>
      </label>

      <label>
        <span> Element </span>
        <select
          name="type01"
          class="input input--select"
          required
          #type01="ngModel"
          [ngModel]="pokemon.type01"
        >
          <option *ngFor="let element of elements" [ngValue]="element">
            {{ element }}
          </option>
        </select>

        <ng-container *ngIf="type01.invalid && type01.touched">
          <div class="pokemon-form-error" *ngIf="type01.errors?.required">
            Element is required
          </div>
        </ng-container>
      </label>

      <label>
        <span> Element Secondary </span>
        <select
          name="type02"
          class="input input--select"
          [ngModel]="pokemon.type02"
        >
          <option *ngFor="let element of elements" [ngValue]="element">
            {{ element }}
          </option>
        </select>
      </label>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          class="input input--textarea"
          [ngModelOptions]="{ updateOn: 'blur' }"
          [ngModel]="pokemon.description"
        ></textarea>
      </label>

      <button
        type="button"
        class="btn btn--green"
        *ngIf="!isEdit"
        (click)="handleCreate(form)"
      >
        Create
      </button>
      <button
        type="button"
        class="btn btn--green"
        [disabled]="form.pristine"
        *ngIf="isEdit"
        (click)="handleUpdate(form)"
      >
        Update
      </button>
      <button
        type="button"
        class="btn btn--grey"
        *ngIf="form.touched"
        (click)="form.resetForm()"
      >
        Reset Form
      </button>
      <button
        type="button"
        class="btn btn--grey"
        *ngIf="isEdit"
        (click)="handleDelete()"
      >
        Delete
      </button>
      <button type="button" routerLink="" class="btn btn--grey">Back</button>

      <div class="top-space">
        <div class="btn btn--green" (click)="toggleDiv()">Data Info</div>
        <div *ngIf="showDiv">
          Info comming:
          <pre> {{ pokemon | json }} </pre>
          Info to send:
          <pre> {{ form.value | json }} </pre>
          Form status:
          <pre> {{ form.form.status | json }} </pre>
        </div>
      </div>

      <div class="pokemon-form-working" *ngIf="form.valid && form.submitted">
        Working...
      </div>
    </form>

    <ng-template #loading>Loading...</ng-template>
  `,
  styles: [],
})
export class PokemonFormComponent {
  @Input() pokemon: Pokemon = {} as Pokemon;
  @Input() isEdit!: boolean;
  @Output() create = new EventEmitter<Pokemon>();
  @Output() update = new EventEmitter<Pokemon>();
  @Output() delete = new EventEmitter<Pokemon>();

  public descriptionValue: string = '';
  icons: string[] = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png',
    '10.png',
    '11.png',
    '12.png',
    '13.png',
    '25.png',
    '132.png',
    '151.png',
  ];
  elements: string[] = [
    'bug',
    'dragon',
    'electric',
    'fighting',
    'fire',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'water',
  ];

  handleCreate(form: NgForm) {
    if (form.valid) {
      this.cleanPokemon(form);

      this.create.emit(form.value);
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleUpdate(form: NgForm) {
    if (form.valid) {
      this.cleanPokemon(form);

      this.update.emit({ id: this.pokemon.id, ...form.value });
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleDelete() {
    if (confirm(`Really delete ${this.pokemon.name}?`)) {
      this.delete.emit({ ...this.pokemon });
    }
  }

  cleanPokemon(form: NgForm) {
    if (
      form.value.type02 === '' ||
      form.value.type02 === null ||
      form.value.type02 === undefined
    ) {
      delete form.value.type02;
    }
    if (
      form.value.description === '' ||
      form.value.description === null ||
      form.value.description === undefined
    ) {
      delete form.value.description;
    }
  }

  showDiv = false;

  toggleDiv() {
    this.showDiv = !this.showDiv;
  }
}
