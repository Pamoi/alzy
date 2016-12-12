import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NoteViewPage } from '../note-view/note-view';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  notes: Array<string>;

  constructor(public navCtrl: NavController) {
    this.notes = [];
    for (var i = 1; i < 13; i++) {
      this.notes.push('Note ' + i);
    }
  }

  showNote(note) {
    this.navCtrl.push(NoteViewPage, {
      note: {
        title: note,
        body: '<p>Some text inside of the note.</p><ul><li>This note</li><li>also contains</li><li>a list</li></ul><p><strong>That</strong>\'s it.</p>'
      }
    });
  }

}
