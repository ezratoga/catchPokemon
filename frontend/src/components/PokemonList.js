import React from 'react';
import { Link } from 'react-router-dom';

class PokemonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
        }
    }

    componentDidMount() { 
        this.fetchRemoteItems(); 
    }

    setItems(remoteItems) {
        var items = [];
        remoteItems.forEach((item) => {
            let newItem = {
                id: item.url.split('/')[6],
                name: item.name,
                url: item.url,
                img: `https://img.pokemondb.net/artwork/large/${item.name}.jpg`
            };
            items.push(newItem)
        });
        this.setState({
           isLoaded: true,
           items: items
        });
    }

    fetchRemoteItems() {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then(res => res.json())
        .then(
            (result) => {
                this.setItems(result?.results);
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            }
        )
    }

    render() {
        let lists = [];
        if (this.state.isLoaded) {
           lists = this.state.items.map((item) =>
              <tr key={item.id} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                 <td>{item.name}</td>
                 <td>
                    <Link to={`/pokemon/${item.id}`}>
                        <img src={item.img} style={{ width: '100px' }}/>
                    </Link>
                 </td>
              </tr>
           );
        }
        return (
            <div>
                <table onMouseOver={this.handleMouseOver}>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lists}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PokemonList;