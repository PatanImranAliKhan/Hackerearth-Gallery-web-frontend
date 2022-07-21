import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ImagesListComponent } from './components/User/images-list/images-list.component';
import { AddImageComponent } from './components/User/add-image/add-image.component';
import { EditImageComponent } from './components/User/edit-image/edit-image.component';
import { ShowImageComponent } from './components/User/show-image/show-image.component';
import { GetuseruploadsComponent } from './components/User/getuseruploads/getuseruploads.component';

const routes: Routes = [
  {path: 'home', component: IndexComponent,pathMatch: 'full'},
  {path: '',component: ImagesListComponent,pathMatch: 'full'},
  {path: 'show/:id', component: ShowImageComponent, pathMatch: 'full'},
  {path: 'new', component: AddImageComponent, pathMatch: 'full'},
  {path: ':id/edit', component: EditImageComponent,pathMatch: 'full'},
  {path: 'my_uploads', component: GetuseruploadsComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
