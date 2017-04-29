import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

const Home = inject('authStore')(observer(({ authStore }) => {
  console.log(authStore)
  return (
    <div>
      Home. Is not Protected. Anyone can see this.
    </div>
  )
}))

export default Home
