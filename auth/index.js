// auth status variable
const authenticated = false

// return auth status
export const isAuthenticated = () => authenticated

// set auth status to authenticated
export const authenticateUser = () => {
	authenticated = true
}

// set auth status to unauthenticated
export const unauthenticateUser = () => {
	authenticated = false
}