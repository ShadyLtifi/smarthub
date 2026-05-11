import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-gaming-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gaming-section.component.html',
  styleUrl: './gaming-section.component.scss'
})

export class GamingSectionComponent {

  showGamingModal = false;
  showPastEventsModal = false;
  showAtmosphereModal = false;

  isLoadingEvents = true;

  events: any[] = [];

  upcomingEvents: any[] = [];

  pastEvents: any[] = [];

constructor(private eventService: EventService) {

  this.loadEvents();

}

async loadEvents() {

  this.isLoadingEvents = true;

  this.events = await this.eventService.getEvents();

  const today = new Date();

  this.upcomingEvents = this.events.filter(event => {

    return new Date(event.date) >= today;

  });

  this.pastEvents = this.events.filter(event => {

    return new Date(event.date) < today;

  });

  this.isLoadingEvents = false;

}

  openGamingModal() {

    this.showGamingModal = true;

    document.body.style.overflow = 'hidden';

  }

  closeGamingModal() {

    this.showGamingModal = false;

    document.body.style.overflow = 'auto';

  }

  openPastEventsModal() {

  this.showPastEventsModal = true;

  document.body.style.overflow = 'hidden';

}

closePastEventsModal() {

  this.showPastEventsModal = false;

  document.body.style.overflow = 'auto';

}

openAtmosphereModal() {

  this.showAtmosphereModal = true;

  document.body.style.overflow = 'hidden';

}

closeAtmosphereModal() {

  this.showAtmosphereModal = false;

  document.body.style.overflow = 'auto';

}
}