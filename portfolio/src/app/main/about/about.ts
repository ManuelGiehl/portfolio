import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule, TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  private translate = inject(TranslateService);
}
