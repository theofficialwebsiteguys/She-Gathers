import { ExtraOptions, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventPlanComponent } from './components/event-plan/event-plan.component';
import { PaintNightComponent } from './components/paint-night/paint-night.component';
import { CandleMakingComponent } from './components/candle-making/candle-making.component';
import { FlowerMakingComponent } from './components/flower-making/flower-making.component';
import { WorkshopComponent } from './components/workshop/workshop.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperiencesPageComponent } from './components/experiences-page/experiences-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'plan', component: EventPlanComponent },
    { path: 'experiences', component: ExperiencesPageComponent },
    { path: 'about', component: AboutPageComponent }
];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollOffset: [0, 80] // optional: adjust for sticky header
};