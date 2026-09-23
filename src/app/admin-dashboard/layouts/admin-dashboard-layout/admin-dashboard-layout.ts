import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from "../../../../../node_modules/@angular/router/types/_router_module-chunk";
import { AuthService } from '../../../auth/services/auth-service';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, RouterLink,RouterLinkActive],
  templateUrl: './admin-dashboard-layout.html',
})
export class AdminDashboardLayout {

  authService = inject(AuthService)

  user = computed(()=> this.authService.user())
}
