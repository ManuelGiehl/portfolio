import { Component, signal, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  private router = inject(Router);
  
  protected readonly navigationItems: NavigationItem[] = [
    { id: 1, label: 'About me', href: '#about', active: false },
    { id: 2, label: 'Skills', href: '#skills', active: false },
    { id: 3, label: 'Portfolio', href: '#portfolio', active: false },
    { id: 4, label: 'Contact', href: '#contact', active: false }
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
    this.makeHeaderSticky();
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
      this.navigationItems[3].label = 'Kontakt';
    } else {
      this.navigationItems[0].label = 'About me';
      this.navigationItems[1].label = 'Skills';
      this.navigationItems[2].label = 'Portfolio';
      this.navigationItems[3].label = 'Contact';
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.updateActiveSection();
  }

  scrollToSection(event: Event, href: string) {
    event.preventDefault();
    
    // Check if we're on the homepage
    if (this.router.url === '/' || this.router.url === '') {
      this.setActiveTab(href);
      this.startSmoothScroll(href, false); // false = from homepage
    } else {
      // Navigate to homepage with hash
      this.router.navigate(['/'], { fragment: href.substring(1) }).then(() => {
        // After navigation, scroll to the section
        setTimeout(() => {
          this.setActiveTab(href);
          this.startSmoothScroll(href, true); // true = from other page
        }, 200);
      });
    }
  }

  scrollToHero(): void {
    // Check if we're on the homepage
    if (this.router.url === '/' || this.router.url === '') {
      this.scrollToTop();
    } else {
      // Navigate to homepage
      this.router.navigate(['/']).then(() => {
        // After navigation, scroll to top
        setTimeout(() => {
          this.scrollToTop();
        }, 100);
      });
    }
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

  private startSmoothScroll(href: string, fromOtherPage: boolean = false) {
    const element = document.querySelector(href) as HTMLElement;
    if (!element) return;

    const targetPosition = this.calculateTargetPosition(element, href, fromOtherPage);
    const startPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const distance = targetPosition - startPosition;
    
    this.animateScroll(startPosition, distance);
  }

  private calculateTargetPosition(element: HTMLElement, href: string, fromOtherPage: boolean = false): number {
    let targetPosition = element.offsetTop;
    
    // Get header height for proper offset calculation
    const header = document.querySelector('.header') as HTMLElement;
    const headerHeight = header ? header.offsetHeight : 0;
    
    if (href === '#about') {
      if (fromOtherPage) {
        targetPosition = targetPosition - headerHeight + 120;
      } else {
        targetPosition = targetPosition - headerHeight - 0;
      }
    }
    
    if (href === '#skills') {
      if (fromOtherPage) {
        targetPosition = targetPosition - headerHeight - 20;
      } else {
        targetPosition = targetPosition - headerHeight - 50;
      }
    }
    
    if (href === '#portfolio') {
      if (fromOtherPage) {
        targetPosition = targetPosition - headerHeight - 100;
      } else {
        targetPosition = targetPosition - headerHeight - 150;
      }
    }
    
    if (href === '#contact') {
      if (fromOtherPage) {
        targetPosition = targetPosition - headerHeight - 80;
      } else {
        targetPosition = targetPosition - headerHeight - 100;
      }
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

  private makeHeaderSticky(): void {
    const header = document.querySelector('.header') as HTMLElement;
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
          header.style.position = 'fixed';
          header.style.top = '0';
          header.style.left = '0';
          header.style.right = '0';
          header.style.zIndex = '10000';
        } else {
          header.style.position = 'sticky';
          header.style.top = '0';
          header.style.left = '';
          header.style.right = '';
        }
      });
    }
  }
}
