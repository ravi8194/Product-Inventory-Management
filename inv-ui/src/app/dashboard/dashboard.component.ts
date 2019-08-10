import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productList: [];
  productCount: number;
  selectedItem: any;
  constructor(private authService: AuthService, private productService: ProductService) {}

  ngOnInit() {
    this.selectedItem = '';
    this.getProductList();
  }
  updateProductList(e) {
    this.getProductList();
  }
  getProductList() {
    this.productService.getProductList().subscribe(res => {
      this.productList = res.product;
      this.productCount = res.product.length;
    });
  }
  selectedProduct(e) {
    this.selectedItem = e;
  }
  logout() {
    this.authService.logout();
  }
}
