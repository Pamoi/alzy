import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NoteService } from './note.service';
import { NoteListPage } from '../pages/note-list/note-list';
import { Page2 } from '../pages/page2/page2';
import { NoteViewPage } from '../pages/note-view/note-view';
import { NoteEditPage } from '../pages/note-edit/note-edit';

@NgModule({
  declarations: [
    MyApp,
    NoteListPage,
    Page2,
    NoteViewPage,
    NoteEditPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NoteListPage,
    Page2,
    NoteViewPage,
    NoteEditPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    NoteService
  ]
})
export class AppModule {}
