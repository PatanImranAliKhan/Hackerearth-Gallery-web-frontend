import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { ImagesListComponent } from './components/User/images-list/images-list.component';
import { AddImageComponent } from './components/User/add-image/add-image.component';
import { ShowImageComponent } from './components/User/show-image/show-image.component';
import { EditImageComponent } from './components/User/edit-image/edit-image.component';
import { GetuseruploadsComponent } from './components/User/getuseruploads/getuseruploads.component';
import { HeaderComponent } from './components/User/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ImagesListComponent,
    AddImageComponent,
    ShowImageComponent,
    EditImageComponent,
    GetuseruploadsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
