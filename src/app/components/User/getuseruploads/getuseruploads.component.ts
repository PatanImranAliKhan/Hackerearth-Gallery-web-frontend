import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-getuseruploads',
  templateUrl: './getuseruploads.component.html',
  styleUrls: ['./getuseruploads.component.css']
})
export class GetuseruploadsComponent implements OnInit {

  public images: any=[];
  public email="";
  public search="";
  public page=1;
  public showpaginator=false;
  constructor(private router: Router, private imageservice: ImageService) { }

  ngOnInit(): void {
    this.email=JSON.stringify(localStorage.getItem("email") || "")
    
    if(this.email=='""')
    {
      console.log("mbjhv");
      
      this.router.navigate(['/home']);
    }

    this.getUserUploadedImages();
  }

  getUserUploadedImages()
  {
    this.imageservice.getImagesByEmail(this.email)
    .subscribe((resp: any) => {
      this.images=resp;
      this.showpaginator=true;
      this.ProcessImages();
    },(err) => {
      console.log("Error",err);
    })
  }

  ProcessImages()
  {
    let n=this.images.length;
    for(let i=0;i<n;i++)
    {
      this.images[i].ImgUrl = "http://localhost:2500"+this.images[i].ImgUrl;  
    }
    console.log(this.images);
    
  }

  ShowOneImage(image: any)
  {
    this.router.navigate([`show/${image._id}`])
  }

  EditImagePage(image: any)
  {
    this.router.navigate([`/${image._id}/edit`])
  }

  DeleteImage(image: any)
  {
    console.log(image._id);
    
    this.imageservice.DeleteImageById(image._id)
    .subscribe((resp) => {
      console.log(resp);
      this.getUserUploadedImages();
    },(err) => {
      console.log("Error ",err);
      
    })
  }

  SearchByData()
  {
    if(this.search=="")
    {
      this.getUserUploadedImages();
    }
    else
    {
      this.images=this.images.filter((x: any)=> {
        return x.ImgName.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
      })
    }
  }

}
