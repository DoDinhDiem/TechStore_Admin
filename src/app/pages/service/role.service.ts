import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'Role/GetAll_Role')
    }
    create(Role: any): Observable<any> {
        return this.http.post<any>(baseUrl + 'Role/Create_Role', Role)
    }
    update(Role: any) {
        return this.http.put<any>(baseUrl + 'Role/Update_Role', Role)
    }

    toggleTrangThai(id: any) {
        return this.http.put<any>(baseUrl + `Role/Update_Role_TrangThai/${id}`, null)
    }
    delete(id: number): Observable<any> {
        return this.http.delete<any>(baseUrl + 'Role/Delete_Role/' + id)
    }
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'Role/GetById_Role/' + id)
    }
    deleteMany(listId: number[]): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: listId
        };
        return this.http.delete<any>(baseUrl + 'Role/DeleteMany_Role', httpOptions);
    }

    search(Keywork: string): Observable<any[]> {
        const params = `Keywork=${Keywork}`;
        return this.http.get<any[]>(baseUrl + `Role/Search_Role?${params}`);
    }
}
