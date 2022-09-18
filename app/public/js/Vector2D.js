class Vector2D {

    constructor(x, y){
        this.x = x;
        this.y = y;
        return this;
    }

    add(v){
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    static add(v1,v2){
        return { x : v1.x + v2.x , y : v1.y + v2.y };
    }

    sub(v){
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    static sub(v1,v2){
        return { x : v1.x - v2.x , y : v1.y - v2.y };
    }

    div(v){
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    static div(v1,v2){
        return { x : v1.x / v2.x , y : v1.y / v2.y };
    }

    mult(v){
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    static mult(v1,v2){
        return { x : v1.x * v2.x , y : v1.y * v2.y };
    }

    dot(v){
        this.x * v.x + (this.y * v.y);
        return this;
    }

    static dot(v1,v2){
        return (v1.x * v2.x) +  (v1.y * v2.y);
    }

    magSq(){
        return (this.x * this.x) + (this.y * this.y);
    }

    static magSq(v){
        return (v.x * v.x) + (v.y * v.y);
    }

    mag(){
        return Math.sqrt(this.magSq());
    }

    static mag(v){
        return Math.sqrt(Vector2D.magSq(v));
    }

    static scale(v,s){
        return { x : v.x * s , y : v.y * s }
    }

    static normalize(v){
        let mag = this.mag(v);

        return { x : v.x / mag, y : v.y / mag }
    }

    limit(l){
        if(this.magSq() > l * l){
            return this.scale(this.normalize(this), l);
        }   
    }

    static limit(v,l){

        if(this.magSq(v) > l * l){
            return this.scale(this.normalize(v), l);
        }

    }
}




class VMath{
    static rotate(vector,angle,origin){
        let x = vector.x - origin.x;
        let y = vector.y - origin.y;
        let cos = Math.cos(angle / (180 / Math.PI));
        let sin = Math.sin(angle / (180 / Math.PI));
        let xPrime = (x * cos) - (y * sin);
        let yPrime = (x * sin) + (y * cos);

        xPrime += origin.x;
        yPrime += origin.y;

        vector.x = xPrime;
        vector.y = yPrime;
    }

    static rotateS(vector,angle,origin){
        let x = vector.x;
        let y = vector.y;
        let cos = Math.cos(angle / (180 / Math.PI));
        let sin = Math.sin(angle / (180 / Math.PI));
        let xPrime = (x * cos) - (y * sin);
        let yPrime = (x * sin) + (y * cos);
        vector.x = xPrime;
        vector.y = yPrime;
    }

    static compare(x,y,epsilon = 0.001){
        return Math.abs(x - y) <= epsilon * Math.max(1,Math.max(Math.abs(x),Math.abs(y)));
    }

    static compareVector(v1,v2,epsilon = 0.001){
        return this.compare(v1.x,v2.x,epsilon) && this.compare(v1.y,v2.y,epsilon);
    }
}