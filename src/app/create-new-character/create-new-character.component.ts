import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-create-new-character',
  templateUrl: './create-new-character.component.html',
  styleUrls: ['./create-new-character.component.scss'],
})
export class CreateNewCharacterComponent {
  characterForm = new FormGroup({
    created: new FormControl(''),
    name: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    species: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    origin: new FormGroup({
      name: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
    }),
    location: new FormGroup({
      name: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
    }),
    image: new FormControl('', Validators.required),
  });

  constructor(public charactersService: CharactersService) {}

  onSubmit() {
    const currentDate: { [key: string]: any } = new Date();
    const formValues: any = {
      ...this.characterForm.value,
      created: currentDate,
    };
    this.charactersService.addNewCharacter(formValues);
  }
}
