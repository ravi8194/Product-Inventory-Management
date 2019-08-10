import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() public ProductList;
  @Output() public product = new EventEmitter();
  data = [];
  status;
  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}
  headElements = ['Name', 'Price'];
  ngOnInit() {
  }
  selectedProduct(data) {
    this.product.emit(data);
  }
}
