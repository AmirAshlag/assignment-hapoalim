import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit {
  myForm = new FormGroup({
    name: new FormControl(null),
    gender: new FormControl(null),
    image: new FormControl(null),
    status: new FormControl(null),
    type: new FormControl(null),
    species: new FormControl(null),
    id: new FormControl(null),
  });

  constructor(
    public activatedRoute: ActivatedRoute,
    public charactersService: CharactersService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const character = this.charactersService.characters?.[+params['id']];
      // console.log(character.image);

      this.myForm.setValue({
        name: character.name || '',
        gender: character.gender || 'Male',
        image: character.image || '',
        status: character.status || 'Alive',
        type: character.type || '',
        species: character.species || '',
        id: character.id,
      });
    });
  }

  submit() {
    this.charactersService.characters = this.charactersService.characters.map(
      (character: any) => {
        if (character.id == this.myForm.get('id')?.value) {
          return { ...character, ...this.myForm.value };
        } else {
          return character;
        }
      }
    );
    const holder =
      this.charactersService.savedCharacters.map((character: any) => {
        if (character.id == this.myForm.get('id')?.value) {
          return { ...character, ...this.myForm.value };
        } else {
          return character;
        }
      });
    console.log(this.charactersService.savedCharacters);

    localStorage.setItem(
      'list',
      JSON.stringify(holder)
    );
    this.router.navigate(['characters']);
  }

  cancel() {
    this.router.navigate(['/characters']);
  }
}
