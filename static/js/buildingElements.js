
var itemCount = 0; // for automatic element naming

///////////////////////////////// BuildingElement Class (Abstract) ///////////////////////////////
// Abstract Class that defines all common or default behaviors for building elements /////////////
//// Actual used classes will likely extend LinearElement or the simpler PointElement classes ////
//////////////////////////////////////////////////////////////////////////////////////////////////
class BuildingElement {

    constructor(pts, rot, lev) {
        this.points = pts;
        this.rotation = rot;
        this.level = lev;
        this.name = "BE_" + itemCount++;
        this.type = this.constructor.className;
        this.selected = false;
        this.color2D = this.constructor.color2D;
        this.color3D = this.constructor.color3D;
        this.selectcolor = this.constructor.selectcolor;
        this.opacity = this.constructor.opacity;

    };

    getHeights() {
        var entlevel = parseInt(this.level);
        var zlevthis = this.constructor.grid.levels[entlevel];
        var zlevnext = this.constructor.grid.levels[entlevel + 1];
        return [zlevthis, zlevnext];
    }



    //typical draw3D for an element comprised of a list of vertices. 
    draw3D() {
        var retlist = [];
        var ret = this.drawEdges3D();
        if (ret) {
            for (var i = 0; i < ret.length; i++) retlist.push(ret[i]);
        }

        ret = this.drawVertices3D();
        if (ret) {
            for (var i = 0; i < ret.length; i++) retlist.push(ret[i]);
        }
        return retlist;
    }


    drawEdges3D() {
        var ret = [];
        if (this.constructor.display3DEdges != true) return ret;

        var sh = new THREE.Shape();
        var s3x = this.constructor.grid.s3x; // the grid 3D scale in x and y
        var s3y = this.constructor.grid.s3y;
        var levelheights = this.getHeights();
        var zlevedif = levelheights[1] - levelheights[0];


        var curclr;
        if (this.selected) curclr = this.selectcolor; else curclr = this.color3D;


        // DRAW EDGES
        sh.moveTo(s3x * this.points[0].x, s3y * this.points[0].y);
        for (var i = 1; i < this.points.length; i++) {
            sh.lineTo(s3x * this.points[i].x, s3y * this.points[i].y);
        }
        sh.autoClose = true;
        var ext = {
            steps: 1,
            depth: zlevedif,
            bevelEnabled: false
        }
        var geo = new THREE.ExtrudeGeometry(sh, ext);
        geo.translate(0, 0, levelheights[0]);

        var m = new THREE.MeshBasicMaterial({
            color: new THREE.Color(curclr),
            opacity: this.opacity,
            transparent: (this.opacity > 0),
        });
        var me = new THREE.Mesh(geo, m);
        if (me) {
            ret.push(me);
        }
        return ret;

    }

    drawVertices3D() {

        var ret = [];
        if (this.constructor.display3DVertices != true) return ret;

        var curclr;

        var levelheights = this.getHeights();
        var zlevedif = levelheights[1] - levelheights[0];
        if (this.selected) curclr = this.selectcolor; else curclr = this.color3D;

        // DRAW VERTICES


        if (_BEModels[this.constructor.className]) {
            for (var i = 0; i < this.points.length; i++) {
                var myModel = _BEModels[this.constructor.className].clone();

                myModel.scale.set(1, 1, 1);
                myModel.rotation.x = Math.PI / 2;
                myModel.rotation.y = -(Math.PI / 2) * this.rotation;
                var levelheights = this.getHeights();
                myModel.position.set(this.constructor.grid.s3x * this.points[i].x, this.constructor.grid.s3y * this.points[i].y, levelheights[0]);
            }
            ret.push(myModel);

        }
        else {
            for (var i = 0; i < this.points.length; i++) {
                var g2 = new THREE.SphereGeometry(1, 1, 1);
                var m2 = new THREE.MeshBasicMaterial({ color: new THREE.Color(curclr) });
                var me2 = new THREE.Mesh(g2, m2);
                me2.position.set(this.constructor.grid.s3x * this.points[i].x, this.constructor.grid.s3y * this.points[i].y, levelheights[0]);
                ret.push(me2);
            }
        }

        /*
        //  debugging
        var g2 = new THREE.SphereGeometry(10, 10, 10);
        var m2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var me2 = new THREE.Mesh(g2, m2);
        me2.position.set(s3x * this.points[0].x, s3y * this.points[0].y, 0);
        */



        return ret;
    };



    draw2D() { // instance method draw2D calls the CLASS method with the needed information
        for (var i = 0; i < this.points.length; i++) {
            var pixp1 = this.constructor.grid.indToPix(this.points[i]);
            //console.log("pixp1: " + pixp1.x + " " + pixp1.y);
            push();
            translate(pixp1.x, pixp1.y)
            rotate(PI / 2.0 * this.rotation);
            translate(-pixp1.x, -pixp1.y);

            this.drawVertex2D(pixp1);
            pop(); // need this
            if (i > 0) {
                var pixp0 = this.constructor.grid.indToPix(this.points[i - 1]);
                this.drawEdge2D(pixp1, pixp0)
            }
        }
    };

    checkSelect2D(mouseind) {
    };

    // we can specialize the vertex  drawing for subclasses. YOU WILL TYPICALLY OVERRIDE THIS FOR YOUR CLASSES
    drawVertex2D(pixp1) {
        // your draw behavior here. translation has been set so draw at (0,0)
        if (this.selected) stroke(this.selectcolor); else stroke(this.color2D);
        strokeWeight(10);

        // draw functionality - local coordinates point is now 0,0

        point(pixp1.x, pixp1.y);

    }

    // we can specialize the edge drawing for subclasses. YOU WILL TYPICALLY OVERRIDE THIS FOR YOUR CLASSES
    drawEdge2D(p1, p2, selected) {
        if (this.selected) stroke(this.selectcolor); else stroke(this.color2D);
        strokeWeight(5);
        line(p1.x, p1.y, p2.x, p2.y);
    }

}

BuildingElement.addElement = function (pointList, rotation) {
    _BEList.push(new this(pointList, rotation, _currentLevel));
    return true;
}



BuildingElement.color3D = "#aaaaaa";
BuildingElement.color2D = "#aaaaaa";
BuildingElement.selectcolor = "#ff0000";
BuildingElement.opacity = 0.75;
BuildingElement.display3DEdges = true;
BuildingElement.display3DVertices = true;
BuildingElement.setupModels = function () { console.log("BuildingElement.setupModels ") };




/////////////////////////////////////// PointElement Class (Abstract) //////////////////////////
/////////////  Classes that behave like single (rotatable) points should extend this class /////
////////////////////////////////////////////////////////////////////////////////////////////////

class PointElement extends BuildingElement {
    checkSelect2D(mouseind) {
        if (mouseind.x == this.points[0].x && mouseind.y == this.points[0].y) {
            this.selected = !this.selected;
            return true;
        }
    };
}




// Abstract FurnitureElement class exists only to have a different furntitureGrid attached. It can be removed 
// and FurnitureElement can inherit from PointElement
class FurnitureElement extends PointElement {
    checkSelect2D(mouseind) {
        if (mouseind.x == this.points[0].x && mouseind.y == this.points[0].y) {
            this.selected = !this.selected;
            return true;
        }
    };

}

FurnitureElement.setupModels = function () {
    var modelStr = this.className;
    var mtl = new THREE.MTLLoader().load("/static/assets/model/" + modelStr + ".mtl", (material) => {
        var obj = new THREE.OBJLoader();
        material.preload();
        obj.setMaterials(material);
        obj.load("/static/assets/model/" + modelStr + ".obj", (object) => {
            //CHAIR = object.clone();
            object.scale.set(10, 10, 10);
            _BEModels[this.className] = object.clone();
        });
    });
};


///////////////////////////////// LinearElement Class (Abstract) ///////////////////////////////
// Classes that behave like lines and polylines with 2 or more point should extend this class ///
////////////////////////////////////////////////////////////////////////////////////////////////

function pointInLine(p0, p1, vpm) {
    //vector math - determines whether mouse is on line and between points (don't worry about it)
    let vp0 = createVector(p0.x, p0.y);
    let vp1 = createVector(p1.x, p1.y);
    let v0m = p5.Vector.sub(vp0, vpm);
    let v1m = p5.Vector.sub(vp1, vpm);
    let v10 = p5.Vector.sub(vp1, vp0);
    let crossp = p5.Vector.cross(v0m, v1m);
    if (crossp.mag() > .01) { return false; }
    v0m.normalize(); v1m.normalize(); v10.normalize();
    let val0 = v0m.dot(v10);
    let val1 = v1m.dot(v10);
    if (val0 <= 0 && val1 >= 0) {
        this.selected = !this.selected;
        return true;
    }
    return false;
}

class LinearElement extends BuildingElement {
    checkSelect2D(mouseind) {
        let vpm = createVector(mouseind.x, mouseind.y);
        for (var i = 0; i < this.points.length - 1; i++) {
            if (pointInLine(this.points[i], this.points[i + 1], vpm)) {
                this.selected = true; return true;
            }
        }
        return false;
    };
}

LinearElement.addElement = function (pointList, rotation) {

    if (pointList.length == 2) {
        _BEList.push(new this(pointList, rotation, _currentLevel));
        return true;
    }
}


///////////////////// PLineElement abstract class ////////////////

class PLineElement extends LinearElement {

}


PLineElement.addElement = function (pointList, rotation) {
    var numpts = pointList.length;
    if (numpts < 2) return false;
    var firstpt = pointList[0];
    var lastpt = pointList[numpts - 1];
    if (firstpt.x == lastpt.x && firstpt.y == lastpt.y) {
        _BEList.push(new this(pointList, rotation, _currentLevel));
        return true;
    }
}
