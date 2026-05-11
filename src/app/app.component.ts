import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { PrintingSectionComponent } from './components/printing-section/printing-section.component';
import { GamingSectionComponent } from './components/gaming-section/gaming-section.component';
import { ServiceSectionComponent } from './components/service-section/service-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavbarComponent,
    HeroComponent,
    PrintingSectionComponent,
    GamingSectionComponent,
    ServiceSectionComponent,
    ContactSectionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SmartHub';
}
