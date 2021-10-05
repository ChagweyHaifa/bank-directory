import { Component } from '@angular/core';


import { OAuthService,AuthConfig } from 'angular-oauth2-oidc';

export const authConfig:AuthConfig = {
  clientId: '0oa1k3ua8jffKc4s85d7',
  issuer: 'https://dev-66159503.okta.com/oauth2/default',
  redirectUri: window.location.origin,

}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'angular-bank-directory';
  userName!:string;



constructor(private oauthService: OAuthService){
  this.oauthService.configure(authConfig);
  this.oauthService.loadDiscoveryDocumentAndTryLogin();
}
login(){
  this.oauthService.initImplicitFlow();
}
logout(){
  this.oauthService.logOut();
}


result!: string;
get getUserName(){
  let claims:any = this.oauthService.getIdentityClaims() ;
  if (!claims){
    return null;
  }
 this.userName = claims['name']
  // console.log("username",this.userName)
  // return claims['name'];
  return claims['preferred_username'];
}


}
