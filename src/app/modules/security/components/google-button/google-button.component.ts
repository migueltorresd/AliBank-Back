import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

/**
 * Componente que representa un botón de inicio de sesión con Google.
 * Este componente permite al usuario iniciar sesión utilizando su cuenta de Google.
 */
@Component({
  selector: 'google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.scss'],
})
export class GoogleButtonComponent {
  constructor(
    private authService: AuthService,
    private readonly router: Router
  ) {}

  /**
   * Mensaje opcional que puede ser mostrado en el botón.
   * Este mensaje puede ser personalizado por el componente padre.
   */
  @Input() mensaje!: string;
}
