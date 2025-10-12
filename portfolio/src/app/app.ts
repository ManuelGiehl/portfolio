import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Footer } from './main/footer/footer';
import {TranslateService, TranslatePipe, TranslateDirective} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, Footer],
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



