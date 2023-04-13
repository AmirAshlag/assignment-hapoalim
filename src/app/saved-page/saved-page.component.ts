import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../characters.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-saved-page',
  templateUrl: './saved-page.component.html',
  styleUrls: ['./saved-page.component.scss'],
})
export class SavedPageComponent implements OnInit, OnDestroy {

  SavedSubscription: Subscription | undefined;

  constructor(public charactersService: CharactersService) {}

  ngOnInit(): void {
    this.charactersService.savedCharacters = JSON.parse(
      localStorage.getItem('list') || '[]'
    );
    console.log(this.charactersService.savedCharacters);

    this.SavedSubscription = this.charactersService.savedUpdate$.subscribe(
      (value) => {
        this.charactersService.savedCharacters = value;
      }
    );
  }

  ngOnDestroy(): void {
    this.SavedSubscription?.unsubscribe();
  }
}

