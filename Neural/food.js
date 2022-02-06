class Food{
    constructor(size){
        this.size = 50;
        // 800 i 600 su veličine u canvasu u sketchu :
        this.maxX = 800/this.size;  
        this.maxY = 600/this.size;
        this.SetLocation();
    }

	Draw(){
        // fill postavlja boju koja se koristi za popunjavanje oblika npr rect, a rect crta kvadrat (x lokacija, y lokacija, širina, visina)
        fill(204, 0, 82);

        rect(this.x, this.y, this.size, this.size);
    }
    // fill i rect su ugrađene metode tako se zovu i ne može im se mijenjati ime
    // Food, size, Draw (nije ugrađena funkcija draw), setlocation mogu se mijenjati imena, to su naše metode
    SetLocation(){

        let randomX = int(random(this.maxX));
        let randomY = int(random(this.maxY));

        this.x = randomX * this.size;
        this.y = randomY * this.size;

    }
}