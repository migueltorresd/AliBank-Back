import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaucherComponent } from './vaucher.component';

describe('VaucherComponent', () => {
  let component: VaucherComponent;
  let fixture: ComponentFixture<VaucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
