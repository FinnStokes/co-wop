enchant();

window.onload = function() {
    var game = new Game(800, 600);
    game.fps = 30;
    game.preload('heart.png');
    
    var originX = 200, originY = 200;

    game.onload = function() {
        var scene = new Scene();
        var sprite = new Sprite(100, 100);
        sprite.image = game.assets['heart.png'];
        scene.addChild(sprite);
        game.pushScene(scene);
        
        var physicsWorld = new PhysicsWorld(0, 9.8)
        
        sprite.addEventListener('enterframe', function() {
            if (game.input.left) {
                this.x = -50; this.y = 0;
            } else if (game.input.right) {
                this.x = 50; this.y = 0;
            } else if (game.input.up) {
                this.x = 0; this.y = -50;
            } else if (game.input.down) {
                this.x = 0; this.y = 50;
            }
        });
        
        // BODIES
        var bodyDef = b2BodyDef();
        var fixtureDef = b2FixtureDef();
        var jointDef = b2RevoluteJointDef();
        var box;
        
        // Person
        bodyDef.type = b2Body.b2_dynamicBody;
        
        // Torso
        box = new b2PolygonShape();
        box.SetAsBox(.4, .7);
        fixtureDef.shape = box;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.4;
        fixtureDef.restitution = 0.1;
        bd.position.Set(originX, originY);
        var torso = physicsWorld.CreateBody(bodyDef);
        torso.CreateFixture(fixtureDef);
        
        // Arms
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.4;
        fixtureDef.restitution = 0.1;
        // Left
        box = new b2PolygonShape();
        box.SetAsBox(.4, .7);
        fixtureDef.shape = box;
        bodyDef.position.Set(originX, originY + 0.4);
        var leftArm = physicsWorld.CreateBody(bodyDef);
        leftArm.CreateFixture(fixtureDef);
        // Right
        box = new b2PolygonShape();
        box.SetAsBox(.4, .7);
        fixtureDef.shape = box;
        bodyDef.position.Set(originX, originY + 0.4);
        var rightArm = physicsWorld.CreateBody(bodyDef);
        rightArm.CreateFixture(fixtureDef);
        
        // Forearms
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.4;
        fixtureDef.restitution = 0.1;
        // Left
        box = new b2PolygonShape();
        box.SetAsBox(.4, .7);
        fixtureDef.shape = box;
        bodyDef.position.Set(originX, originY + 0.4);
        var leftForearm = physicsWorld.CreateBody(bodyDef);
        leftForearm.CreateFixture(fixtureDef);
        // Right
        box = new b2PolygonShape();
        box.SetAsBox(.4, .7);
        fixtureDef.shape = box;
        bodyDef.position.Set(originX, originY + 0.4);
        var rightForearm = physicsWorld.CreateBody(bodyDef);
        rightForearm.CreateFixture(fixtureDef);
        
        
        // JOINTS
    };
    
    game.start();
};
