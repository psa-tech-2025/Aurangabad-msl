import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutCitizonComponent } from './component/about-citizon/about-citizon.component';
import { OFFICERSComponent } from './component/officers/officers.component';
import { SCHEMESComponent } from './component/schemes/schemes.component';
import { ReportsComponent } from './component/reports/reports.component';
import { LoginComponent } from './component/login/login.component';
import { GalleryComponent } from './component/gallery/gallery.component';
import { AboutUsComponent } from './component/about-us/about-us.component';

const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'gallery', component: GalleryComponent
  },
  {
    path:'about-citizens', component:AboutCitizonComponent
  },
  {
    path:'officers', component:OFFICERSComponent
  },
  {
    path:'schemes', component:SCHEMESComponent
  },

  {
    path:'reports', component: ReportsComponent
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'about-us', component:AboutUsComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
