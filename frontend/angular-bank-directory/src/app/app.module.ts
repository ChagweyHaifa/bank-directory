import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import{OAuthModule} from 'angular-oauth2-oidc'
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AgencyService } from './services/agency.service';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';




// const routes: Routes = [


//   // {path: ':stateId', component: AgencyListComponent},
//   // {path: '', component: AgencyListComponent},

//   {path: '**', redirectTo: '/', pathMatch: 'full'}
// ];


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
  
  ],
  imports: [
    // RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AgencyService, 
    // { provide: OKTA_CONFIG, useValue: config }
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
