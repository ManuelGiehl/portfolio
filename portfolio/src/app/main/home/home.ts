import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Skills } from '../skills/skills';
import { Portfolio } from '../portfolio/portfolio';
import { Feedback } from '../feedback/feedback';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Header, Hero, About, Skills, Portfolio, Feedback, Contact],
  templateUrl: './home.html'
})
export class HomeComponent {

}
