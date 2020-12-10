import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class AppService {

    constructor(
        private http: HttpClient
    ) {}
    
    async uploadImage(formData: FormData): Promise<any> {
        return await this.http.post('http://localhost:3000/upload', formData).toPromise();
    }

    async getImage(key: string): Promise<any> {
        const headers = (new HttpHeaders()).set('Accept', 'image/*');
        return await this.http.get(`http://localhost:3000/blob/${key}`, { headers, responseType: 'blob' }).toPromise();
    }
}