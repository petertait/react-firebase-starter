import React from 'react'
import { observer, inject } from 'mobx-react'

function ListUsersComponent({usersStore}) {
  const {userList, isLoading} = usersStore

  const listItems = isLoading ? <p>Loading...</p>
    : userList.map((user) =>
      <ListItem key={user.login.md5} user={user}/>
    )

  return (
    <div>
      {listItems}
    </div>
  )
}

function ListItem({user}) {
  return (
    <div>
      <img src={user.picture.thumbnail} alt=''></img>
      <p>{user.email}</p>
    </div>
  )
}

export default inject('usersStore')(observer(ListUsersComponent))
