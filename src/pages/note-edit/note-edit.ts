import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Note } from '../../app/note';
import { NoteService } from '../../app/note.service';

@Component({
  selector: 'note-edit',
  templateUrl: 'note-edit.html'
})
export class NoteEditPage {

  note: Note;

  constructor(public navCtrl: NavController, navParams: NavParams, private noteService: NoteService) {
    this.note = navParams.get("note");
  }

  done() {
    this.noteService.saveNote(this.note);
    this.navCtrl.pop();
  }

}
