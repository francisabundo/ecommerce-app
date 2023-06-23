import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout() {

	const { unsetUser, setUser } = useContext(UserContext);

	// Clear the localStorage of the user's information
	unsetUser();

	// already in the App.js unsetUser function
	// localStorage.clear();

	// Placing the "setUser" setter function inside of a useEffect is necessary because of updates within React JS that a state of another component cannot be updated while trying to render a different component
	// By adding the useEffect, this will allow the Logout page to render first before triggering the useEffect which changes the state of our user 
	useEffect(() => {
		setUser({ id : null });
	}, []);

	// Redirect back to login
	return(
		<Navigate to="/login" />
	)
}
