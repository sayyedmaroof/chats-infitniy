export const getSender = (loggedUser, users) => {
  console.log(loggedUser, 'loggedUser')
  console.log(users, 'users')
  // return users[0]._id === loggedUser._id ? users[1].name : users[0].name
  return users.find(e => e._id !== loggedUser._id).name
}

export const getSenderDetails = (loggedUser, users) => {
  console.log(loggedUser, 'loggedUser')
  console.log(users, 'users')
  // return users[0]._id === loggedUser._id ? users[1].name : users[0].name
  return users.find(e => e._id !== loggedUser._id)
}
