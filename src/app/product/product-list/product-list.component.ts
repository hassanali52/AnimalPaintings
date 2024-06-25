import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { product } from 'app/Models/product.model';
import { CartService } from 'app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  
  products : product[] = []
  filteredProducts : product[] = []
  sortOrder: string = ""
  
  constructor(private service: ProductService,
    private cartService : CartService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.service.getProducts().subscribe(data => {
      this.products =data;
      this.filteredProducts =data;
    });
  }

  addToCart(product: product) : void
  {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackbar.open('Products added to cart!','',{
          duration:2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    });
  }

  applyfilter(event : Event): void
  {
    let searchParam = (event.target as HTMLInputElement).value;
    searchParam = searchParam.toLowerCase();

    this.filteredProducts = this.products.filter(
      product => product.name.toLowerCase().includes(searchParam)
    )

    this.sortProducts(this.sortOrder);
  }

  
  sortProducts(sortValue: string)
  {
    this.sortOrder = sortValue;

    if(this.sortOrder === "priceHighLow")
    {
      this.filteredProducts.sort((a,b)=> b.price - a.price)
    }
    else if (this.sortOrder === "priceLowhigh")
    {
        this.filteredProducts.sort((a,b)=> a.price - b.price)
    }
  }

}
