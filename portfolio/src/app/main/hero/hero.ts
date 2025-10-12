import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  private translate = inject(TranslateService);
  
  protected readonly profileImage = signal<string>('assets/img/profile.jpg');
  protected readonly developerName = signal<string>('Manuel Giehl');
  protected readonly developerTitle = signal<string>('FULLSTACK DEVELOPER');
  protected readonly email = signal<string>('manuelgiehl@gmail.com');
  
  onCtaClick(): void {
    const contactLink = document.querySelector('a[href="#contact"]') as HTMLElement;
    if (contactLink) {
      contactLink.click();
    }
  }
}
