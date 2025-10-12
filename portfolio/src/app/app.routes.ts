import { Routes } from '@angular/router';
import { LegalNoticeComponent } from './main/legal-notice/legal-notice';
import { PrivacyPolicyComponent } from './main/privacy-policy/privacy-policy';
import { HomeComponent } from './main/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', redirectTo: '' }
];
