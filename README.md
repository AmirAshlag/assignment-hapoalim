# Documentation

charactersService:

This service is responsible for managing the list of characters used in the application. It retrieves the characters from an external API, allows the user to delete and save characters, and stores saved characters locally.

Properties:

characters: An array containing all the characters retrieved from the API.
charactersCopy: A copy of the characters array. used to be able to mdifdy characters for search and the set it back to be equal to its original value
nextCharactersUrl: A string containing the URL to retrieve the next page of characters from the API.
isLoading: A boolean indicating whether or not characters are currently being loaded.
deletedIndexs: An array containing the index values of characters that have been deleted, used only for the deleted animation and later cleard.
savedCharacters: An array containing all the characters that have been saved by the user.
unSavedIndexs: An array containing the index values of characters that have been unsaved by the user.
unSaved1: A number indicating the index of the first character that has been unsaved by the user, also used only for unsaved animation.
editId: A number indicating the ID of the character currently being edited.
savedUpdate$: A Subject that emits updates whenever a character is saved or unsaved.
newCharacters: An array containing all the newly created characters.
search$: A Subject that emits updates whenever the user searches for a character.

Methods:

getCharactersInitial(): retrieves the initial list of characters from the API and merges it with the list of saved characters (also checks for created characters) stored locally. The merged list is stored in the characters array.
getCharactersScroll(): retrieves the next page of characters from the API and merges it with the characters array.
deleteCharacter(): deletes a character from the characters array and the list of saved characters if saved.
saveCharacter(): saves a character locally using localStorage.
unSaveCharacter(): unsaves a character from localStorage and emits the updated saved characters list.
addNewCharacter(): adds a new character to the newCharacters array

CharactersListComponent:

The CharactersListComponent is responsible for displaying a list of characters and allowing the user to filter and edit them. It subscribes to two Observables provided by the CharactersService to listen for updates to the saved characters and search queries, and has methods to handle filtering, editing, and updating the list of characters. 

Properties:

savedCharacters: an array of saved characters retrieved from local storage
SavedSubscription: a subscription to the savedUpdate$ event from the CharactersService
searchSubscription: a subscription to the search$ event from the CharactersService

Methods:

onscroll(): a method that calls getCharactersScroll() from the CharactersService to retrieve more characters when the user scrolls to the bottom of the list.
checkIfSaved(): checks if a character is saved in savedCharacters and returns a boolean value.
editMode(): sets the editId property in CharactersService and navigates to the edit page for the selected character.
UpdateList(): updates the characters list with the saved characters from savedCharacters.
FilterList(): a method that filters the characters list based on a search parameter and search string.

EditFormComponent:

the EditFormComponent represents the edit form for a character in a character list. It allows users to edit the details of a character such as their name, gender, image, status, type, and species.

Properties:

myForm: object which contains the form controls and their initial values. The ngOnInit() lifecycle hook sets the form's initial values with the character's details passed in from the ActivatedRoute parameter.

methods:

submit(): saves the updated character's details to the characters list.
cancel(): discards the changes and navigates back to the character list.

NavbarComponent: represnts the navbar

SavedPageComponent: is responsible for displaying the list of saved characters in the app

Properties:

SavedSubscription variable that holds a subscription to saved updates.

extra:

In ngOnInit(), the saved characters are retrieved from local storage using localStorage.getItem() and assigned to savedCharacters in the charactersService.  The SavedSubscription listens for changes in the saved characters and updates the saved characters when a change is detected.

SearchComponent: is responsible for allowing the user to search for characters based on a search string and search parameter. It also provides functionality to clear the search.

**note Due to the API's structure, it only sends 20 characters at a time with a URL for the next 20. Therefore, the search functionality only queries from the characters that have been loaded so far, rather than from all characters in the API.

Properties:

searchString: a string that holds the user's search query.
searchParam: a string that holds the user's chosen search parameter ( name, species, etc.).
search: a Subject that emits the search query and search parameter as an object.
searchSubscription: a Subscription that is used to unsubscribe from the search$ observable.

methods:

sendSearch(): emits the search query and search parameter using the search Subject.
clear(): clears the search query and sets the characters list back to its original state.









