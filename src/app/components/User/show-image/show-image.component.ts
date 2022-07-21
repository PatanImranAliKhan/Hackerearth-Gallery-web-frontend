import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {

  public email="";
  public id="";

  public imageData= {};
  public imagename = "";
  public imageemail = "";
  public imagedet = "";
  public imageurl = "";

  constructor(private router: Router,private actroute: ActivatedRoute, private imageservice: ImageService) { }

  ngOnInit(): void {
    this.email=JSON.stringify(localStorage.getItem("email") || "")
    if(this.email=='""')
    {
      this.router.navigate(['/home']);
    }

    this.actroute.paramMap.subscribe((params : ParamMap) => {
      this.id = params.get('id') || "";
      console.log(this.id);
    });

    this.getDetails();

  }

  getDetails()
  {
    this.imageservice.getOneImage(this.id)
    .subscribe((resp: any) => {
      console.log(resp);
      this.imagename = resp["ImgName"];
      this.imagedet = resp["ImgDetails"];
      this.imageemail = resp["userEmail"];
      this.imageurl = "http://localhost:2500"+resp["ImgUrl"];
      this.imageData=resp;
    },(err) => {
      console.log("Error",err);
      
    })
  }

}
