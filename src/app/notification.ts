export class Notification {
  id: number
  date: Date
  title: string
  text: string

  constructor(id: number, date: Date, title: string, text: string) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.text = text;
  }
}
