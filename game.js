enchant();

var world = new enchant.box2d.PhysicsWorld(0, 20);

window.onload = function() {
    var game = new Game(800, 600);
    game.fps = 30;
    game.preload('head.png','torso.png','left_arm.png','right_arm.png','left_forearm.png','right_forearm.png',
                 'left_thigh.png','right_thigh.png','left_calf.png','right_calf.png');
    
    var originX = 200, originY = 100;

    game.onload = function() {
        var scene = new Scene();
        game.pushScene(scene);

        var heart = new cowop.Heart();
        scene.addChild(heart);
        
        var floor = new PhyBoxSprite(1600, 128, enchant.box2d.STATIC_SPRITE, 1.0, 0.5, 0.3, true, 2, 3);
        floor.position = { x: 0, y: 600-15 };
        
        // Left Limbs
        var leftArm = new PhyBoxSprite(50, 100, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        leftArm.position = { x: originX, y: originY + 150 };
        leftArm.image = game.assets["left_arm.png"];
        scene.addChild(leftArm);
        
        var leftForearm = new PhyBoxSprite(50, 100, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        leftForearm.position = { x: originX, y: originY + 250 };
        leftForearm.image = game.assets["left_forearm.png"];
        scene.addChild(leftForearm);
        
        var leftThigh = new PhyBoxSprite(50, 100, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        leftThigh.position = { x: originX, y: originY + 270 };
        leftThigh.image = game.assets["left_thigh.png"];
        scene.addChild(leftThigh);
        
        var leftCalf = new PhyBoxSprite(50, 100, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        leftCalf.position = { x: originX, y: originY + 370 };
        leftCalf.image = game.assets["left_calf.png"];
        scene.addChild(leftCalf);
        
        // Head
        var head = new PhyCircleSprite(45, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        head.position = { x: originX, y: originY + 45 };
        head.image = game.assets["head.png"];
        scene.addChild(head);
        
        // Torso
        var torso = new PhyBoxSprite(130, 200, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        torso.position = { x: originX, y: originY + 190 };
        torso.image = game.assets["torso.png"];
        scene.addChild(torso);
        
        // Right Limbs
        var rightArm = new PhyBoxSprite(50, 100, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        rightArm.position = { x: originX, y: originY + 150 };
        rightArm.image = game.assets["right_arm.png"];
        scene.addChild(rightArm);

        var rightForearm = new PhyBoxSprite(50, 100, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        rightForearm.position = { x: originX, y: originY + 250 };
        rightForearm.image = game.assets["right_forearm.png"];
        scene.addChild(rightForearm);

        var rightThigh = new PhyBoxSprite(50, 100, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        rightThigh.position = { x: originX, y: originY + 270 };
        rightThigh.image = game.assets["right_thigh.png"];
        scene.addChild(rightThigh);

        var rightCalf = new PhyBoxSprite(50, 100, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        rightCalf.position = { x: originX, y: originY + 370 };
        rightCalf.image = game.assets["right_calf.png"];
        scene.addChild(rightCalf);
        
        
        // JOINTS
        var neck = new PhyJoint(head, torso, originX + 65, originY + 90, -10, 10);
        
        var leftShoulder = new PhyJoint(leftArm, torso, originX + 25, originY + 100,
          -1, 180, // lowerAngle, upperAngle
          100, 2 // maxMotorTorque, motorSpeed
        );
        var leftShoulderClockwise = true;
        keyPressListeners.push(function (key) {
            if (key == "q") {
                leftShoulderClockwise = !leftShoulderClockwise;
                if (leftShoulderClockwise) {
                    leftShoulder.m_joint.SetMotorSpeed(2)
                } else {
                    leftShoulder.m_joint.SetMotorSpeed(-2)
                }
            }
        });
        
        var rightShoulder = new PhyJoint(rightArm, torso, originX + 25, originY + 100,
          -1, 180, // lowerAngle, upperAngle
          100, 2 // maxMotorTorque, motorSpeed
        );
        var rightShoulderClockwise = true;
        keyPressListeners.push(function (key) {
            if (key == "e") {
                rightShoulderClockwise = !rightShoulderClockwise;
                if (rightShoulderClockwise) {
                    rightShoulder.m_joint.SetMotorSpeed(2)
                } else {
                    rightShoulder.m_joint.SetMotorSpeed(-2)
                }
            }
        });
        
        var leftElbow = new PhyJoint(leftForearm, leftArm, originX + 25, originY + 200,
          -1, 135, // lowerAngle, upperAngle
          100, 2 // maxMotorTorque, motorSpeed
        );
        var leftElbowExtend = true;
        keyPressListeners.push(function (key) {
            if (key == "w") {
                leftElbowExtend = !leftElbowExtend;
                if (leftElbowExtend) {
                    leftElbow.m_joint.SetMotorSpeed(2)
                } else {
                    leftElbow.m_joint.SetMotorSpeed(-2)
                }
            }
        });
        
        var rightElbow = new PhyJoint(rightForearm, rightArm, originX + 25, originY + 200,
          -1, 135, // lowerAngle, upperAngle
          100, 2 // maxMotorTorque, motorSpeed
        );
        var rightElbowExtend = true;
        keyPressListeners.push(function (key) {
            if (key == "r") {
                rightElbowExtend = !rightElbowExtend;
                if (rightElbowExtend) {
                    rightElbow.m_joint.SetMotorSpeed(2)
                } else {
                    rightElbow.m_joint.SetMotorSpeed(-2)
                }
            }
        });
        
        var leftHip = new PhyJoint(leftThigh, torso, originX + 25, originY + 220,
          -30, 135, // lowerAngle, upperAngle
          100, 2 // maxMotorTorque, motorSpeed
        );
        var leftHipClockwise = true;
        keyPressListeners.push(function (key) {
            if (key == "u") {
                leftHipClockwise = !leftHipClockwise;
                if (leftHipClockwise) {
                    leftHip.m_joint.SetMotorSpeed(2)
                } else {
                    leftHip.m_joint.SetMotorSpeed(-2)
                }
            }
        });
        
        var rightHip = new PhyJoint(rightThigh, torso, originX + 25, originY + 220,
          -30, 135, // lowerAngle, upperAngle
          100, 2 // maxMotorTorque, motorSpeed
        );
        var rightHipClockwise = true;
        keyPressListeners.push(function (key) {
            if (key == "o") {
                rightHipClockwise = !rightHipClockwise;
                if (rightHipClockwise) {
                    rightHip.m_joint.SetMotorSpeed(2)
                } else {
                    rightHip.m_joint.SetMotorSpeed(-2)
                }
            }
        });
        
        var leftKnee = new PhyJoint(leftCalf, leftThigh, originX + 25, originY + 320,
          -150, 1, // lowerAngle, upperAngle
          100, 2 // maxMotorTorque, motorSpeed
        );
        var leftKneeExtend = true;
        keyPressListeners.push(function (key) {
            if (key == "i") {
                leftKneeExtend = !leftKneeExtend;
                if (leftKneeExtend) {
                    leftKnee.m_joint.SetMotorSpeed(2)
                } else {
                    leftKnee.m_joint.SetMotorSpeed(-2)
                }
            }
        });
        
        var rightKnee = new PhyJoint(rightCalf, rightThigh, originX + 25, originY + 320,
          -150, 1, // lowerAngle, upperAngle
          100, 2 // maxMotorTorque, motorSpeed
        );
        var rightKneeExtend = true;
        keyPressListeners.push(function (key) {
            if (key == "p") {
                rightKneeExtend = !rightKneeExtend;
                if (rightKneeExtend) {
                    rightKnee.m_joint.SetMotorSpeed(2)
                } else {
                    rightKnee.m_joint.SetMotorSpeed(-2)
                }
            }
        });
                
        scene.addEventListener("enterframe", function () {
            world.step(game.fps);
        });
    };
    
    game.start();
};
