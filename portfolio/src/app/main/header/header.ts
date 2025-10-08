import { Component, signal, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationItem, Language } from '../interface/interface';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  private translate = inject(TranslateService);
  
  protected readonly navigationItems: NavigationItem[] = [
    { id: 1, label: 'About me', href: '#about', active: false },
    { id: 2, label: 'Skills', href: '#skills', active: false },
    { id: 3, label: 'Portfolio', href: '#portfolio', active: false }
  ];
  
  private isManualClick = false;

  protected readonly languages: Language[] = [
    { code: 'DE', name: 'Deutsch' },
    { code: 'EN', name: 'English' }
  ];

  protected readonly currentLanguage = signal<string>('EN');
  protected readonly isMobileMenuOpen = signal<boolean>(false);

  ngOnInit() {
    this.updateActiveSection();
    this.initializeLanguage();
  }

  switchLanguage(langCode: string): void {
    this.currentLanguage.set(langCode);
    this.translate.use(langCode.toLowerCase());
    this.updateNavigationLabels();
  }

  private initializeLanguage(): void {
    const savedLang = localStorage.getItem('selectedLanguage') || 'EN';
    this.currentLanguage.set(savedLang);
    this.translate.use(savedLang.toLowerCase());
    this.updateNavigationLabels();
  }

  private updateNavigationLabels(): void {
    const lang = this.currentLanguage();
    if (lang === 'DE') {
      this.navigationItems[0].label = 'Über mich';
      this.navigationItems[1].label = 'Skills';
      this.navigationItems[2].label = 'Portfolio';
    } else {
      this.navigationItems[0].label = 'About me';
      this.navigationItems[1].label = 'Skills';
      this.navigationItems[2].label = 'Portfolio';
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.updateActiveSection();
  }

  scrollToSection(event: Event, href: string) {
    event.preventDefault();
    
    this.setActiveTab(href);
    this.startSmoothScroll(href);
  }

  scrollToHero(): void {
    this.scrollToTop();
  }

  private scrollToTop(): void {
    const startPosition = window.pageYOffset;
    const distance = -startPosition;
    
    this.animateScroll(startPosition, distance);
  }

  private setActiveTab(href: string) {
    this.isManualClick = true;
    
    this.navigationItems.forEach(item => {
      item.active = false;
    });
    
    const clickedItem = this.navigationItems.find(item => item.href === href);
    if (clickedItem) {
      clickedItem.active = true;
    }
  }

  private startSmoothScroll(href: string) {
    const element = document.querySelector(href) as HTMLElement;
    if (!element) return;

    const targetPosition = this.calculateTargetPosition(element, href);
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    
    this.animateScroll(startPosition, distance);
  }

  private calculateTargetPosition(element: HTMLElement, href: string): number {
    let targetPosition = element.offsetTop;
    
    if (href === '#portfolio') {
      targetPosition = targetPosition - 150;
    }
    
    return targetPosition;
  }

  private animateScroll(startPosition: number, distance: number) {
    const duration = 600;
    let start: number | null = null;

    const animate = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const easedProgress = this.easeInOutQuart(progress);
      const currentPosition = startPosition + distance * easedProgress;
      
      this.scrollToPosition(currentPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.resetManualClickFlag();
      }
    };

    requestAnimationFrame(animate);
  }

  private easeInOutQuart(t: number): number {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  }

  private scrollToPosition(position: number) {
    window.scrollTo(0, position);
    document.documentElement.scrollTop = position;
    document.body.scrollTop = position;
  }

  private resetManualClickFlag() {
    setTimeout(() => {
      this.isManualClick = false;
    }, 500);
  }


  private updateActiveSection() {
    if (this.isManualClick) {
      return;
    }
    
    const currentSection = this.detectCurrentSection();
    this.updateNavigationItems(currentSection);
  }

  private detectCurrentSection(): string {
    const sections = ['#about', '#skills', '#portfolio'];
    let currentSection = '';
    
    sections.forEach(section => {
      const element = document.querySelector(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          currentSection = section;
        }
      }
    });
    
    return currentSection;
  }

  private updateNavigationItems(currentSection: string) {
    this.navigationItems.forEach(item => {
      item.active = item.href === currentSection;
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
