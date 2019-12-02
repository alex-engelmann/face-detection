import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';

require('dotenv').config()

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
    const width = Number(image.width); //this is set as 500px elsewhere
    const height = Number(image.height);

    let faces = []
    // //each data.regions is an individual face
    for (let i = 0; i < data.outputs[0].data.regions.length; i++) {
      let currentFace = data.outputs[0].data.regions[i].region_info.bounding_box
      let leftCol = currentFace.left_col * width
      let topRow = currentFace.top_row * height
      let rightCol = (width - (currentFace.right_col * width))
      //The 50px in the following line is because of the <p> element below the image box
      let bottomRow = (height - (currentFace.bottom_row * height)) + 50
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

  clearURL = (event) => {
    // console.log(event);
    this.setState({ input: ""});
    document.getElementById('urlfield').value = "";
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    // console.log(event);
  }


  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    this.clearURL();

    fetch('https://face-detection-backend-aje.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://face-detection-backend-aje.herokuapp.com/image', {
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
        else {alert("No server response")}
        // console.log(response);
        //the calculated face information is then set into box state
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
      this.setState({ showImage: true });
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
            
            {/* {If user is guest, they won't see their entry count} */}
            {this.state.user.email !== "guest@gmail.com" ? <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              /> : ""}
            <ImageLinkForm
              clearURL={this.clearURL}
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            {this.state.showImage === true ?
              <FaceDetection box={box} imageUrl={imageUrl} /> : ""}

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
