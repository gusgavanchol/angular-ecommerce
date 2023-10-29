import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  currentProductId!: number;
  product!: Product;
  
  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    const theProductId = this.route.snapshot.paramMap.get('id');
    this.currentProductId = theProductId ? +theProductId : 1;

    this.productService.getProduct(this.currentProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

}
