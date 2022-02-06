class SnakePart{
	
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		
		this.size = size;
	}
	
	Draw(){
		// strokeWeight postavlja šitinu obruba, a stroke boju
		// sve funkcije unutar metode Draw su ugrađene, ne mogu se mijenjati imena
		fill(255,255,255);
		// strokeWeight(4);
        stroke(0);

        rect(this.x, this.y, this.size, this.size);
	}
	
	Move(x, y, snakeHead){
		
		this.x = snakeHead.x + x;
		this.y = snakeHead.y + y;
	}
	
}