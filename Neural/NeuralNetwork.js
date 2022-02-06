class NeuralNetwork{

    constructor(){
        
    }

    CreateModel(){
        let model = tf.sequential();

        let hidden = tf.layers.dense({
            units: 25,
            inputShape: [5],
            activation: "linear"
        });

        let output = tf.layers.dense({
            units: 4,
            activation: "linear"
        });

        model.add(hidden);
        model.add(output);

        model.compile({
            optimizer: tf.train.adam(0.01),
            loss: tf.losses.meanSquaredError
        });

        this.model = model;
    }

    SuggestDirection(oLeft, oUp, oRight, oDown, angle){     //Angle is normalized
        let result;
        
        tf.tidy( () => {
            let data = tf.tensor2d([[oLeft, oUp, oRight, oDown, angle]]);

            result = this.model.predict(data).dataSync();
        });

        return result;
    }

    TrainModel(desiredLoss){
        let config = {
            shuffle: false,
            epochs: 1000
        }
        
        let trainingScenarios = tf.tensor2d([
            //survival
            [1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0.5],
            [0, 0, 1, 0, 1],
            [0, 0, 0, 1, -0.5],
            //food
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0.5],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 0, -0.5],

            [0, 1, 1, 1, 0],
            [1, 0, 1, 1, 0.5],
            [1, 1, 0, 1, 1],
            [1, 1, 1, 0, -0.5]
        ]);

        let correctAnswers = tf.tensor2d([
            //survival
            [0, 1, 1, 1],
            [1, 0, 1, 1],
            [1, 1, 0, 1],
            [1, 1, 1, 0],
            //food
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],

            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ])

            this.model.fit(trainingScenarios,correctAnswers,config).then(resp => {
                //console.log(resp.history.loss[0]);
                trainingScenarios.dispose();
                correctAnswers.dispose();

                if(resp.history.loss[0] <= desiredLoss){
                    console.log("Training completed");
                    return;
                }else{
                    this.TrainModel(desiredLoss);
                }

            });  
    }

}