cowop.Junction = enchant.Class.create(enchant.Sprite, {
    initialize: function(width, height, image) {
        enchant.Sprite.call(this, width, height);
        //this.image = image;
        this.frame = 0;
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
		this.sprite.frame = [3];
	    }else{
		this.sprite.frame = [1];
	    }
	}else{
	    this.rightChild.flow = false;
	    this.leftChild.flow = this.flow;
	    
	    if(this.flow){
		this.sprite.frame = [2];
	    }else{
		this.sprite.frame = [0];
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
    initialize: function(width, height, image) {
        enchant.Sprite.call(this, width, height);
        //this.image = image;
        this.frame = 0;
        this.flow  = false;
        this.children = new Array;
    },
    update: function() {
	for (var i=0; i < this.children.length; i++) {
            this.children[i].flow = this.flow;
            this.children[i].update();
        }
	if(this.flow){
	    this.sprite.frame = [1];
	} else {
	    this.sprite.frame = [0];
	}
    },
    supply: function(volume) {
	for (var i=0; i < this.children.length; i++) {
            this.children[i].supply(volume);
        }
    },
})

cowop.Organ = enchant.Class.create(enchant.Sprite, {
    initialize: function(width, height, image, capacity, consumption) {
        enchant.Sprite.call(this, width, height);
        //this.image = image;
        this.frame = 0;
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
    initialize: function(width, height, image) {
        enchant.Sprite.call(this, width, height);
        //this.image = image;
        this.frame = 0;
        
        this.aorta = cowop.Branch(30,30,null);
        
        this.leftBrachial = cowop.Junction(30,30,null);
        this.aorta.children.push(this.leftBrachial);
        this.leftArm = cowop.Organ(30,30,null);
        this.leftBrachial.leftChild = this.leftArm;
        this.leftBrain = cowop.Organ(30,30,null);
        this.leftBrachial.rightChild = this.leftBrain;
        
        this.rightBrachial = cowop.Junction(30,30,null);
        this.aorta.children.push(this.rightBrachial);
        this.rightArm = cowop.Organ(30,30,null);
        this.rightBrachial.rightChild = this.rightArm;
        this.rightBrain = cowop.Organ(30,30,null);
        this.rightBrachial.leftChild = this.rightBrain;
        
        this.leftIliac = cowop.Junction(30,30,null);
        this.aorta.children.push(this.leftIliac);
        this.leftLeg = cowop.Organ(30,30,null);
        this.leftIliac.leftChild = this.leftLeg;
        this.stomach = cowop.Organ(30,30,null);
        this.leftIliac.rightChild = this.stomach;
        
        this.rightIliac = cowop.Junction(30,30,null);
        this.aorta.children.push(this.rightIliac);
        this.rightLeg = cowop.Organ(30,30,null);
        this.rightIliac.rightChild = this.rightLeg;
        this.bladder = cowop.Organ(30,30,null);
        this.rightIliac.leftChild = this.bladder;
    },
    
    supply: function(volume) {
        this.aorta.suply(volume);
    },
})