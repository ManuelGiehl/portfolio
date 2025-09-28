import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  protected readonly profileImage = signal<string>('assets/img/profile.jpg');
  protected readonly developerName = signal<string>('Manuel Giehl');
  protected readonly developerTitle = signal<string>('FULLSTACK DEVELOPER');
  protected readonly email = signal<string>('manuelgiehl@gmail.com');
  
  onCtaClick(): void {
    console.log('Let\'s talk button clicked!');
  }
}
