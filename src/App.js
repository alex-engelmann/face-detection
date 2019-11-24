import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';

require('dotenv').config()


const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 400
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: { faces: [{ leftCol: 0, topRow: 0, rightCol: 0, bottomRow: 0 }] },
  route: 'signin',
  isSignedIn: false,
  showImage: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  calculateFaceLocation = (data) => {

    //getting dimensions of full image
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    let faces = []
    // //each data.regions is an individual face
    for (let i = 0; i < data.outputs[0].data.regions.length; i++) {
      let leftCol = data.outputs[0].data.regions[i].region_info.bounding_box.left_col * width
      let topRow = data.outputs[0].data.regions[i].region_info.bounding_box.top_row * height
      let rightCol = (width - (data.outputs[0].data.regions[i].region_info.bounding_box.right_col * width))
      let bottomRow = (height - (data.outputs[0].data.regions[i].region_info.bounding_box.bottom_row * height))
      faces.push({ leftCol, topRow, rightCol, bottomRow })
    }

    return {
      faces
    }
  }

  displayFaceBox = (box) => {
    // console.log(box)
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    this.setState({ showImage: true })
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)

        }
        // console.log(response);
        //the calculated face information is then set into box state
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        {/*<Particles className='particles'
          params={particlesOptions}/>*/}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
              {/* <Logo /> */}
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onPictureSubmit={this.onPictureSubmit}
              />    
              {this.state.showImage === true ?
                <FaceRecognition box={box} imageUrl={imageUrl} /> : ""}
            
          </div>
          : (
            route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
