import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationItem, Language } from '../interface/interface';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  protected readonly navigationItems: NavigationItem[] = [
    { id: 1, label: 'About me', href: '#about' },
    { id: 2, label: 'Skills', href: '#skills' },
    { id: 3, label: 'Portfolio', href: '#portfolio' }
  ];

  protected readonly languages: Language[] = [
    { code: 'DE', name: 'Deutsch' },
    { code: 'EN', name: 'English' }
  ];

  protected readonly currentLanguage = signal<string>('EN');
}
