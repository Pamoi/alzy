import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NoteViewPage } from '../note-view/note-view';
import { NoteEditPage } from '../note-edit/note-edit';
import { Note } from '../../app/note';
import { NoteService } from '../../app/note.service';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  notes: Array<Note>;

  constructor(public navCtrl: NavController, private noteService: NoteService) {

  }

  ionViewDidEnter() {
    this.noteService.getAllNotes().then(notes => this.notes = notes);
  }

  showNote(note) {
    this.navCtrl.push(NoteViewPage, {
      noteId: note.id
    });
  }

  newNote() {
    this.navCtrl.push(NoteEditPage, {
      note: this.noteService.newNote()
    });
  }

}
