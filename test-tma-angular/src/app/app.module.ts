import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./tools/http-wrapper";
import { SocketIoModule } from "ngx-socket-io";
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/loginPage/loginPage.component';
import { IsLogin } from './guard/is-login';
import { IsLogout } from './guard/is-logout';

import { AppPageComponent } from './pages/appPage/appPage.component';
import { ChatComponent } from './components/chat/chat.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { UserListComponent } from './components/userList/userList.component';
import { NewCompteComponent } from './pages/new-compte/new-compte.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'app',
    component: AppPageComponent, 
    canActivate: [IsLogin],
    children: [
      { path: '', redirectTo: '/app/chat', pathMatch: 'full' },
      { path: 'chat', component: ChatComponent },
    ]
  },
  { path: 'login', component: LoginPageComponent, canActivate: [IsLogout] },
  { path: 'insciption', component: NewCompteComponent, canActivate: [IsLogout] }

];

@NgModule({
  declarations: [	
    AppComponent,
    ChatComponent,
    LoginPageComponent,
    AppPageComponent,
    DiscussionComponent,
    UserListComponent,
      NewCompteComponent
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(environment.socket)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
