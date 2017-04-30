import React  from 'react'
import { observer, inject } from 'mobx-react'

function ListStuffComponent({firebaseStore}) {
  const {stuffList, isLoading} = firebaseStore
  const listItems = stuffList.map((_stuff) =>
    <ListItem key={_stuff.id} stuff={_stuff}/>
  )
  const isLoadingText =  isLoading ? <div>Loading...</div> : ''

  return (
    <div>
      {isLoadingText}
      {listItems}
    </div>
  )
}

function ListItem({stuff}) {
  return (
    <div>
      <p>{stuff.name}</p>
      <p>{stuff.location}</p>
    </div>
  )
}

export default inject('firebaseStore')(observer(ListStuffComponent))
