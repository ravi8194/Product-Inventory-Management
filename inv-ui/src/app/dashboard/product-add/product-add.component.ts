import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit, OnChanges  {
  @Input() public product;
  @Output() public productList = new EventEmitter();
  public productid = null;
  message: string;
  productForm: FormGroup;
  id: string;
  isSubmitted: boolean;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private coreService: CoreService
  ) {}

  ngOnInit() {
    this.isSubmitted = false;
    this.productForm = this.fb.group({
      product_name: ['', [Validators.required, Validators.maxLength(250)]],
      price: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }
  setValue() {}
  ngOnChanges() {
    // When form will render it will be blank
    if (this.product !== '') {
      this.productForm.patchValue({
        product_name: this.product.product_name,
        price: this.product.price,
        rating: this.product.rating
      });
      this.productid = this.product.id;
    }
  }
  add() {
    this.isSubmitted = true;
    this.setValue();
    this.productService.add(this.productForm.value).subscribe(res => {
      if (res.success) {
        this.coreService.showSuccess(res.message);
        this.reset();
        this.productList.emit(res);
        this.isSubmitted = false;
      } else {
        this.coreService.showError(res.message);
      }
    });
  }

  update() {
    this.setValue();
    this.productService
      .update(this.productForm.value, this.productid)
      .subscribe(res => {
        console.log(res);
        if (res.success) {
          this.coreService.showSuccess(res.message);
          this.reset();
          this.productList.emit(res);
        } else {
          this.coreService.showError(res.message);
        }
      });
  }
  delete(e) {
    if (this.productForm.valid) {
      this.productService.delete(this.productid).subscribe(res => {
        if (res.success) {
          this.coreService.showSuccess(res.message);
          this.reset();
          this.productList.emit(res);
        }
      });
    } else {
      if (!this.productid) {
        this.coreService.showWarning('Please select the product');
      } else {
        this.coreService.showWarning('Please Enter all the field');
      }
    }
  }
  reset() {
    this.productForm.reset();
    this.product = null;
    this.productid = null;
  }
  get formControls() {
    return this.productForm.controls;
  }
}
