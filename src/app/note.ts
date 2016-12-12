import marked from 'marked';

export class Note {
  id: number
  creationDate: Date
  editDate: Date
  source: string

  constructor(id: number, source: string, creationDate: Date, editDate: Date) {
    this.id = id;
    this.source = source;
    this.creationDate = creationDate;
    this.editDate = editDate;
  }

  toHtml(): string {
    return marked(this.source);
  }

  getTitle(): string {
    let title = this.source.split('\n')[0];
    while (title[0] == '#') {
      title = title.substring(1);
    }
    return title.trim();
  }
}
