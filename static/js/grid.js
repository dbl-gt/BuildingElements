class Grid {

constructor(ansx, ansy, anox, anoy, anmx, anmy) {
    this.sx = ansx; // scale (in pixels) of x and y - could be different
    this.sy = ansy;
    this.ox = anox; // offset (in pixels) of x and y 
    this.oy = anoy;
    this.mx = anmx; // count in x and y
    this.my = anmy;

    // setup3D just in case!
    this.s3x = 1;
    this.s3y = 1;
    this.s3z = 1;
    this.o3x = 0;
    this.o3y = 0;
    this.o3z = 0;
}

    setup3D(as3x, as3y, as3z, ao3x, ao3y, ao3z) {
        this.s3x = as3x;
        this.s3y = as3y;
        this.s3z = as3z;
        this.o3x = ao3x;
        this.o3y = ao3y;
        this.o3z = ao3z;
    }

    setLevels(someLevels) {
        this.levels = someLevels;
    }
    
    indTo3D(indvec) {
        var ret3D = createVector(indvec.x * this.s3x + this.o3x, indvec.y * this.s3y + this.o3y);
        return ret3D;
    }

    // some helper functions - changing index to pix locations and vice versa
    indToPix(indvec) {
        var retmousePix = createVector(indvec.x * this.sx + this.ox, indvec.y * this.sy + this.oy);
        return retmousePix;
    }

    pixToInd(vec) {
        var myx = round((vec.x - this.ox) / this.sx);
        var myy = round((vec.y - this.oy) / this.sy);
        var retInd = { "x": myx, "y": myy };
        //console.log(retmouse.x + ", " + retmouse.y);
        return retInd;
    }

    // rounds a pix location by converting pix to ind and then back to pix
    round(vec) {
        return this.indToPix(this.pixToInd(vec));
    }

    // draws the grid points
    draw() {
        for (var i = 0; i < this.mx; i++) {
            for (var j = 0; j < this.my; j++) {
                // basically indToPix
                point(i * this.sx + this.ox, j * this.sy + this.oy);
            }
        }
    };

    mouseInsideGrid() {
        var mouseInd = this.pixToInd({ "x": mouseX, "y": mouseY });
        var retval = !(mouseInd.x < 0 || mouseInd.y < 0 || mouseInd.x > this.mx || mouseInd.y > this.my);
        return retval;
    }

    orthoPoint(currenPoint, lastPoint) {
        /*     console.log(_orthoMode);
            if (_orthoMode) { */
        console.log("Here!")
        if (Math.abs(lastPoint.x - currenPoint.x) > Math.abs(lastPoint.y - currenPoint.y)) {
            currenPoint.y = lastPoint.y;
        }
        else {
            currenPoint.x = lastPoint.x;
        }
        return currenPoint;
    }

}