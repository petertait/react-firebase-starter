import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { observer, inject } from 'mobx-react'
import ListStuffComponent from '../components/ListStuffComponent'

function QueryStuff({firebaseStore}) {
  return (
    <div>
      <div>
        <button onClick={() => firebaseStore.loadStuff()}>Load Stuff</button>
        <button onClick={ () => browserHistory.push('/') }>Go Home</button>
      </div>
      <div>
        <StuffInputForm submitAction={ (data) => firebaseStore.addStuff(data) }/>
      </div>
      <ListStuffComponent />
    </div>
  )
}

class StuffInputForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let params = this.state
    if (params.name.length && params.location.length) {
      this.props.submitAction(params)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name: </label>
            <input
              type='text' value={this.state.name}
              onChange={(_event) => this.setState({name: _event.target.value})}/>
          </div>
          <div>
            <label>Location: </label>
            <input
              type='text' value={this.state.location}
              onChange={(_event) => this.setState({location: _event.target.value})}/>
          </div>
          <div>
            <input type='submit' value='Submit'/>
          </div>
        </form>
      </div>
    )
  }
}

export default inject('firebaseStore')(observer(QueryStuff))
