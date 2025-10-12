import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Header } from '../header/header';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, TranslateModule, Header],
  templateUrl: './legal-notice.html',
  styleUrls: ['./legal-notice.scss']
})
export class LegalNoticeComponent {

}
