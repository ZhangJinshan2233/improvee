import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }
  notes = [
    {
      coacheeId: '001',
      title: 'note1',
      discussed: '123',
      concluded: '456',
      next: '789',
      date: '12/5/2018',
      time: '12:12'
    },
    {
      coacheeId: '001',
      title: 'note2',
      discussed: '123',
      concluded: '456',
      next: '789',
      date: '12/5/2018',
      time: '12:12'
    },
    {
      coacheeId: '001',
      title: 'note3',
      discussed: '123',
      concluded: '456',
      next: '789',
      date: '12/5/2018',
      time: '12:12'
    },
    {
      coacheeId: '003',
      title: 'note5',
      discussed: '123',
      concluded: '456',
      next: '789',
      date: '12/5/2018',
      time: '12:12'
    },
    {
      coacheeId: '002',
      title: 'note6',
      discussed: '123',
      concluded: '456',
      next: '789',
      date: '12/5/2018',
      time: '12:12'
    }
  ]

  getNotesByCoacheeId(id) {

    return this.notes.filter((item) => item.coacheeId == id)

  }
}
