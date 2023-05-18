import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <header class="header">
        <img src="/assets/img/pokemon-logo.png" alt="Pokedex" class="logo" />
      </header>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  ngOnInit() {}
}
