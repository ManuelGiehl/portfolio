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
    this.scrollToContact();
  }

  private scrollToContact(): void {
    const contactElement = document.querySelector('#contact') as HTMLElement;
    if (!contactElement) return;

    const targetPosition = contactElement.offsetTop - 100;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    
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
