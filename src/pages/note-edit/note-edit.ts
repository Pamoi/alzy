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

  ionViewWillLeave() {
    // Do not save empty notes
    if (this.note.source.trim() == '#' || this.note.source.trim() == '') {
      return;
    }

    this.note.editDate = new Date();
    this.noteService.saveNote(this.note);
  }

  done() {
    this.navCtrl.pop();
  }

}
