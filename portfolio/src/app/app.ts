import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './main/header/header';
import { Hero } from './main/hero/hero';
import { About } from './main/about/about';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, About],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
}
