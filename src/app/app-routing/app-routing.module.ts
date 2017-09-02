import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from '../post-module/post/post.component';

const routes: Routes = [
  { path: '', component: PostComponent },
  { path: 'about', component: PostComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
