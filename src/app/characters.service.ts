import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  characters: any;
  charactersCopy: any;
  nextCharactersUrl: string = '';
  isLoading = false;
  deletedIndexs: number[] = [];
  savedCharacters: any = [];
  unSavedIndexs: any = [];
  unSaved1 = -1;
  editId = -1;
  savedUpdate$ = new Subject();
  newCharacters: any = [];
  search$ = new Subject();

  constructor(public http: HttpClient, public router: Router) {
    if (!localStorage.getItem('list')) {
      localStorage.setItem('list', JSON.stringify([]));
    }
  }

  getCharactersInitial(savedList: any) {
    this.http
      .get('https://rickandmortyapi.com/api/character')
      .subscribe((value: any) => {
        const updatedCharacters = value.results.map((character: any) => {
          const savedCharacter = savedList.find(
            (savedCharacter: any) => savedCharacter.id === character.id
          );
          return savedCharacter ? savedCharacter : character;
        });
        // let created = [];
        // for (let character of savedList) {
        //   if (!character.episode) {
        //     created.push(character);
        //   }
        // }
        this.characters = [
          // ...created,
          ...this.newCharacters,
          ...updatedCharacters,
        ];
        this.charactersCopy = this.characters;
        this.nextCharactersUrl = value.info.next;
      });
  }

  getCharactersScroll(savedList: any) {
    if (this.characters.length === this.charactersCopy.length) {
      this.isLoading = true;
      this.http.get(this.nextCharactersUrl).subscribe({
        next: (value: any) => {
          const updatedCharacters = value.results.map((character: any) => {
            const savedCharacter = savedList.find(
              (savedCharacter: any) => savedCharacter.id === character.id
            );
            return savedCharacter ? savedCharacter : character;
          });
          this.nextCharactersUrl = value.info.next;
          this.characters = [...this.characters, ...updatedCharacters];
          this.charactersCopy = this.characters;
          console.log(this.characters);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  deleteCharacter(i: number) {
    const savedIndexCheck = this.savedCharacters.findIndex(
      (savedCharacter: any) => savedCharacter.id === this.characters[i].id
    );
    console.log(savedIndexCheck);
    if (savedIndexCheck) {
      this.unSaveCharacter(savedIndexCheck);
    }

    if (this.characters[i].id === this.editId) {
      this.router.navigate(['/characters']);
    }

    this.deletedIndexs.push(i);
    setTimeout(() => {
      const deletedIndex = this.deletedIndexs.indexOf(i);
      this.deletedIndexs.splice(deletedIndex, 1);
      this.characters.splice(i, 1);
    }, 500);
  }

  saveCharacter(Character: any) {
    const list = JSON.parse(localStorage.getItem('list') || '[]');
    list.push(Character);
    localStorage.setItem('list', JSON.stringify(list));
    this.savedUpdate$.next(list);
  }

  unSaveCharacter(i: number) {
    if (i == 0) {
      this.unSaved1 = i;
    } else {
      this.unSavedIndexs.push(i);
    }
    setTimeout(() => {
      const list = JSON.parse(localStorage.getItem('list') || '[]');
      list.splice(i, 1);
      this.unSaved1 = -1;
      this.unSavedIndexs = this.unSavedIndexs.slice(i, 1);
      localStorage.setItem('list', JSON.stringify(list));
      this.savedUpdate$.next(list);
    }, 500);
  }

  addNewCharacter(character: any) {
    this.newCharacters.unshift(character);
    this.router.navigate(['/characters']);
  }
}
