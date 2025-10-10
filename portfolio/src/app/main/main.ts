import { Component } from '@angular/core';
import { About } from './about/about';
import { Skills } from './skills/skills';

@Component({
  selector: 'app-main',
  imports: [About, Skills],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

}
