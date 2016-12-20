import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NoteService } from './note.service';
import { NotificationService } from './notification.service';
import { NoteListPage } from '../pages/note-list/note-list';
import { NotificationListPage } from '../pages/notification-list/notification-list';
import { NoteViewPage } from '../pages/note-view/note-view';
import { NoteEditPage } from '../pages/note-edit/note-edit';
import { NotificationEditPage } from '../pages/notification-edit/notification-edit';
import { HelpPage } from '../pages/help/help';

@NgModule({
  declarations: [
    MyApp,
    NoteListPage,
    NotificationListPage,
    NoteViewPage,
    NoteEditPage,
    NotificationEditPage,
    HelpPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NoteListPage,
    NotificationListPage,
    NoteViewPage,
    NoteEditPage,
    NotificationEditPage,
    HelpPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    NoteService,
    NotificationService
  ]
})
export class AppModule {}
