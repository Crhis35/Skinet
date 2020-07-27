import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { delay, map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = '';

  constructor(private http: HttpClient) {}
  getProduts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId !== 0)
      params = params.append('brandId', shopParams.brandId.toString());
    if (shopParams.typeId !== 0)
      params = params.append('typeId', shopParams.typeId.toString());
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());

    if (shopParams.search) params = params.append('search', shopParams.search);
    return this.http
      .get<IPagination>('/api/products', {
        observe: 'response',
        params,
      })
      .pipe(
        delay(1000),
        map((res) => res.body)
      );
  }
  getBrands() {
    return this.http.get<IBrand[]>('/api/products/brands');
  }
  getTypes() {
    return this.http.get<IType[]>('/api/products/types');
  }
}
