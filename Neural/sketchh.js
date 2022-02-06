let snake;
let currentFood;
let neuralNetwork;
let zmija;


function setup() {
    createCanvas(800, 600);
    frameRate(60);
    zmija=1;
    
    textSize(35);
    textAlign(CENTER, CENTER);

    //setup neural network
    neuralNetwork = new NeuralNetwork(); 
    neuralNetwork.CreateModel();
    neuralNetwork.TrainModel(0.1092);

    // inicijaliziramo zmiju, konstruktor prima br 3 to je početni iznos, kolika će zmija biti nacrtana, od 3 kockice
    // inicijalizira hranu, br 20 je veličina, hrana će se pojaviti na random mjestu
    snake = new Snake(3);
    currentFood = new Food(20);

    button = createButton('Ponovno treniraj ako zapne');
    button.position(5, 600);
    button.mousePressed(() => {neuralNetwork.TrainModel(0.1092)});
}

function draw() {
    frameRate(60);
    clear();

    background(179,198,255);
    text("Rezultat: " + snake.snakeParts.length+ ", Zmija: "+zmija, 180, 30);

    currentFood.Draw();

    //change direction if needed
    let nextDir = GetNextDirection();
    console.log(nextDir);
     if(nextDir === -1) snake.ChangeDirection("left");
     if(nextDir === 0) snake.ChangeDirection("up");
     if(nextDir === 1) snake.ChangeDirection("right");
     if(nextDir === 2) snake.ChangeDirection("down");

    snake.Move();
     
     if(snake.CheckCollision(currentFood)){
         snake.Eat(currentFood);
         
     }

    snake.Draw();

    if(snake.CheckDeath()){
    zmija++;
    Reset();
    }

}

function GetNextDirection(){
    let neuralResult = neuralNetwork.SuggestDirection(+snake.DangerToLeft(), +snake.DangerToUp(), +snake.DangerToRight(), +snake.DangerToDown(), snake.GetNormalizedAngleToObject(currentFood));

    return indexOfMax(neuralResult);
}

function Reset(){
    snake = new Snake(3);
    currentFood = new Food();
}


function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex - 1;
}