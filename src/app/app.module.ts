import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetListComponent } from './features/pets/pet-list/pet-list.component';
import { PetDetailComponent } from './features/pets/pet-detail/pet-detail.component';
import { PetCardComponent } from './features/pets/pet-card/pet-card.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { MyReservationsComponent } from './pages/my-reservations/my-reservations.component';
import { ToastComponent } from './shared/toast/toast.component';
import { LucideAngularModule, Home, LogIn, LogOut, User, Star, PencilLine, PackageCheck, PawPrint } from 'lucide-angular';
import { ReviewsAllComponent } from './pages/reviews-all/reviews-all.component';
import { ChatComponent } from './shared/chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';


@NgModule({
  declarations: [
    AppComponent,    PetListComponent,
    PetCardComponent,
    PetDetailComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ReviewsComponent,
    MyReservationsComponent,
    ToastComponent,
    ReviewsAllComponent,
    ChatComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LucideAngularModule.pick({ Home, LogIn, LogOut, User, Star, PencilLine, PackageCheck, PawPrint}),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
