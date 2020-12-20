import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  uploadFile(fd: FormData){
    return this.httpClient.post("http://localhost:8080/restex/prescrizione",fd);
  }
}
