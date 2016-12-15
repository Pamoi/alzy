import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Notification } from './notification'

@Injectable()
export class NotificationService {
  private notificationKey = 'notification';

  constructor(private storage: Storage) {

  }

  private notificationFromObj(obj: any): Notification {
    return new Notification(obj.id, obj.date, obj.title, obj.text);
  }


  getAllNotifications(): Promise<Notification[]> {
    return this.storage.get(this.notificationKey).then(json => {
      let array = JSON.parse(json);
      if (!(array instanceof Array)) {
        array = [];
      }
      let notifications = [];
      for (let obj of array) {
        notifications.push(this.notificationFromObj(obj));
      }

      return notifications;
    });
  }

  saveNotification(notification: Notification): Promise<Notification> {
    return this.getAllNotifications().then(notifications => {
      let max = 0;
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].id > max) {
          max = notifications[i].id;
        }
        if (notifications[i].id == notification.id) {
          notifications[i] = notification;
          return this.storage.set(this.notificationKey, JSON.stringify(notifications)).then(() => {
            return notification;
          });
        }
      }

      notification.id = max + 1;
      notifications.push(notification);
      return this.storage.set(this.notificationKey, JSON.stringify(notifications)).then(() => {
        return notification;
      });
    });
  }

  clear(): Promise<any> {
    return this.storage.set(this.notificationKey, JSON.stringify([]))
  }

}
