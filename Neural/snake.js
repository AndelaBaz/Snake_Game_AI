class Snake {

	constructor(startAmount) {
		this.snakeParts = [];
		this.snakePartSize = 50;
        this.direction = "down";

		//Initialize snake
		for (let i = 0; i < startAmount; i++) {
			this.snakeParts[i] = new SnakePart(this.snakePartSize * i, 0, this.snakePartSize);
        }
	}

	Draw() {
		for (let i = 0; i < this.snakeParts.length; i++) {
			this.snakeParts[i].Draw();
		}
	}

    Move() {
        let x = 0;
		let y = 0;
		
		switch (this.direction) {
			case "right":
				x+=this.snakePartSize;
				break;
			case "left":
				x-=this.snakePartSize;
				break;

			case "up":
				y-=this.snakePartSize;
				break;
				
			case "down":
				y+=this.snakePartSize;
				break;
		}
		
		let snakeEnd = this.snakeParts[0];
		
		snakeEnd.Move(x, y, this.snakeParts[this.snakeParts.length - 1]);
		
		this.snakeParts.push(snakeEnd);
		this.snakeParts.shift();
		
	}

	ChangeDirection(newDirection) {

        if(newDirection == "right" && this.direction == "left"){
            return;
        }else if(newDirection == "left" && this.direction == "right"){
            return
        }else if(newDirection == "up" && this.direction == "down"){
            return;
        }else if(newDirection == "down" && this.direction == "up"){
            return;
        }

        this.direction = newDirection;
    }
    
    CheckCollision(object){
        return this.snakeParts[this.snakeParts.length-1].x == object.x && this.snakeParts[this.snakeParts.length-1].y == object.y;
    }

    Eat(food){
        let validFoodPosition;

        do{
            validFoodPosition = true;
            food.SetLocation(this.snakeParts);

            for(let i = 0; i < this.snakeParts.length; i++){
                if(this.snakeParts[i].x == food.x && this.snakeParts[i].y == food.y){
                    validFoodPosition = false;
                    break;
                }
            }
        }while(!validFoodPosition)

        this.snakeParts.unshift(new SnakePart(this.snakeParts[0].x, this.snakeParts[0].y, this.snakePartSize));
    }

    CheckDeath(){
        let result = false;

        for(let i = 0; i < this.snakeParts.length-1; i++){  //skip Snake's head
            if(this.CheckCollision(this.snakeParts[i])){
                result = true;
            }
        }

        let snakeHead = this.snakeParts[this.snakeParts.length-1];

        if(snakeHead.x < 0 || snakeHead.x >= 800 || snakeHead.y < 0 || snakeHead.y >= 600){
            result = true;
        }

        return result;
    }

    DangerToLeft(){
        let result = false;
        let snakeHead = this.snakeParts[this.snakeParts.length-1];

        if(snakeHead.x - this.snakePartSize < 0){
            return true;
        }

        for(let i = 0; i < this.snakeParts.length-1; i++){  //skip Snake's head
            if(this.CheckCollision({x: this.snakeParts[i].x + this.snakePartSize, y: this.snakeParts[i].y})){
                return true;
        }
    }

        return result;
    }

    DangerToUp(){
        let result = false;
        let snakeHead = this.snakeParts[this.snakeParts.length-1];
        
        if(snakeHead.y - this.snakePartSize < 0){
            return true;
        }

        for(let i = 0; i < this.snakeParts.length-1; i++){  //skip Snake's head
            if(this.CheckCollision({x: this.snakeParts[i].x, y: this.snakeParts[i].y + this.snakePartSize})){
                return true;
            }
        }

        return result;
    }

    DangerToRight(){
        let result = false;
        let snakeHead = this.snakeParts[this.snakeParts.length-1];
        
        if(snakeHead.x + this.snakePartSize >= 800){
            return true;
        }

        for(let i = 0; i < this.snakeParts.length-1; i++){  //skip Snake's head
            if(this.CheckCollision({x: this.snakeParts[i].x - this.snakePartSize, y: this.snakeParts[i].y})){
                return true;
            }
        }

        return result;
    }

    DangerToDown(){
        let result = false;
        let snakeHead = this.snakeParts[this.snakeParts.length-1];
        
        if(snakeHead.y + this.snakePartSize >= 600){
            return true;
        }

        for(let i = 0; i < this.snakeParts.length-1; i++){  //skip Snake's head
            if(this.CheckCollision({x: this.snakeParts[i].x, y: this.snakeParts[i].y - this.snakePartSize})){
                return true;
            }
        }

        return result;
    }

    GetNormalizedAngleToObject(object){
        let snakeHead = this.snakeParts[this.snakeParts.length-1];

        let deltaX = snakeHead.x - object.x;
        let deltaY = snakeHead.y - object.y;
    
        let angle = Math.atan2(deltaY, deltaX) * 180 / 3.14;

        return Math.round((Math.atan2(deltaY, deltaX) * 180 / 3.14 / 180)*100)/100;
    }


}