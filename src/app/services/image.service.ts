import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private uri: String = "http://localhost:2500";

  constructor(private http: HttpClient) { }

  AddImageDetails(imageobject: Object) {
   
    return this.http.post(`${this.uri}/`, imageobject);
  }

  getOneImage(id: any)
  {
    return this.http.get(`${this.uri}/show/${id}`)
  }

  getImagesByEmail(useremail: String) {
    return this.http.get(`${this.uri}/getuser/${useremail}`)
  }

  getAllImages() {
    return this.http.get(`${this.uri}/getall`);
  }

  EditImageDetailsById(imageobject: Object, id: String) {
    return this.http.put(`${this.uri}/${id}/edit`, imageobject);
  }

  EditWithoutImageById(imageobject: Object, id: String) {
    console.log(imageobject);
    
    return this.http.put(`${this.uri}/${id}/editdetails`, imageobject);
  }

  DeleteImageById(id: String)
  {
    return this.http.delete(`${this.uri}/delete/${id}`);
  }


}
