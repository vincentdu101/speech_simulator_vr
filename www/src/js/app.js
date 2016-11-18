import 'aframe';
import 'babel-polyfill';
import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Camera from './components/Camera';
import Cursor from './components/Cursor';
import Sky from './components/Sky';

class BoilerplateScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red'
    };
  
    GamepadController.init();
  }

        // <a-asset-item id="medieval-obj" src="../models/Medieval/Medieval_City.obj" width="1" height="2"></a-asset-item>
        // <a-asset-item id="medieval-mtl" src="../models/Medieval/Medieval_City.mtl" width="1" height="2"></a-asset-item>
        // <a-entity class="move-to-clickable" id="medieval-man" obj-model="obj: #medieval-obj; mtl: #medieval-mtl" geometry="width: 1; height: 1" position="-4 -30 4"></a-entity>
  // <Sky />
// <Entity id="grid" rotation="-90 0 0" geometry="primitive: plane; width: 64; height: 64;" material={{repeat: '100 100', color: 'gray'}} />
  // changeColor = () => {
  //   const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
  //   this.setState({
  //     color: colors[Math.floor(Math.random() * colors.length)],
  //   });
  // };
  
  setupRecognitionModels(model) {
    var recModel = new ObjectInteraction(model, "#camera");
    recModel.setOnInteract(Recognizer.startRecognition);
  }

  componentDidMount() {
    this.setupRecognitionModels("#clerk-model");
  }

  render () {
    return (
      <Scene>
        <Camera id="camera" position="0 1 0"><Cursor/></Camera>
        <Sky />

        <a-entity bmfont-text="text: Hello world, width=230" position="0 1.18 -7.67"></a-entity>

        <a-entity geometry="primitive:box;radius:100" material="color:white;shader:flat" scale="2 2 0.1" position="1 1 -2.18" rotation="0 0 0" visible="true">
        </a-entity>
        <a-entity text="text: What's up" position="0 1.18 -6.67"></a-entity>

        <a-box id="wall1" className="physical-model" position="-16.56 2.56 9.26" rotation="0 0 0" width="1" height="1" depth="1" color="#4CC3D9" material="color:#4CC3D9" geometry="primitive:box;width:1;height:1;depth:1" scale="25 5 1"></a-box>
        <a-box id="wall2" className="physical-model" position="-1 2.5 4" rotation="0 45 0" width="1" height="1" depth="1" color="#4CC3D9" material="color:#4CC3D9" geometry="primitive:box;width:1;height:1;depth:1" scale="60 5 1"></a-box>
        <a-box id="wall3" className="physical-model" position="-9.15 2.48 -29.23" rotation="0 0 0" width="1" height="1" depth="1" color="#4CC3D9" material="color:#4CC3D9" geometry="primitive:box;width:1;height:1;depth:1" scale="50 5 1"></a-box>
        <a-box id="wall4" className="physical-model" position="-29.31 2.52 -11.12" rotation="0 90 0" width="1" height="1" depth="1" color="#4CC3D9" material="color:#4CC3D9" geometry="primitive:box;width:1;height:1;depth:1" scale="40 5 1"></a-box>
        <a-box id="wall5" className="physical-model" position="14.61 2.52 -19.29" rotation="0 90 0" width="1" height="1" depth="1" color="#4CC3D9" material="color:#4CC3D9" geometry="primitive:box;width:1;height:1;depth:1" scale="20 5 1"></a-box>

        <a-sphere position="0 1.25 -1" radius="1.25" color="green" scale="1 1 1"></a-sphere>
        <a-box id="clerk-model" position="-1 0.5 1" rotation="0 45 0" width="1" height="1" depth="1"  color="#ea93b7"></a-box>
        <a-cylinder position="1 0.75 1" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
        <a-plane rotation="-90 0 0" width="500" height="500" color="#7BC8A4"></a-plane>
      


      </Scene>
    );
  }


}

ReactDOM.render(<BoilerplateScene/>, document.querySelector('.scene-container'));
