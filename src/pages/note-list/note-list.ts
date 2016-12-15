import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NoteViewPage } from '../note-view/note-view';
import { NoteEditPage } from '../note-edit/note-edit';
import { Note } from '../../app/note';
import { NoteService } from '../../app/note.service';

@Component({
  selector: 'page-node-listt',
  templateUrl: 'note-list.html'
})
export class NoteListPage {

  notes: Array<Note>;

  constructor(public navCtrl: NavController, private noteService: NoteService) {

  }

  ionViewDidEnter() {
    this.noteService.getAllNotes().then(notes => {
      function compareNotes(a: Note, b: Note) {
        if (a.editDate > b.editDate) {
          return -1;
        } else {
          return 1;
        }
      }

      this.notes = notes.sort(compareNotes);
    });
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
