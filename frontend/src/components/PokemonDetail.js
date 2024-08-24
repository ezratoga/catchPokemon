import React from 'react';
import { matchPath } from 'react-router-dom';
import { withRouter } from './withRouter';

class PokemonDetail extends React.Component {
    constructor(props) {
        super(props);
        this.pokemonId = '';
        this.state = {
            isLoaded: false,
            name: '',
            image: '',
            moves: [],
            types: [],
            nickname: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.pokemonId = this.props.router.params.id;
        this.fetchDetailItems(); 
    }

    setMovesAndTypes(resultMoves, resultTypes) {
        let moves = [];
        let types = [];
        resultMoves?.forEach((record) => {
            moves.push(record?.move?.name);
        });
        resultTypes?.forEach((record) => {
            console.log(record);
            types.push(record?.type?.name);
        })
        console.log(types);
        this.setState({
            name: this.state.name,
            image: this.state.image,
            isLoaded: true,
            moves: moves,
            types: types
        });
    }

    setName(result) {
        this.state.name = result;
    }

    fetchDetailItems() {
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}/`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setName(result?.name);
                this.setImage();
                this.setMovesAndTypes(result?.moves, result?.types);
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            }
        )
    }

    setImage() {
        this.state.image = `https://img.pokemondb.net/artwork/large/${this.state.name}.jpg`
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    
        // Create JSON payload from the state
        const payload = {
            nickname: this.state.nickname
        };
    
        // Send the payload using fetch
        fetch('http://localhost:3001/api/pokemon/catch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then((response) => response.json())
        .then((data) => {
            alert(data?.message ?? '')
        })
        .catch((error) => {
            alert('Internal Server Error');
        });
    }
    
    render() {
        console.log(this.pokemonId);
        let listMoves = [];
        let listTypes = [];
        if (this.state.isLoaded) {
            listMoves = this.state.moves.map((move, index) => 
                <tr>
                    <td>{(index + 1)}</td>
                    <td>{move}</td>
                </tr>
            );
            listTypes = this.state.types.map((type, index) => {
                <tr>
                    <td>{(index + 1)}</td>
                    <td>{type}</td>
                </tr>
            })
        }

        // const [formData, setFormData] = useState({
        //     nickname: ''
        // });
        
        // // Handle form input changes
        // const handleChange = (e) => {
        //     const { name, value } = e.target;
        //     setFormData((prevData) => ({
        //     ...prevData,
        //     [name]: value,
        //     }));
        // };
        
        // // Handle form submission
        // const handleSubmit = (e) => {
        //     e.preventDefault();
        //     // Send form data as JSON payload
        //     fetch('http://localhost:3001/api/pokemon/catch', formData)
        //     .then((response) => {
        //         console.log('Success:', response);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
        // };
        return (
            <div>
                <h1>Name: {this.name}</h1>
                <img src={this.state.image} style={{ width: '100px' }}/>
                <h3>Moves</h3>
                <table onMouseOver={this.handleMouseOver}>
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>Move</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listMoves}
                    </tbody>
                </table>

                <h3>Types</h3>
                <table onMouseOver={this.handleMouseOver}>
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listTypes}
                    </tbody>
                </table>

                {/* <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nickname">Nickname:</label>
                    <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                    />
                </div>
                <button type="submit">Submit</button>
                </form> */}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="nickname"
                            value={this.state.nickname}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(PokemonDetail);