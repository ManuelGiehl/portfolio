import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './main/header/header';
import { Hero } from './main/hero/hero';
import { About } from './main/about/about';
import { Skills } from './main/skills/skills';
import { Portfolio } from './main/portfolio/portfolio';
import { Feedback } from './main/feedback/feedback';
import {TranslateService, TranslatePipe, TranslateDirective} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, About, Skills, Portfolio, Feedback],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private translate = inject(TranslateService);

  protected readonly title = signal('portfolio');

  constructor() {
    this.translate.addLangs(['de', 'en']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
}
}



