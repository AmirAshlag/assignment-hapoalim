import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { SavedPageComponent } from './saved-page/saved-page.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { CreateNewCharacterComponent } from './create-new-character/create-new-character.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'liked',
    component: SavedPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'characters',
    component: CharactersListComponent,
    children: [
      {
        path: 'edit/:id',
        component: EditFormComponent,
      },
      {
        path: '',
        component: SearchComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'create',
    component: CreateNewCharacterComponent,
  },
  {
    path: '**',
    redirectTo: 'characters',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
