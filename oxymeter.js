
cowop.OxyMeter = enchant.Class.create(enchant.Sprite, {
    initialize: function(width, height, image, x, y) {
        enchant.Sprite.call(this, width, height);
        this.image = image;
        this.x = x;
        this.y = y;
        this.frame = 0;
    },
    update: function(percent) {
        this.frame = Math.floor((0.99-percent)*10)
    }
});
