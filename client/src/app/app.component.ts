import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/product';
import { IPagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SkiNet';
  products: IProduct[];

  constructor(private htpp: HttpClient) {}

  ngOnInit(): void {
    this.htpp.get('https://localhost:5001/api/products?pageSize=50').subscribe(
      (res: IPagination) => {
        this.products = res.data;
      },
      (err) => console.log(err)
    );
  }
}
