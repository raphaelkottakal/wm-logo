(function() {
	var bulb = function(x, y, z, color, spriteColor) {
    var canvas = document.createElement('canvas');
    var size = 256;
    // document.body.appendChild(canvas);
    canvas.width = size;
    canvas.height = size;
    var context = canvas.getContext('2d');
		var grd = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
		grd.addColorStop(0, spriteColor);
		grd.addColorStop(1, "black");
		context.fillStyle = grd;
		context.fillRect(0, 0, size, size);

		this.group = new THREE.Group();
		var light = new THREE.PointLight(color, 1);

		var amap = new THREE.Texture(canvas);
    amap.needsUpdate = true;

    var mat = new THREE.SpriteMaterial({
				map: amap,
				transparent: true,
				opacity: 0.5,
				blending: THREE.AdditiveBlending,
        color: 0xffffff
    });

		var geometry = new THREE.SphereBufferGeometry(2, 16, 16);
		var material = new THREE.MeshLambertMaterial({
			color: color,
      emissive: color,
			wireframe: false,
			emissiveIntensity: 1,
			transparent: true,
      opacity: 0.75
		});
		var mesh = new THREE.Mesh(geometry, material);
		var sp = new THREE.Sprite(mat);
		sp.scale.set(40, 40, 1);
		light.position.set(x, y, z);
		sp.position.set(x, y, z);
		mesh.position.set(x, y, z);
		this.group.add(light);
		this.group.add(mesh);
		this.group.add(sp);
	}

	var domElement = document.querySelector('#canvas');
	var mouseDown = false;
	var mouseX = null;
	var mousePrevX = null;
	var mouseY = null;
	var mousePrevY = null;
	var zOffset = 2;

	var width = window.innerWidth;
	var height = window.innerHeight;
	var scene = new THREE.Scene();
	var camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
	// var camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
	camera.position.set(0, 0, 500);
	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( width, height );
	domElement.appendChild( renderer.domElement );

	// var controls = new THREE.OrbitControls( camera );

	var wGroup = new THREE.Group();


	var leftSkewGeometry = new THREE.BoxBufferGeometry(10, 100, 10);
	var leftSkewShortGeometry = new THREE.BoxBufferGeometry(10, 75, 10);
	var rightSkewGeometry = new THREE.BoxBufferGeometry(10, 100, 10);
	var rightSkewShortGeometry = new THREE.BoxBufferGeometry(10, 75, 10);
	var normalGeometry = new THREE.BoxBufferGeometry(10, 100, 10);
	var testGeometry = new THREE.BoxBufferGeometry(10, 10, 10);
	// var material1 = new THREE.MeshLambertMaterial({ color: 'hsl(210, 100%, 45%)', wireframe: false });
	// var material2 = new THREE.MeshLambertMaterial({ color: 'hsl(210, 100%, 40%)', wireframe: false });
	// var material3 = new THREE.MeshLambertMaterial({ color: 'hsl(210, 100%, 35%)', wireframe: false });
  // var material4 = new THREE.MeshLambertMaterial({ color: 'hsl(210, 100%, 30%)', wireframe: false });
  var material1 = new THREE.MeshLambertMaterial({ color: 'hsl(0, 0%, 100%)', wireframe: false });
	var material2 = new THREE.MeshLambertMaterial({ color: 'hsl(0, 0%, 85%)', wireframe: false });
	var material3 = new THREE.MeshLambertMaterial({ color: 'hsl(0, 0%, 70%)', wireframe: false });
	var material4 = new THREE.MeshLambertMaterial({ color: 'hsl(0, 0%, 55%)', wireframe: false });
	// var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
	var skewLeftMatrix = new THREE.Matrix4();
	skewLeftMatrix.set(
		1,-0.35,0,0,
		0,1,0,0,
		0,0,1,0,
		0,0,0,1
	);

	var skewRightMatrix = new THREE.Matrix4();
	skewRightMatrix.set(
		1,0.35,0,0,
		0,1,0,0,
		0,0,1,0,
		0,0,0,1
	);

	leftSkewGeometry.applyMatrix(skewLeftMatrix);
	leftSkewShortGeometry.applyMatrix(skewLeftMatrix);
	rightSkewGeometry.applyMatrix(skewRightMatrix);
	rightSkewShortGeometry.applyMatrix(skewRightMatrix);
	
	rightSkewGeometry.computeBoundingBox();
	rightSkewShortGeometry.computeBoundingBox();
	normalGeometry.computeBoundingBox();
	var topOffset = -(rightSkewGeometry.parameters.height - rightSkewShortGeometry.parameters.height) / 2;
	var centerOffset = rightSkewShortGeometry.boundingBox.max.x - rightSkewShortGeometry.parameters.width / 2;
	var mCenterOffset = rightSkewShortGeometry.parameters.width * 1.3 + rightSkewShortGeometry.boundingBox.max.x - rightSkewShortGeometry.parameters.width / 2;
	var wEndOffset = centerOffset * 2 + rightSkewShortGeometry.parameters.width * 1.75;
	var w1 = new THREE.Mesh(leftSkewGeometry, material1);
	w1.position.set(-wEndOffset, 0, -35 * zOffset);
	var w2 = new THREE.Mesh(rightSkewShortGeometry, material2);
	w2.position.set(-centerOffset, topOffset, -5 * zOffset);
	var w3 = new THREE.Mesh(leftSkewShortGeometry, material3);
	w3.position.set(centerOffset, topOffset, 5 * zOffset);
	var w4 = new THREE.Mesh(rightSkewGeometry, material4);
	w4.position.set(wEndOffset, 0, 35 * zOffset);

	var m1 = new THREE.Mesh(normalGeometry, material4);
	m1.position.set(-mCenterOffset, 0, -25 * zOffset);
	var m2 = new THREE.Mesh(leftSkewShortGeometry, material3);
	m2.position.set(-centerOffset, -topOffset, -15 * zOffset);
	var m3 = new THREE.Mesh(rightSkewShortGeometry, material2);
	m3.position.set(centerOffset, -topOffset, 15 * zOffset);
	var m4 = new THREE.Mesh(normalGeometry, material1);
	m4.position.set(mCenterOffset, 0, 25 * zOffset);


	wGroup.add(w1);
	wGroup.add(w2);
	wGroup.add(w3);
	wGroup.add(w4);
	wGroup.add(m1);
	wGroup.add(m2);
	wGroup.add(m3);
	wGroup.add(m4);
	scene.add(wGroup);
	wGroup.scale.set(1.5,1.5,1.5);
	// wGroup.rotation.y = Math.PI / 2;

	var newBulbR = new bulb(-100, 50, 100, 0xff0000, 'red');
	// newBulbR.group.position.set(0, 0, 100);
	var newBulbG = new bulb(-100, 50, 100, 0x00ff00, 'green');
	newBulbG.group.position.set(0, 0, 8);
	var newBulbB = new bulb(-100, 50, 100, 0x0000ff, 'blue');
	newBulbB.group.position.set(0, 0, 16);
	scene.add(newBulbR.group);
	scene.add(newBulbG.group);
	scene.add(newBulbB.group);
// ambientLight(v1, [v2], [v3], [a])
	const baseLight = new THREE.AmbientLight(0xffffff, 0.25);
	// baseLight.position.set(0, 0, 300);
	scene.add(baseLight);

	var animate = function(time) {
		requestAnimationFrame(animate);
		TWEEN.update();
		newBulbR.group.rotation.y += 0.025;
		newBulbR.group.rotation.x += 0.01;
		newBulbG.group.rotation.y += 0.02;
		newBulbG.group.rotation.x += 0.01;
		newBulbB.group.rotation.y += 0.03;
		newBulbB.group.rotation.x += 0.01;
		renderer.render(scene, camera);
	};

	animate();

	var resetTween = new TWEEN.Tween(wGroup.rotation).easing(TWEEN.Easing.Quadratic.Out).to({ y: 0, x: 0 }, 1000);
	var handleMouseMove = function(event) {
		event.preventDefault();
		if (mouseDown) {
			if (event.touches) {
				mouseX = event.touches[0].clientX;
				mouseY = event.touches[0].clientY;
			} else {
				mouseX = event.clientX;
				mouseY = event.clientY;
			}
			var mouseDiffX = mouseX - mousePrevX;
			var mouseDiffY = mouseY - mousePrevY;
			wGroup.rotation.y +=  mouseDiffX * 0.01;
			wGroup.rotation.x +=  mouseDiffY * 0.01;
			mousePrevX = mouseX;
			mousePrevY = mouseY;
		}
	}
	var handleMouseDown = function(event) {
		event.preventDefault();
		mouseDown = true;
		if (event.touches) {
			mousePrevX = event.touches[0].clientX;
			mousePrevY = event.touches[0].clientY;
		} else {
			mousePrevX = event.clientX;
			mousePrevY = event.clientY;
		}
		resetTween.stop();
	}

	var handleMouseUp = function(event) {
		resetTween.start();
		mouseDown = false;
		mouseX = null;
		mouseY = null;
		mousePrevX = null;
		mousePrevY = null;
	}

	var onWindowResize = function() {
		var width = window.innerWidth;
    camera.left = width / - 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = height / - 2;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, height );

	}
	domElement.addEventListener('mousemove', handleMouseMove, true);
	domElement.addEventListener('mousedown', handleMouseDown, true);
	domElement.addEventListener('mouseup', handleMouseUp, true);
	domElement.addEventListener('mouseout', handleMouseUp, true);
	
	domElement.addEventListener('touchmove', handleMouseMove, true);
	domElement.addEventListener('touchstart', handleMouseDown, true);
	domElement.addEventListener('touchend', handleMouseUp, true);
	domElement.addEventListener('touchcancel', handleMouseUp, true);

	window.addEventListener('resize', onWindowResize, true);
})();