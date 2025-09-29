import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './main/header/header';
import { Hero } from './main/hero/hero';
import { About } from './main/about/about';
import { Skills } from './main/skills/skills';
import { Portfolio } from './main/portfolio/portfolio';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, About, Skills, Portfolio],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
}
