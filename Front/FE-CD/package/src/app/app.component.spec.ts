import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Para simular rutas
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard'; // Incluimos el guard si es relevante
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para simular solicitudes HTTP si es necesario
import { MatToolbarModule } from '@angular/material/toolbar'; // Si usas Material en app.component
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Para pruebas con Material

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Simula el enrutador para pruebas
        HttpClientTestingModule, // Simula solicitudes HTTP
        MatToolbarModule, // Si usas Angular Material
        NoopAnimationsModule // Evita errores de animaciones en pruebas
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AuthGuard // Proporciona el guard si es necesario
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FE-CD'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('FE-CD');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar span')?.textContent).toContain('FE-CD'); // Ajusta según tu template
  });
});