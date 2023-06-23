import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


/*
  render() - displays the react elements/components into the root.
  App component is our mother component, this is the component we use as entry point and where we can render all other components or pages.
  <React.StrictMode> - component from React that manages future or possible conflicts. It allows us extend or expand certain error messages.

  - Changes applied to the react application are automatically applied to the output in our browser which is normally referred to as "hot-reloading".
				- This means that any code applied to our application will be displayed in the output upon saving the changes. This reloads the browser page applying all changes.
				- There are instances that the application does not "hot-reload". Simply refreshing the browser or restarting the application should fix the problem.
				- The way react works is that it applies changes to our application by comparing copies of the "DOM" creating what we call a "Virtual DOM".
				- The differences in both copies of the Virtual DOM are applied to the "actual/real DOM" which is one of the main reasons why React JS is able to quickly change the look and functionality of our application.
				- React JS utilizes the DOM by simply selecting and changing the "root" element of our application whenever changes are made to it.

  - The syntax for creating elements in JS is very similar to HTML tags, with one major difference being it is able to apply JavaScript code.
  - The "h1" tag that we see in the above example is what we call JSX.
  - JSX allows us to create HTML elements and at the same time allows us to apply JavaScript code to these elements making it easy to write both HTML and JavaScript code in a single file as opposed to creating two separate files (One for HTML and another for JavaScript syntax).
  - With JSX we can simply apply JavaScript logic with HTML elements that allows us to change the look and functionality of our application.
*/



// const name = "John Smith"
// const element = <h1>Hello, {name}</h1>

// const name = "Moon"



/*
  const user = {
      firstName: "Moon",
      lastName: "Noir",
  }

  function formatName(user){
    return `${user.firstName} ${user.lastName}`
  }

  const element = <h1>Hello, {formatName(user)}</h1>

  const root = ReactDOM.createRoot(document.getElementById('root'))

  root.render(element)

*/
      