import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css']
})
export class ImagesListComponent implements OnInit {

  public images: any=[];
  public email="";
  public search = "";
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

    this.getAllImages();
  }

  getAllImages()
  {
    this.imageservice.getAllImages()
    .subscribe((resp: any) => {
      this.images=resp;
      this.ProcessImages();
      this.showpaginator=true;
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

  SearchByData()
  {
    if(this.search=="")
    {
      this.getAllImages();
    }
    else
    {
      this.images=this.images.filter((x: any)=> {
        return x.ImgName.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
      })
    }
  }

}
