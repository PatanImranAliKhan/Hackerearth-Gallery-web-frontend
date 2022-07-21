import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {

  public selectedImage: any;
  public imageData = {};
  public imagename = "";
  public imagedet = "";
  public previmagedet = "";
  public imageurl = "";
  public prevImageDetails="";
  public invalidmessage = "";
  public successmessage = "";
  public email="";
  public id="";

  constructor(private imageservice: ImageService,private router: Router,private actroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.email=JSON.stringify(localStorage.getItem("email") || "");
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
      this.previmagedet = resp["ImgDetails"];
      this.imageurl = "http://localhost:2500"+resp["ImgUrl"];
      this.imageData=resp;
    },(err) => {
      console.log("Error",err);
      
    })
  }

  AddImageThatSelected(event: any)
  {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedImage = file;
    }
  }

  sample()
  {
    console.log(this.selectedImage);
    console.log(this.imageData);
    
  }

  EditImageData()
  {
    if(this.imagedet=="")
    {
      this.imagedet=this.previmagedet;
    }
    if(this.selectedImage==null || this.selectedImage=="" || this.selectedImage==undefined)
    {
      return this.EditWithoutImageSelected();
    }
    return this.EditWithImage();    
  }

  EditWithoutImageSelected()
  {
    const obj = {
      "imageDetails": this.imagedet
    }

    this.imageservice.EditWithoutImageById(obj,this.id)
    .subscribe((resp: any) => {
      console.log("Edit without image ",resp);
      if(resp.Message=="success")
      {
        this.successmessage="Image Details was Edited Successfully";
        this.invalidmessage="";
        this.selectedImage=null;
      }
      else{
        this.successmessage="";
        this.invalidmessage=resp.Message;
      }
    }, (err) => {
      this.invalidmessage="There is some error please try after some time.";
      console.log("Error",err);
      this.successmessage="";
    })
  }

  EditWithImage()
  {
    const formdata=new FormData();
    formdata.append('file',this.selectedImage);
    formdata.append('imageDetails',this.imagedet);

    this.imageservice.EditImageDetailsById(formdata,this.id)
    .subscribe((resp: any) => {
      console.log("Edit with image ",resp);
      
      if(resp.Message=="success")
      {
        this.successmessage="Image Details was Edited Successfully";
        this.invalidmessage="";
        this.selectedImage=null;
      }
      else{
        this.successmessage="";
        this.invalidmessage=resp.Message;
      }
    }, (err) => {
      this.invalidmessage="There is some error please try after some time.";
      console.log("Error",err);
      this.successmessage="";
    })
  }

}
