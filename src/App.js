import { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       name: {firstName: 'Lucca', lastName: 'Martins'},
//       company: 'ZTM'
//     }
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>Hi {this.state.name.firstName} {this.state.name.lastName}, I work at {this.state.company}</p>
//           <button onClick={() => {
//             this.setState(() => {
//               return {
//                 name: {firstName: 'John', lastName: 'Smith'}
//               }
//             }, () => {
//               console.log(this.state)
//             });  // updates state, sees that it's now a new object in memory and thus updates the app's UI
//             // passing in an object into setState is also called a shallow merge. The setState is happening asynchronously and thus the below line 'console.log(this.state)' is being executed before we set the new state
//             // by using the executable function followed by the callback function, you change state and then and only then ask your code to console log the new state. Also the callback in optional, you dont need to include it
//           }} >Change Name</button>
//         </header>
//       </div>
//     );
//   }
// }

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(() => {
        return {monsters: users}
      },
      () => {
        console.log(this.state)
      } 
      ))
  }

  render() {
    console.log('render');

    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchField);
    })
    return (
      <div className="App">
        <input 
          className='search-box' 
          type='search' 
          placeholder='search monsters' 
          onChange={(event) => {
            const searchField = event.target.value.toLocaleLowerCase();
            this.setState(() => {
              return { searchField }
            })
            
          }}
        /> 
        {filteredMonsters.map((monster) => {
          return <div key={monster.id}><h1>{monster.name}</h1></div>;
        })}
      </div> 
    );
  }
}

export default App;
