import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public products: Product[] = [];


  public productsFounds: Product[] = [];
  public filter = [
    "Abarrotes",
    "Frutas y Verduras",
    "Limpieza",
    "Farmacia",
  ];

  public colors = [
    {
      type: "Abarrotes",
      color: "primary"
    },
    {
      type: "Frutas y Verduras",
      color: "secondary"
    },
    {
      type: "Limpieza",
      color: "warning"
    },
    {
      type: "Farmacia",
      color: "danger"
    }
  ];

  constructor(
    private cartService: CartService,
     private router: Router, 
     private ProductService: 
     ProductService, 
     private alertController: AlertController,
     private userService: UserService
     ) 
    
    {
      this.productsFounds = this.ProductService.getProducts();
    }

  public getColor(type: string): string {
    const itemFound = this.colors.find((element) => {
      return element.type === type;
    });
    let color = itemFound && itemFound.color ? itemFound.color : "";
    return color;
  }

  public filterProducts(): void {
    console.log(this.filter);
    this.productsFounds = this.products.filter(
      item => {
        return this.filter.includes(item.type);
      }
    );
  }

  public addToCart(product: Product, i: number) {
    product.photo = product.photo + i;
    this.cartService.addToCart(product);
    console.log(this.cartService.getCart());
  }

  //Método para agregar productos 
  public openAddProductPage() {
    this.router.navigate(['/add-product']);
  }

  //ELIMINAR
  async alertaEliminar(pos:number) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: '¿Desea eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.ProductService.removeProduct(pos);
          }
        }
      ]
    });
    await alert.present();
  }

  public openUpdateProductPage(pos: number) {
    this.getpos(pos);
    this.router.navigate(['/update-product']);
  }

  public getpos(pos:number){
    this.ProductService.pos=pos;
  }
  

  public eliminarProduct(i: number) {
    this.ProductService.removeProduct(i);
    this.productsFounds = this.ProductService.getProducts();
  }

  public actualizarProduct(i: number, product: Product) {
    this.ProductService.updateProduct(i, product);
    this.productsFounds = this.ProductService.getProducts();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }


}
