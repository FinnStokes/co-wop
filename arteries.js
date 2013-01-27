cowop.Junction = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, width, height, image) {
        enchant.Sprite.call(this, width, height);
        this.image = image;
        this.frame = 0;
        this.x = x;
        this.y = y;
        this.flow  = false;
        this.right = false;
        this.leftChild;
        this.rightChild;
        
        this.addEventListener('touchstart',this.toggleRight.bind(this));
    },
    toggleRight: function() {
	this.right = !this.right;
	this.update();
    },
    update: function() {
	if(this.right){
	    this.rightChild.flow = this.flow;
	    this.leftChild.flow = false;
	    
	    if(this.flow){
		this.frame = [3];
	    }else{
		this.frame = [1];
	    }
	}else{
	    this.rightChild.flow = false;
	    this.leftChild.flow = this.flow;
	    
	    if(this.flow){
		this.frame = [2];
	    }else{
		this.frame = [0];
	    }
	}
	this.leftChild.update();
	this.rightChild.update();
    },
    supply: function(volume) {
        if(this.right) {
            this.rightChild.supply(volume)
        } else {
            this.leftChild.supply(volume)
        }  
    },
})

cowop.Branch = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, width, height, image) {
        enchant.Sprite.call(this, width, height);
        this.image = image;
        this.frame = 1;
        this.x = x;
        this.y = y;
        this.flow  = false;
        this.children = new Array;
    },
    update: function() {
	for (var i=0; i < this.children.length; i++) {
            this.children[i].flow = this.flow;
            this.children[i].update();
        }
	if(this.flow){
	    this.frame = [0];
	} else {
	    this.frame = [1];
	}
    },
    supply: function(volume) {
	for (var i=0; i < this.children.length; i++) {
            this.children[i].supply(volume);
        }
    },
})

cowop.Organ = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, width, height, image, capacity, consumption) {
        enchant.Sprite.call(this, width, height);
        this.image = image;
        this.frame = 0;
        this.x = x;
        this.y = y;
        this.capacity = capacity;
        this.consumption = consumption;
        this.volume = capacity
        this.addEventListener(enchant.Event.ENTER_FRAME, function(e) {
            this.volume -= this.consumption * e.elapsed / 1000;
            if (this.volume <  0) {
                this.volume = 0;
            }
        });
    },
    update: function() {
        console.log("organ")
	if(this.flow){
	    this.frame = 0;
	}else{
	    this.frame = 1;
	}
    },
    supply: function(volume) {
        this.volume += volume
        if (this.volume > this.capacity) {
            this.volume = this.capacity;
        }
    },
    oxygenation: {
        get: function () {
            return this.volume / this.capacity;
        }
    },
})

cowop.Arteries = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, width, height, image, game, scene) {
        enchant.Sprite.call(this, width, height);
        this.image = image;
        this.frame = 0;
        this.x = x;
        this.y = y;
        scene.addChild(this);
        
        this.aorta = new cowop.Branch(x+219,y+76,133,41,game.assets["arteries_aorta.png"]);
        scene.addChild(this.aorta);
        
        this.leftBrachial = new cowop.Junction(x+340,y+93,31,30,game.assets["arteries_left_brachial.png"]);
        this.aorta.children.push(this.leftBrachial);
        scene.addChild(this.leftBrachial);
        this.leftArm = new cowop.Organ(x+223,y+119,117,33,game.assets["arteries_left_arm.png"]);
        this.leftBrachial.rightChild = this.leftArm;
        scene.addChild(this.leftArm);
        this.leftBrain = new cowop.Organ(x+371,y+109,20,5,game.assets["arteries_left_brain.png"]);
        this.leftBrachial.leftChild = this.leftBrain;
        scene.addChild(this.leftBrain);
        
        this.rightBrachial = new cowop.Junction(x+331,y+51,32,31,game.assets["arteries_right_brachial.png"]);
        this.aorta.children.push(this.rightBrachial);
        scene.addChild(this.rightBrachial);
        this.rightArm = new cowop.Organ(x+214,y+26,126,25,game.assets["arteries_right_arm.png"]);
        this.rightBrachial.leftChild = this.rightArm;
        scene.addChild(this.rightArm);
        this.rightBrain = new cowop.Organ(x+363,y+64,28,13,game.assets["arteries_right_brain.png"]);
        this.rightBrachial.rightChild = this.rightBrain;
        scene.addChild(this.rightBrain);
        
        this.leftIliac = new cowop.Junction(x+206,y+100,30,28,game.assets["arteries_left_iliac.png"]);
        this.aorta.children.push(this.leftIliac);
        scene.addChild(this.leftIliac);
        this.leftLeg = new cowop.Organ(x+22,y+118,184,27,game.assets["arteries_left_leg.png"]);
        this.leftIliac.rightChild = this.leftLeg;
        scene.addChild(this.leftLeg);
        this.stomach = new cowop.Organ(x+236,y+116,4,4,game.assets["arteries_stomach.png"]);
        this.leftIliac.leftChild = this.stomach;
        scene.addChild(this.stomach);
        
        this.rightIliac = new cowop.Junction(x+190,y+60,29,28,game.assets["arteries_right_iliac.png"]);
        this.aorta.children.push(this.rightIliac);
        scene.addChild(this.rightIliac);
        this.rightLeg = new cowop.Organ(x+18,y+52,172,18,game.assets["arteries_right_leg.png"]);
        this.rightIliac.rightChild = this.rightLeg;
        scene.addChild(this.rightLeg);
        this.bladder = new cowop.Organ(x,y,0,0);
        this.rightIliac.leftChild = this.bladder;
        scene.addChild(this.bladder);

        this.aorta.flow = true;
        this.aorta.update();
    },
    
    supply: function(volume) {
        this.aorta.suply(volume);
    },
})