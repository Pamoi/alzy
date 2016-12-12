import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { NoteViewPage } from '../pages/note-view/note-view';
import { NoteEditPage } from '../pages/note-edit/note-edit';

@NgModule({
  declarations: [
    MyApp,
    Page1,
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
    Page1,
    Page2,
    NoteViewPage,
    NoteEditPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
