import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountComponent } from './account.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AccountComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AccountComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'C1-2023-Angular-frontend-Colombia'`, () => {
    const fixture = TestBed.createComponent(AccountComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('C1-2023-Angular-frontend-Colombia');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AccountComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('C1-2023-Angular-frontend-Colombia app is running!');
  });
});
