import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  private translate = inject(TranslateService);
  private router = inject(Router);

  scrollToHero(): void {
    this.scrollToTop();
  }

  navigateToLegalNotice(): void {
    this.router.navigate(['/legal-notice']).then(() => {
      setTimeout(() => {
        this.scrollToTop();
      }, 100);
    });
  }

  navigateToPrivacyPolicy(): void {
    this.router.navigate(['/privacy-policy']).then(() => {
      setTimeout(() => {
        this.scrollToTop();
      }, 100);
    });
  }

  private scrollToTop(): void {
    const startPosition = window.pageYOffset;
    const distance = -startPosition;
    
    this.animateScroll(startPosition, distance);
  }

  private animateScroll(startPosition: number, distance: number): void {
    const duration = 800;
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
      }
    };

    requestAnimationFrame(animate);
  }

  private easeInOutQuart(t: number): number {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  }

  private scrollToPosition(position: number): void {
    window.scrollTo(0, position);
    document.documentElement.scrollTop = position;
    document.body.scrollTop = position;
  }
}