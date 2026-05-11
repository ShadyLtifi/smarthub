import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingSectionComponent } from './printing-section.component';

describe('PrintingSectionComponent', () => {
  let component: PrintingSectionComponent;
  let fixture: ComponentFixture<PrintingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintingSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
