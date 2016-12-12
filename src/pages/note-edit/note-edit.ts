import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'note-edit',
  templateUrl: 'note-edit.html'
})
export class NoteEditPage {

  note: any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.note = navParams.get("note");
  }

  done() {
    this.navCtrl.pop();
  }

}
