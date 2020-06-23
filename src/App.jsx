import React, { Component } from 'react';
import './App.css';

const URL_PATH =
  'https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json';

export class App extends Component {
  state = {
    pokemons: [],
    filterValue: '',
    filterPokemons: [],
    isChecked: false
  };

  componentDidMount() {
    fetch(URL_PATH).then((response) => response.json()).then((response) => {
      this.setState({ pokemons: response });
    });
  }

  renderPokemons = () => {
    const { filterPokemons } = this.state;
    if (filterPokemons.length < 0) {
      return (
        <ul>
          <li>
            <img
              src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
              alt=""
            />
            <div className="info">
              <h1 className="no-results">No results</h1>
            </div>
          </li>
        </ul>
      );
    }

    return (
      <ul className="suggestions">
        {filterPokemons.map((pokemon) => {
          return (
            <li key={pokemon.Number}>
              <img src={pokemon.img} alt={pokemon.Name} />
              <div className="info">
                <h1>
                  <span className="hl">{pokemon.Name}</span>chu
                </h1>
                {pokemon.Types.map((type, i) => (
                  <span key={i} className="type electric">
                    {type}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  filtersPokemon = (event) => {
    const filter = event.target.value.toLowerCase();

    const filterpokemons = this.state.pokemons.filter(
      function(pokemon) {
        if (this.count < 4 && pokemon.Name.toLowerCase().includes(filter)) {
          this.count++;
          return true;
        }
        return false;
      },
      { count: 0 }
    );

    this.setState({
      filterValue: filter,
      filterPokemons: this.sortArray(filterpokemons, 'Name')
    });
  };

  sortArray = (arr, value) => {
    return arr.sort((a, b) => {
      if (a[value] > b[value]) {
        return 1;
      }

      if (a[value] < b[value]) {
        return -1;
      }

      return 0;
    });
  };

  onMaxChange = (event) => {
    this.setState({
      isChecked: event.target.checked,
      filterPokemons: this.sortArray(
        this.state.filterPokemons,
        event.target.checked ? 'MaxCP' : ''
      )
    });
  };

  render() {
    return (
      <div>
        <label htmlFor="maxCP" className="max-cp">
          <input
            type="checkbox"
            id="maxCP"
            onChange={this.onMaxChange}
            checked={this.state.isChecked}
          />
          <small>Maximum Combat Points</small>
        </label>
        <input
          type="text"
          className="input"
          placeholder="Pokemon or type"
          onChange={this.filtersPokemon}
          value={this.state.filterValue}
        />
        <div className="loader" />
        <div>{this.renderPokemons()}</div>
      </div>
    );
  }
}

export default App;

// const App = () => <>
// <label htmlFor="maxCP" className="max-cp">
//     <input type="checkbox" id="maxCP" />
//     <small>
//         Maximum Combat Points
//     </small>
// </label>
// <input type="text" className="input" placeholder="Pokemon or type" />
// <div className="loader"></div>
// <ul className="suggestions">
//     <li>
//         <img src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" alt="" />
//         <div className="info">
//             <h1>
//                 <span className="hl">Pika</span>chu</h1>
//             <span className="type electric">Electric</span>
//             <span className="type normal">Normal</span>
//         </div>
//     </li>
//     <li>
//         <img src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png" alt="" />
//         <div className="info">
//             <h1 className="no-results">
//                 No results
//             </h1>
//         </div>
//     </li>
// </ul>
// </>;
