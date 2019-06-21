import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private activeChallenges = [
    {
      id: '001',
      title: 'food journal',
      imgUrl: '../../assets/img/food.jpeg',
      startDate: '',
      endDate: '',
      abstract: 'For the next 7 days,keep record of foods and drinks you consume. make  sure to also include your intake during the weekend'
    }
  ];

  private allChallenges = [
    {
      id: '001',
      title: 'food journal',
      imgUrl: '../../assets/img/food.jpeg',
      duration: 7,
      abstract: ' A food journal is a good way to keep track of what you put in your mouth.',
      features: 'Let us see how well you are eating byjotting down your food intake for 7 days'
    },
    {
      id: '002',
      title: 'sleep',
      imgUrl: '../../assets/img/sleep.jpeg',
      duration: 6,
      abstract: 'You know exercise isnt about perfact abs,but moving more might be key to feeling good',
      features: 'sleep is good for your health'
    }
  ]

  constructor() { }

  getActiveChallenges() {
    return this.activeChallenges
  }
  getAllChallenges() {
    return this.allChallenges
  }
  findChallenge(id: string) {
    return this.allChallenges.find(challenge => challenge.id == id)
  }
  findActiveChallenge(title:string){
    return this.activeChallenges.find(challenge=>challenge.title==title)
  }
}
