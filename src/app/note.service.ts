import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Note } from './note'

@Injectable()
export class NoteService {
  private noteKey = 'notes';

  constructor(private storage: Storage) {

  }

  private noteFromObj(obj: any): Note {
    return new Note(obj.id, obj.source, obj.creationDate, obj.editDate);
  }


  getAllNotes(): Promise<Note[]> {
    return this.storage.get(this.noteKey).then(json => {
      let array = JSON.parse(json);
      if (!(array instanceof Array)) {
        array = [];
      }
      let notes = [];
      for (let obj of array) {
        notes.push(this.noteFromObj(obj));
      }

      return notes;
    });
  }

  getNote(id: number): Promise<Note> {
    return this.getAllNotes().then(notes => {
      let array = notes.filter(e => e.id == id);
      if (array) {
        return array[0];
      } else {
        return null;
      }
    });
  }

  saveNote(note: Note): Promise<any> {
    return this.getAllNotes().then(notes => {
      let max = 0;
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id > max) {
          max = notes[i].id;
        }
        if (notes[i].id == note.id) {
          notes[i] = note;
          return this.storage.set(this.noteKey, JSON.stringify(notes));
        }
      }

      note.id = max + 1;
      notes.push(note);
      return this.storage.set(this.noteKey, JSON.stringify(notes));
    });
  }

  deleteNote(note: Note): Promise<any> {
    return this.getAllNotes().then(notes => {
      notes = notes.filter(e => e.id != note.id);
      return this.storage.set(this.noteKey, JSON.stringify(notes));
    });
  }

  newNote(): Note {
    return new Note(0, '# Title', new Date(), new Date());
  }
}
