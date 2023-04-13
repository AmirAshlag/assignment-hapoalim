import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../characters.service';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchString = '';
  searchParam = 'name';
  search = new Subject();
  searchSubscription: Subscription | undefined;

  constructor(public charactersService: CharactersService) {}

  ngOnInit(): void {
    this.searchSubscription = this.charactersService.search$
      .pipe(debounceTime(500))
      .subscribe((value) => {
        console.log(value);
      });
  }

  sendSearch() {
    console.log('hey');
    this.charactersService.search$.next({
      searchParam: this.searchParam,
      searchString: this.searchString,
    });
  }

  clear(){
    this.searchString = ''
    this.charactersService.characters = this.charactersService.charactersCopy
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
