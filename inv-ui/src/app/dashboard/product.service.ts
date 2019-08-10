import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  token: any;
  redirectUrl = `${environment.baseUrl}/product`;
  headerOption = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
  };
  constructor(private http: HttpClient) {}
  getProductList(): Observable<any> {
    return this.http.get<any>(this.redirectUrl);
    // return this.http.get<any>(`${environment.baseUrl}/product_management_list?hbt_code=hbt-136`);
  }
  getProductDetail(id: string): Observable<any> {
    return this.http.get<any>(`${this.redirectUrl}/detail/${id}`);
  }
  update(data, id): Observable<any> {
    console.log('formdata' + data);
    return this.http.post<any>(
      `${this.redirectUrl}/update/${id}`,
      data,
      this.headerOption
    );

    // return this.http.post<any>(`${this.redirectUrl}/product_management_update`, data);
  }
  add(data) {
    return this.http.post<any>(
      `${this.redirectUrl}/add`,
      data,
      this.headerOption
    );
    // return this.http.post<any>(`${this.redirectUrl}/product_management_add`, data);
  }
  delete(data) {
    return this.http.delete<any>(
      `${this.redirectUrl}/delete/${data}`,
      this.headerOption
    );
    // return this.http.post<any>(`${this.redirectUrl}/product_management_delete`, data);
  }
}
