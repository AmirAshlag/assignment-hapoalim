import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NavbarComponent } from './navbar/navbar.component';
import { SavedPageComponent } from './saved-page/saved-page.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateNewCharacterComponent } from './create-new-character/create-new-character.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CharactersListComponent,
    NavbarComponent,
    SavedPageComponent,
    EditFormComponent,
    CreateNewCharacterComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
