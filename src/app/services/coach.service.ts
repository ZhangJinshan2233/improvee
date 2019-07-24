import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor() { }
  habitlist = {
    sunday: [
      {
        title: "drink water",
        des: '',
        completed: true
      }
    ],
    monday: [
      {
        title: "drink water",
        des: '',
        completed: true
      },
      {
        title: "eat healthy food",
        des: '',
        completed: false
      }
    ]
  }
  allChallenges = [
    {
      title: 'Activated',
      challenges: [
        {
          name: 'Food Journal'
        }
      ]
    },
    {
      title: 'History',
      challenges: [
        {
          name: 'Food Journal'
        },
        {
          name: 'Sleep'
        }
      ]
    }
  ]
  private users = [
    {
      id: '001',
      name: 'Merry',
      profileImage: '/assets/img/user3.jpg',
      completedHabits: 0.6,
      changedWeight: 6,
      ongoingChallenges: 1,
      lastLogin: '5/21/2019',
      startDate: '5/21/2019',
      endDate: '7/2/2019',
      remainMembershipDays: 22
    },
    {
      id: '002',
      name: 'Ruby',
      profileImage: '/assets/img/user1.jpeg',
      completedHabits: 0.7,
      changedWeight: 6,
      ongoingChallenges: 2,
      lastLogin: '5-21-2019',
      startDate: '5/21/2019',
      endDate: '7/2/2019',
      remainMembershipDays: 19
    },
    {
      id: '003',
      name: 'Ani',
      profileImage: '/assets/img/user2.jpg',
      completedHabits: 1,
      changedWeight: 5,
      ongoingChallenges: 3,
      lastLogin: '5/21/2019',
      startDate: '5/21/2019',
      endDate: '7/2/2019',
      remainMembershipDays: 29
    },
    {
      id: '004',
      name: 'Ameli',
      profileImage: '/assets/img/user4.jpeg',
      completedHabits: 0,
      changedWeight: 2,
      ongoingChallenges: 1,
      lastLogin: '5/21/2019',
      startDate: '5/21/2019',
      endDate: '7/2/2019',
      remainMembershipDays: 25
    },
    {
      id: '005',
      name: 'Luke',
      profileImage: '/assets/img/user5.jpeg',
      completedHabits: 1,
      changedWeight: 8,
      ongoingChallenges: 0,
      lastLogin: '5/21/2019',
      startDate: '5/21/2019',
      endDate: '7/2/2019',
      remainMembershipDays: 1
    }
  ]

  getAllUsers() {
    return this.users
  }

  findOne(id) {
    return this.users.find((item) => {
      return item.id == id
    })
  }

  filterItems(searchTerm) {
    return this.users.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

  getAllHabits() {
    return Object.entries(this.habitlist).reduce((acc, current, index) => {
      let temp = {}
      temp['date'] = current[0];
      temp['habits'] = current[1];
      return [...acc, temp]
    }, [])
  }

  getChallenges() {
    return this.allChallenges
  }
}
