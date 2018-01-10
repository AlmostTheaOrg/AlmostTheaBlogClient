import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

import { SharedModule } from "./shared/shared.module";
import { HomeModule } from "./home/home.module";
import { AboutModule } from "./about/about.module";
import { ContactsModule } from "./contacts/contacts.module";
import { PortraitsModule } from "./portraits/portraits.module";
import { ProjectsModule } from "./projects/projects.module";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { ImageRepository } from "./data/ImageRepository";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AboutModule,
    ContactsModule,
    PortraitsModule,
    ProjectsModule,
    SharedModule
  ],
  exports: [],
  providers: [ImageRepository],
  bootstrap: [AppComponent]
})
export class AppModule {}
