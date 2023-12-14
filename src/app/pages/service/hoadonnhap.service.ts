import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class HoaDonNhapService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'HoaDonNhap/GetAll_HoaDonNhap')
  }
  create(HoaDonNhap: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'HoaDonNhap/Create_HoaDonNhap', HoaDonNhap)
  }
  // update(HoaDonNhap: any) {
  //   return this.http.put<any>(baseUrl + 'HoaDonNhap/Update_HoaDonNhap', HoaDonNhap)
  // }

  // toggleTrangThai(id: any) {
  //   return this.http.put<any>(baseUrl + `HoaDonNhap/Update_HoaDonNhap_TrangThaiHoatDong/${id}`, null)
  // }
  // delete(id: number): Observable<any> {
  //   return this.http.delete<any>(baseUrl + 'HoaDonNhap/Delete_HoaDonNhap/' + id)
  // }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'HoaDonNhap/GetById_HoaDonNhap/' + id)
  }
  // deleteMany(listId: number[]): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //     body: listId
  //   };
  //   return this.http.delete<any>(baseUrl + 'HoaDonNhap/DeleteMany_HoaDonNhap', httpOptions);
  // }
  search(): Observable<any[]> {
    // const params = `Keywork=${Keywork}`;
    return this.http.get<any[]>(baseUrl + 'HoaDonNhap/Search_HoaDonNhap');
  }
}
