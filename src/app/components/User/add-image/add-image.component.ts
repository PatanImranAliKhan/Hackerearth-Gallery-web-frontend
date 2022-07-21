import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  public imageform = this.formbuilder.group({
    "imageName": ["", Validators.required],
    "imageDetails": ["",Validators.required]
  })

  public selectedImage: any;
  public invalidmessage = "";
  public successmessage = "";
  public email="";

  constructor(private formbuilder: FormBuilder, private imageservice: ImageService,private router: Router) { }

  ngOnInit(): void {
    this.email=JSON.stringify(localStorage.getItem("email") || "");
    if(this.email=='""')
    {
      this.router.navigate(['/home']);
    }
  }

  AddImageThatSelected(event: any)
  {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedImage = file;
    }
  }

  ValidateFields()
  {
    const imagename=this.imageform.get("imageName")?.value || "";
    const imagedet = this.imageform.get("imageDetails")?.value || "";

    if(imagename=="" || imagedet == "" ||this.selectedImage==null)
    {
      this.invalidmessage="All fields msut be filled";
      return false;
    }
    return true;

  }

  AddDetails()
  {
    // console.log(this.imageform.get("imageName")?.value);
    // console.log(this.imageform.get("imageDetails")?.value);

    if(!this.ValidateFields)
    {
      return;
    }
    const imagename=this.imageform.get("imageName")?.value || "";
    const imagedet = this.imageform.get("imageDetails")?.value || "";

    const formdata=new FormData();
    formdata.append('file',this.selectedImage);
    formdata.append('imageName',imagename);
    formdata.append('imageDetails',imagedet);
    formdata.append('email',"imran@gmail.com");

    this.imageservice.AddImageDetails(formdata)
    .subscribe((resp: any) => {
      if(resp.Message=="success")
      {
        this.successmessage="Image Details was Added Successfully";
        this.invalidmessage="";
        this.selectedImage=null;
        this.imageform.reset();
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
