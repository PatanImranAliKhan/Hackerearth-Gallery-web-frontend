import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public detailsform = this.formbuilder.group({
    'email' : ['',Validators.required]
  });

  public invalidemail=false;
  public invalidemailtext="";

  constructor(private formbuilder: FormBuilder, private authservice: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  ValidateEmail()
  {
    const getemail=this.detailsform.get("email")?.value || "";
    var re = /\S+@\S+\.\S+/;
    if (!re.test(getemail)) {
      this.invalidemail = true;
      if(getemail=="")
      {
        this.invalidemailtext="email was required";
      }
      else{
        this.invalidemailtext="invalid email";
      }
      return true;
    }
    else {
      this.invalidemail = false;
    }
    console.log(this.invalidemail);
    return false;
  }

  Submit()
  {
    if(!this.ValidateEmail)
    {
      return;
    }
    const getemail=this.detailsform.get("email")?.value || "";
    console.log(getemail)

    this.authservice.ValidateUser(getemail)
    .subscribe((resp) => {
      console.log(resp);
      localStorage.setItem("email",getemail);
      this.router.navigate(['/']);
    }, (err) => {
      console.log("Error",err);
    })
  }

}
