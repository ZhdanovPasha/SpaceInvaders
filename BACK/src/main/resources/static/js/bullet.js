class Bullet{
	//position{x,y}, img={width, height, source}
	constructor( owner,img){
		console.log('bullet were created');
		this.owner = owner;
		if ( ship === null || this.owner.fraction === ship.fraction )
			this.position = {x:owner.obj.x + (owner.obj.w)/2-owner.bulletWidth/2,y:owner.obj.y };
		else
			this.position = {x:owner.obj.x + (owner.obj.w)/2-owner.bulletWidth/2,y:owner.obj.y+owner.obj.h };
		this.enabled = false;
		this.damage = owner.damage;
		this.img = img;
		this.dy = owner.bulletSpeed;
		this.w = img.width;
		this.h = img.height;
		this.obj = game.newImageObject({
			position: point(this.position.x, this.position.y),
			file: this.img.source,
			w: this.img.width, h: this.img.height
		});
	}
	move(){
		if (this.enabled) {
            if (ship.fraction === this.owner.fraction)
                this.obj.y -= this.dy;
            else
                this.obj.y += this.dy;
		}
	}
	moveTo(x,y) {
		if (this.enabled) {
            if ( ship.fraction === this.owner.fraction ) {
                this.obj.x = x;
                this.obj.y = y;
            } else {
                this.obj.x = game.getWH().w - (x + this.obj.w);
                this.obj.y = game.getWH().h - (y + this.obj.h);
            }
        }
	}
	shot() {
		if (!this.enabled) {
            if ( ship.fraction === this.owner.fraction ) {
                this.obj.x = this.owner.obj.x + (this.owner.obj.w)/2-this.owner.bulletWidth/2;
                this.obj.y = this.owner.obj.y - this.owner.bulletHeight;
                console.log(this.owner.obj.w);

            } else {
            	this.obj.x = this.owner.obj.x + (this.owner.obj.w)/2-this.owner.bulletWidth/2;
                this.obj.y = this.owner.obj.y + this.owner.obj.h;
                console.log(this.owner.obj.w);
			}
			this.enabled = true;
		}
	}
	checkHitting(shipp) {
		if (!this.enabled) return false;
		else return (this.obj.isStaticIntersect(shipp.obj.getStaticBox()))&& (shipp.fraction !== this.owner.fraction);
	}
	draw(){
		if (this.enabled){
            this.obj.draw();
        }
	}
}