import React from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

export default function Protected(Component) {
	@inject(['store']) @observer
	class AuthenticatedComponent extends Component {
		render() {
			const { user, authIsPending } = this.props.store.authStore
			return (
				<div className="authComponent">
					{user ?
            <Component {...this.props} />
            : !authIsPending && !user ?
              <Redirect to={{pathname: '/login', state: { from: this.props.location }}}/>
            :
              null
          }
				</div>
        // <div>
        //   <Component {...this.props} />
				// </div>
			)
		}

	}
	return AuthenticatedComponent
}
