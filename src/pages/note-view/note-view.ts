import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';

import { NoteEditPage } from '../note-edit/note-edit';

@Component({
  selector: 'note-view',
  templateUrl: 'note-view.html'
})
export class NoteViewPage {

  note: any;

  constructor(public navCtrl: NavController, navParams: NavParams, public alertCtrl: AlertController) {
    this.note = navParams.get("note");
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
            // Delete the note...
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

}
