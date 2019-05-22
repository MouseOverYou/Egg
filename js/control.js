let Egg;
let buttons;
let ground;
let eggparent;
let playing = false;
let isRunning = false;
//one,two,ground, none
let lastbutton =  "none";

let tex = new THREE.TextureLoader().load('assets/coolEgg.jpg');
tex.flipY = false;


AFRAME.registerComponent('do-something-once-loaded', {
  init: function () {
    // This will be called after the entity has properly attached and loaded.
    console.log('I am ready!');
    let sceneEl = document.querySelector('a-scene');
    Egg = sceneEl.querySelector('#eggchar');
    eggparent = sceneEl.querySelector('#eggparent');
    ground = sceneEl.querySelector('#ground');
    console.log(sceneEl.querySelector('#eggchar'));
  }
});
AFRAME.registerComponent('shadow-material', {
  init() {
    this.material = new THREE.ShadowMaterial();
    this.el.getOrCreateObject3D('mesh').material = this.material;
    this.material.opacity = 0.3;
  }
});

AFRAME.registerComponent('tap-place', {
  init: function () {
    const ground = document.getElementById('ground')
    ground.addEventListener('click', event => {
      //stop song
      console.log(lastbutton);
      if (lastbutton == "one" || lastbutton =="two") {
        eggparent.components.sound.stopSound();
      }
      isRunning = true;
      //playRun
      Egg.components.sound.playSound();
      // Create new entity for the new object
      const newElement = document.createElement('a-entity')
      // The raycaster gives a location of the touch in the scene
      //Egg.setAttribute('position', touchPoint);
      const touchPoint = event.detail.intersection.point;
      let currentPos = eggparent.object3D.position;
      let distance = currentPos.distanceTo(touchPoint);
      let goal = 'property: position; to: ' + String(touchPoint.x) + " " + String(0) + " " + String(touchPoint.z) + "; dur: 1000*" + String(distance) + "; easing: linear";
      console.log(goal);
      //eggparent.setAttribute('animation', 'property: position; to: 0 0 -5');
      eggparent.object3D.lookAt(touchPoint);
      eggparent.setAttribute('animation', goal);
      Egg.setAttribute("animation-mixer", "clip: motion;")
      setTimeout(backToIdle, 1000);
      lastbutton = "ground";
    })
  }
})
function backToIdle() {
  Egg.setAttribute("animation-mixer", "clip: idle; crossFadeDuration: 0.3;")
  Egg.components.sound.stopSound();
  isRunning=false;
}
function myFunction(clicked_id) {
  let x = document.getElementById("myBtn");
  x.tex = "pause";
  //x.disabled = true;
  //Egg.setAttribute("visible", false);
  console.log(this.id);
  if (clicked_id == "myBtn") {
    playing = !playing;
    if (playing) {
      document.querySelector('#video').play();
    }
    else {
      document.querySelector('#video').pause();
    }
  }
  if (clicked_id == "btn1") {
    play01(clicked_id);
  }
  if (clicked_id == "btn2") {
    play02(clicked_id);
  }
}

function play01(clicked_id) {
  lastbutton = "one";
  Egg.setAttribute("animation-mixer", "clip: custom1; crossFadeDuration: 0.3; timeScale: 0.8");
  eggparent.components.sound.playSound();
  let object = Egg.getObject3D('mesh');

  ToonBody.map = tex;
  ToonBody.skinning = true;
  object.children[0].material = ToonBody;
  object.children[0].receiveShadow = false;
  console.log(object);
  let cap = object.getObjectByName("Cap", true);
  cap.material = ToonCap;
  /*
  object.traverse(function(child) {

    if (child instanceof THREE.Mesh)
            {
              let ToonBody = new THREE.MeshToonBodyerial();
              ToonBody.map = tex;
              ToonBody.skinning = true;
              child.material = ToonBody;
              //child.material.map=tex;
            }
    });
    */
}

