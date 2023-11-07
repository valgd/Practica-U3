import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {


  constructor(
    private userService: UserService, 
    private router: Router,
    private toastController: ToastController,
  ) { }

  name: string = '';
  password: string = '';

  async login() {
    const isValid = this.userService.authenticate(this.name, this.password);

    if (isValid) {
      this.router.navigate(['/tabs/tab1']);
      this.name = "";
      this.password="";
    } else {
      const toast = await this.toastController.create({
        message: 'Datos incorrectos',
        duration: 2000,
        position: 'bottom'

      });
      this.name = "";
      this.password="";
      toast.present();
    }
  }

  logout() {
    // Restablece las variables de usuario y contraseña
    this.name = '';
    this.password = '';

    // Realiza la lógica de cierre de sesión en el servicio de autenticación
    this.userService.logout();

    // Redirige al usuario a la página de inicio de sesión ('login')
    this.router.navigate(['/login']); // Ajusta la ruta según tu configuración
  }

}
