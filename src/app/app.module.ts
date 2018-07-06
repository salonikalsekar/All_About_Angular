import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateFormComponent } from './create-form/create-form.component';
import { VerificationComponent } from './verification/verification.component';
const appRoutes: Routes = [
  {
    path: 'book',
    component: BookComponent,
    data: { title: 'Book List' }
  },
  {
    path: 'books',
    component: BookComponent,
    data: { title: 'Book List' }
  },
  {
    path: 'create-form',
    component: CreateFormComponent,
    data: { title: 'Create Book' }
  },
  { path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
  { path: 'add',
    redirectTo: '/books',
    pathMatch: 'full'
  },
  {
    path: 'verify',
    component: VerificationComponent,
},
];
@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    CreateFormComponent,
    VerificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
