
/* 
//////////////////////////////////  TO USE: !!!!!!!!!!!!!! //////////////
- Copy and paste a copy of MyClass below into userElements.js
- replace all MyClass with your class name - no spaces!
- select a superclass:
    - PointElement: an object defined by two points
    - LinearElement: an object defined by two points
    - PlineElement: an object defined by a closed path (end point = start point)
    - FurnitureElement: an object like a POintElement but on the FurnitureElement grid
- change, or delete / comment out any functions you aren't changing - the program will use the defaults from the superclasses.

 */

// NOTE: in Visual Studio Code Alt-Shift-A will comment / uncomment a block of code.

/////////////////////////////////////////// MyClass Class /////////////////////////////////////////////////

// Change LinearElement to one of: [PointElement, LinearElement, PLineElement, FurnitureElement]
class MyClass extends LinearElement {

    // to specialize the edge drawing for MyClass. Overwrite or comment out / delete
    drawVertex2D(pixp1) {
        // to specialize the edge drawing for MyClass. Overwrite or comment out / delete
        if (this.selected) stroke(this.selectcolor); else stroke(this.color2D);
        strokeWeight(10);
        point(pixp1.x, pixp1.y); // you might want to change this
    }

    // to specialize the edge drawing for MyClass. Overwrite or comment out / delete
    drawEdge2D(p1, p2, selected) {
        if (this.selected) stroke(this.selectcolor); else stroke(this.color2D);
        strokeWeight(5);
        line(p1.x, p1.y, p2.x, p2.y); // you might want to change this
    }

    /*  
    drawVertices3D() {
        // Copy and modify BuildingElement:drawEdges3D or comment out / delete.
        // Returns an array [] of THREE.Meshes
    }
    */

    /*
    drawEdges3D() {
        // Copy and modify BuildingElement:drawEdges3D or comment out / delete.
        // Returns an array [] of THREE.Meshes
    }
    */

    // This will change the height behavior of extruded edges. By default they go
    // from the object's level (defined in the grid) to the level+1.
    // return an array of bottom and top heights in 3D units.
    getHeights() {
        var entlevel = parseInt(this.level);
        var zlevthis = this.constructor.grid.levels[entlevel];
        var zlevnext = this.constructor.grid.levels[entlevel + 1];
        return [zlevthis, zlevnext];
    }

} // End of MyClass

//!!! YOU MUST HAVE THIS className unique and defined for your class. You must also add your className to the _BEClasses list in userDraw
MyClass.className = "MyClass";    // non-abstract classes MUST have a unique className

// delete  or comment out any that you are not changing; so to take the defaults.
MyClass.color3D = "#aaaaaa";
MyClass.color2D = "#aaaaaa";
MyClass.selectcolor = "#ff0000";
MyClass.opacity = 0.75;
MyClass.display3DEdges = true;
MyClass.display3DVertices = true;

