const peeps = [
  {
    name: 'Clinton',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    credits: [
      { name: 'project 1' },
      { name: 'project 2', url: 'google.com' },
      { name: 'project 3' },
    ]
  },
  {
    name: 'Shane',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    credits: [
      { name: 'project 1' },
      { name: 'project 2', url: 'google.com' },
      { name: 'project 3' },
    ]
  },
  {
    name: 'Henry',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    credits: [
      { name: 'project 1' },
      { name: 'project 2', url: 'google.com' },
      { name: 'project 3' },
    ]
  },
  {
    name: 'Chiu',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    credits: [
      { name: 'project 1' },
      { name: 'project 2', url: 'google.com' },
      { name: 'project 3' },
    ]
  },

]

function insert_peeps() {
  let people = $('<div class="people"></div>')

  for (peep_idx in peeps) {
    let peep = peeps[peep_idx]
    console.log(peep)
    let person = $('<div class="person"></div>')
    person.append($(`<div class="name">${peep.name}</div><div class="bio">${peep.bio}</div>`))
    let credits = $('<div class="credits"></div>')

    for (credit_idx in peep.credits) {
      let credit = peep.credits[credit_idx]
      if (credit.url) {
        credits.append($(`<a class="credit" href="${credit.url}">${credit.name}</a>`))
      } else {
        credits.append($(`<div class="credit">${credit.name}</div>`))
      }
    }

    person.append(credits)
    people.append(person)
  }

  $('.about').append(people)
}