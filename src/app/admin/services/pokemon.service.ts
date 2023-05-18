import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { tap, of, map, catchError, throwError, retry } from 'rxjs';

import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemons: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  read() {
    //si la db ya ha sido leída
    if (this.pokemons.length) {
      return of(this.pokemons);
    }

    return this.http.get<Pokemon[]>(`/api/pokemons`).pipe(
      tap((pokemons) => {
        this.pokemons = pokemons;
      }),
      retry(2),
      catchError(this.handleError)
    );
  }

  readOne(id: number | null) {
    return this.read().pipe(
      map((pokemons) => {
        const pokemon = pokemons.find((pokemon: Pokemon) => pokemon.id === id);

        if (pokemon) {
          return pokemon;
        }

        return {
          name: '',
          icon: '',
          type01: '',
          type02: '',
          description: '',
        };
      })
    );
  }

  create(payload: Pokemon) {
    return this.http.post<Pokemon>(`/api/pokemons`, payload).pipe(
      tap((pokemon) => {
        this.pokemons = [...this.pokemons, pokemon];
      })
    );
  }

  update(payload: Pokemon) {
    return this.http.put<Pokemon>(`/api/pokemons/${payload.id}`, payload).pipe(
      tap((pokemon) => {
        this.pokemons = this.pokemons.map((item: Pokemon) => {
          if (item.id === pokemon.id) {
            return pokemon;
          }
          return item;
        });
        catchError(this.handleError);
      })
    );
  }

  delete(payload: Pokemon) {
    return this.http.delete<Pokemon>(`/api/pokemons/${payload.id}`).pipe(
      tap(() => {
        this.pokemons = this.pokemons.filter(
          (pokemon: Pokemon) => pokemon.id !== payload.id
        );
      })
    );
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.warn('Client', err.message);
    } else {
      console.warn('Server', err.status);
    }
    return throwError(() => new Error(err.message));
  }
}
