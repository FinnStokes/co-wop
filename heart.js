var ATRIUM_VOLUME = 30
var VENTRICLE_VOLUME = 40
var ATRIUM_RATE = ATRIUM_VOLUME / 5000
var VENTRICLE_RATE = VENTRICLE_VOLUME / 3000
var HALF_LIFE = 125
var REFILL_FACTOR = Math.log(1/2)/HALF_LIFE

// Volume = max_volume*(1 - exp(refill_factor*time))

var cowop = {};

cowop.Heart = enchant.Class.create(enchant.Sprite, {
    initialize: function(width, height) {
        enchant.Sprite.call(this, width, height);
        this.apumping = true;
        this.vpumping = true;
        this.avol = 0;
        this.vvol = 0;
        this.pumpAtrium = function () {
            this.apumping = true;
        }
        this.pumpVentricle = function () {
            this.vpumping = true;
        }
        this.addEventListener(enchant.Event.ENTER_FRAME, function(e) {
            if (this.apumping) {
                if (this.avol > ATRIUM_RATE*e.elapsed) {
                    this.vvol += ATRIUM_RATE*e.elapsed;
                    this.avol -= ATRIUM_RATE*e.elapsed;
                } else {
                    this.vvol += this.avol;
                    this.avol = 0;
                    this.apumping = false;
                }
            }
            if (this.vpumping) {
                if (this.vvol > VENTRICLE_RATE*e.elapsed) {
                    this.vvol -= VENTRICLE_RATE*e.elapsed;
                } else {
                    this.vvol = 0;
                    this.vpumping = false;
                }
            }
            this.avol -= REFILL_FACTOR*e.elapsed * (ATRIUM_VOLUME - this.avol);
            if (!this.vpumping && this.vvol/VENTRICLE_VOLUME < this.avol/ATRIUM_VOLUME) {
                this.vvol -= REFILL_FACTOR*e.elapsed * (VENTRICLE_VOLUME - this.avol);
            }
            console.log(this.avol, this.vvol)
        });
    },
});