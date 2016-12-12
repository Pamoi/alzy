import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';

import { NoteEditPage } from '../note-edit/note-edit';
import { Note } from '../../app/note';
import { NoteService } from '../../app/note.service';

@Component({
  selector: 'note-view',
  templateUrl: 'note-view.html'
})
export class NoteViewPage {

  note: Note = new Note(0, '', new Date(), new Date());

  constructor(public navCtrl: NavController, navParams: NavParams, public alertCtrl: AlertController,
    private noteService: NoteService) {
    this.noteService.getNote(navParams.get('noteId')).then(note => this.note = note);
  }

  editNote() {
    this.navCtrl.push(NoteEditPage, {
      note: this.note
    });
  }

  deleteNote() {
    let confirm = this.alertCtrl.create({
      title: 'Delete this note ?',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.noteService.deleteNote(this.note);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

}
