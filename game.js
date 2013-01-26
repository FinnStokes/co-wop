enchant();

var world = new enchant.box2d.PhysicsWorld(0, 20);

window.onload = function() {
    var game = new Game(800, 600);
    game.fps = 30;
    game.preload('heart.png', 'head.png','torso.png',
        'left_foot.png', 'right_foot.png',
        'left_arm.png','right_arm.png',
        'left_forearm.png','right_forearm.png',
        'left_thigh.png','right_thigh.png',
        'left_calf.png','right_calf.png'
    );
    
    var originX = 200, originY = 100;

    game.onload = function() {
        var scene = new Scene();
        game.pushScene(scene);

        var heart = new cowop.Heart(150, 150, game.assets["heart.png"]);
        scene.addChild(heart);
        
        var floor = new PhyBoxSprite(1600, 128, enchant.box2d.STATIC_SPRITE, 1.0, 0.5, 0.3, true, 2, 3);
        floor.position = { x: 0, y: 600-15 };
        
        // Left Limbs
        var leftArm = new PhyBoxSprite(32, 81, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        leftArm.position = { x: originX - 26.5, y: originY + 146.5 };
        leftArm.image = game.assets["left_arm.png"];
        scene.addChild(leftArm);
        
        var leftForearm = new PhyBoxSprite(34, 103, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        leftForearm.position = { x: originX -27.5, y: originY + 217.5 };
        leftForearm.image = game.assets["left_forearm.png"];
        scene.addChild(leftForearm);
        
        var leftThigh = new PhyBoxSprite(39, 92, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        leftThigh.position = { x: originX - 17.5, y: originY + 296.5};
        leftThigh.image = game.assets["left_thigh.png"];
        scene.addChild(leftThigh);
        
        var leftCalf = new PhyBoxSprite(48, 87, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        leftCalf.position = { x: originX -17.5, y: originY + 356.5 };
        leftCalf.image = game.assets["left_calf.png"];
        scene.addChild(leftCalf);
        
        var leftFoot = new PhyBoxSprite(60, 40, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        leftFoot.position = { x: originX - 3.5, y: originY + 403 };
        leftFoot.image = game.assets["left_foot.png"];
        scene.addChild(leftFoot);
        
        // Torso
        var torso = new PhyBoxSprite(115, 220, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        torso.position = { x: originX, y: originY + 175 };
        torso.image = game.assets["torso.png"];
        scene.addChild(torso);
        
        // Head
        var head = new PhyCircleSprite(42.5, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        head.position = { x: originX, y: originY + 42.5 };
        head.image = game.assets["head.png"];
        scene.addChild(head);
        
        // Right Limbs
        var rightArm = new PhyBoxSprite(32, 81, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        rightArm.position = { x: originX - 26.5, y: originY + 146.5 };
        rightArm.image = game.assets["right_arm.png"];
        scene.addChild(rightArm);

        var rightForearm = new PhyBoxSprite(34, 103, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        rightForearm.position = { x: originX -27.5, y: originY + 217.5 };
        rightForearm.image = game.assets["right_forearm.png"];
        scene.addChild(rightForearm);

        var rightThigh = new PhyBoxSprite(39, 92, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        rightThigh.position = { x: originX - 17.5, y: originY + 296.5};
        rightThigh.image = game.assets["right_thigh.png"];
        scene.addChild(rightThigh);

        var rightCalf = new PhyBoxSprite(48, 87, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        rightCalf.position = { x: originX -17.5, y: originY + 356.5 };
        rightCalf.image = game.assets["right_calf.png"];
        scene.addChild(rightCalf);

        var rightFoot = new PhyBoxSprite(60, 40, enchant.box2d.DYNAMIC_SPRITE, .1, 0, 0.1, true, 1, 2);
        rightFoot.position = { x: originX - 3.5, y: originY + 403 };
        rightFoot.image = game.assets["right_foot.png"];
        scene.addChild(rightFoot);
        
        
        // JOINTS
        var neck = new PhyJoint(head, torso, originX + 3.5, originY + 72, -10, 10);
        
        var leftAnkle = new PhyJoint(leftCalf, leftFoot, originX - 21.5, originY + 388, -10, 70);
        var rightAnkle = new PhyJoint(rightCalf, rightFoot, originX - 21.5, originY + 388, -10, 70);
        
        var leftShoulder = new PhyJoint(leftArm, torso, originX - 27.5, originY + 115,
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
        
        var rightShoulder = new PhyJoint(rightArm, torso, originX - 27.5, originY + 115,
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
        
        var leftElbow = new PhyJoint(leftForearm, leftArm, originX - 27.5, originY + 176,
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
        
        var rightElbow = new PhyJoint(rightForearm, rightArm, originX - 27.5, originY + 176,
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
        
        var leftHip = new PhyJoint(leftThigh, torso, originX - 16.5, originY + 255,
          -30, 135, // lowerAngle, upperAngle
          100, 2 // maxMotorTorque, motorSpeed
        );
        var leftHipClockwise = true;
        keyPressListeners.push(function (key) {
            if (key == "v") {
                leftHipClockwise = !leftHipClockwise;
                if (leftHipClockwise) {
                    leftHip.m_joint.SetMotorSpeed(2)
                } else {
                    leftHip.m_joint.SetMotorSpeed(-2)
                }
            }
        });
        
        var rightHip = new PhyJoint(rightThigh, torso, originX - 16.5, originY + 255,
          -30, 135, // lowerAngle, upperAngle
          100, 2 // maxMotorTorque, motorSpeed
        );
        var rightHipClockwise = true;
        keyPressListeners.push(function (key) {
            if (key == "n") {
                rightHipClockwise = !rightHipClockwise;
                if (rightHipClockwise) {
                    rightHip.m_joint.SetMotorSpeed(2)
                } else {
                    rightHip.m_joint.SetMotorSpeed(-2)
                }
            }
        });
        
        var leftKnee = new PhyJoint(leftCalf, leftThigh, originX - 16.5, originY + 323,
          -150, 1, // lowerAngle, upperAngle
          100, 2 // maxMotorTorque, motorSpeed
        );
        var leftKneeExtend = true;
        keyPressListeners.push(function (key) {
            if (key == "b") {
                leftKneeExtend = !leftKneeExtend;
                if (leftKneeExtend) {
                    leftKnee.m_joint.SetMotorSpeed(2)
                } else {
                    leftKnee.m_joint.SetMotorSpeed(-2)
                }
            }
        });
        
        var rightKnee = new PhyJoint(rightCalf, rightThigh, originX - 16.5, originY + 323,
          -150, 1, // lowerAngle, upperAngle
          100, 2 // maxMotorTorque, motorSpeed
        );
        var rightKneeExtend = true;
        keyPressListeners.push(function (key) {
            if (key == "m") {
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
