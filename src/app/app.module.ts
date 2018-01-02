import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SharedModule } from './shared-module/shared.module';
import { HomeModule } from './home-module/home.module';
import { AboutModule } from './about-module/about.module';
import { ContactsModule } from './contacts-module/contacts.module';
import { PortraitsModule } from './portraits-module/portraits.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AboutModule,
    ContactsModule,
    PortraitsModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
