import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetuseruploadsComponent } from './getuseruploads.component';

describe('GetuseruploadsComponent', () => {
  let component: GetuseruploadsComponent;
  let fixture: ComponentFixture<GetuseruploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetuseruploadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetuseruploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
