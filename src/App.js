import React from 'react';
import axios from 'axios';
import UserCard from './components/UserCard'
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      login: '',
      location: '',
      public_repos: '',
      followers: '',
      following: '',
      avatar_url: '',
      followingArray: [],
    }
    // console.log('Constructor is running!');
  }
  
  componentDidMount() {
    console.log('CDM is running!');
    // fetch initial data
    // set up event listeners / subscriptions

    // window.addEventListener('resize', this.handleResize);
    // this.setState({ pokemon: data }); // pretend this is fetching from an API

    axios.get('https://api.github.com/users/jordanjmiller')
      .then(response => {
        console.log(response.data); 
        this.setState({name: response.data.name, login: response.data.login, location: response.data.location, public_repos: response.data.public_repos,
          followers: response.data.followers, following: response.data.following, avatar_url: response.data.avatar_url});
        axios.get('https://api.github.com/users/jordanjmiller/following')
        .then(response => {console.log(response.data);
          response.data.forEach((user) => {
            axios.get(`https://api.github.com/users/${user.login}`)
            .then(response => {console.log(response.data); 
              this.setState({...this.state, followingArray: [...this.state.followingArray, response.data] });
            })
            .catch(error => {console.log('Error! : ' + error)})
          }) 
        })
        .catch(error => {console.log('Error! : ' + error)})
      })
      .catch(error => {console.log('Error! : ' + error)})
      console.log('lolfollowersarray', this.state.followingArray);
  }

  componentDidUpdate() {
    // console.log('CDU running');
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.handleResize);
  }

  render() {
    // console.log('Render');
      console.log('lolfollowersarray', this.state.followingArray);
    
    return (
      <div className="parent">
        <UserCard {...this.state}/>
        <h1>Following:</h1>
        {this.state.followingArray.length !== 0 && this.state.followingArray.map((user)=>{ return <UserCard  {...user}/>})}
      </div>
    );
  }
}

export default App;
