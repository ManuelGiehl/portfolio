import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface FeedbackItem {
  quote: string;
  author: string;
  title: string;
  profileImage: string;
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.scss']
})
export class Feedback {
  private translate = inject(TranslateService);
  currentIndex = signal(0);
  
  feedbacks: FeedbackItem[] = [
    {
      quote: "Manuel really kept the team together with his great organization and clear communication. We wouldn't have got this far without his commitment.",
      author: "V. Schuster",
      title: "Team Partner",
      profileImage: "/img/aboutme/aboutmepic.png"
    },
    {
      quote: "Manuel's technical skills and problem-solving approach are outstanding. He always finds creative solutions and delivers high-quality work.",
      author: "A. Müller",
      title: "Project Manager",
      profileImage: "/img/aboutme/aboutmepic.png"
    },
    {
      quote: "Working with Manuel was a pleasure. His attention to detail and dedication to excellence made our project a huge success.",
      author: "S. Weber",
      title: "Lead Developer",
      profileImage: "/img/aboutme/aboutmepic.png"
    }
  ];
  
  get currentFeedback(): FeedbackItem {
    const feedbacks = this.translate.instant('feedback.quotes');
    const current = feedbacks[this.currentIndex()];
    return {
      quote: current.quote,
      author: current.author,
      title: current.title,
      profileImage: this.feedbacks[this.currentIndex()].profileImage
    };
  }
  
  nextFeedback(): void {
    const nextIndex = (this.currentIndex() + 1) % this.feedbacks.length;
    this.currentIndex.set(nextIndex);
  }
  
  previousFeedback(): void {
    const prevIndex = this.currentIndex() === 0 
      ? this.feedbacks.length - 1 
      : this.currentIndex() - 1;
    this.currentIndex.set(prevIndex);
  }
  
  goToFeedback(index: number): void {
    this.currentIndex.set(index);
  }
}
