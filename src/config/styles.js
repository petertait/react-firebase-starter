import { injectGlobal } from 'styled-components'

export const globalStyles = injectGlobal`
	@font-face {
	  font-family: 'Apercu';
	}

	body {
		margin: 0;
    font-family: 'Apercu', 'Karla', sans-serif;
	}
`
