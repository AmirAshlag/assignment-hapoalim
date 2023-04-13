import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharactersService } from '../characters.service';
import { Router } from '@angular/router';
import { Subscription, Subject, debounceTime } from 'rxjs';


@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit, OnDestroy {
  savedCharacters: any = [];
  SavedSubscription: Subscription | undefined;
  searchSubscription: Subscription | undefined;
  checkIfSaved$ = new Subject();

  constructor(
    public charactersService: CharactersService,
    public router: Router
  ) {}

  onscroll() {
    this.charactersService.getCharactersScroll(this.savedCharacters);
  }
  async ngOnInit(): Promise<void> {
    this.savedCharacters = JSON.parse(localStorage.getItem('list') || '[]');
    this.charactersService.getCharactersInitial(this.savedCharacters);
    // console.log(this.savedCharacters);

    this.SavedSubscription = this.charactersService.savedUpdate.subscribe(
      (value) => {
        this.savedCharacters = value;
      }
    );
    this.searchSubscription = this.charactersService.search.subscribe(
      (value: any) => {
        this.FilterList(value.searchParam, value.searchString);
      }
    );
  }

  checkIfSaved(character: any): any {
    let list = this.savedCharacters.filter((c: any) => {
      return c.id === character.id;
    });
    console.log('reminder to fix this');

    if (list.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  editMode(i: number) {
    this.charactersService.editId = this.charactersService.characters[i].id;
    this.router.navigate(['characters', 'edit', i]);
  }

  async UpdateList() {
    const updatedCharacters = this.charactersService.characters?.map(
      (character: any) => {
        const savedCharacter = this.savedCharacters.find(
          (savedCharacter: any) => savedCharacter.id === character.id
        );
        return savedCharacter ? { ...character, ...savedCharacter } : character;
      }
    );
    console.log(updatedCharacters);

    this.charactersService.characters = updatedCharacters;
  }

  FilterList(searchParam: string, searchString: string) {
    const filterdList = this.charactersService.charactersCopy.filter(
      (character: any) => {
        if (searchParam === 'location.name') {
          return character.location.name
            ?.toLowerCase()
            .includes(searchString.toLowerCase());
        } else {
          return character[searchParam]
            ?.toLowerCase()
            .includes(searchString.toLowerCase());
        }
        // return character[searchParam]?.includes(searchString);
      }
    );
    console.log(filterdList);
    this.charactersService.characters = filterdList;
    if (searchString.length === 0) {
      this.charactersService.characters = this.charactersService.charactersCopy;
    }
  }

  ngOnDestroy(): void {
    this.SavedSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe()
  }
}
