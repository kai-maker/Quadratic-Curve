const point1 = document.getElementById("point1");
const point2 = document.getElementById("point2");
const point3 = document.getElementById("point3");
const content = document.getElementById("content");
const line = document.querySelector("#line1");

class Point {
    constructor(x, y){
        this.X = x;
        this.Y = y;
    }
}

let pointData1 = new Point(50, 50);
let pointData2 = new Point(210, 190);
let pointData3 = new Point(310, 460);

let priviousLine = [];

let draggingState = 0;

function Update(lineNo, x, y) {
    if (lineNo == 0) return;

    const targetRect = content.getBoundingClientRect();

    const relativeX = x - targetRect.left;
    const relativeY = y - targetRect.top;

    if (lineNo==1) {
        point1.style.left = `${relativeX-10}px`;
        point1.style.top = `${relativeY-10}px`;
        pointData1.X = relativeX;
        pointData1.Y = relativeY;
    } else if (lineNo==2) {
        point2.style.left = `${relativeX-10}px`;
        point2.style.top = `${relativeY-10}px`;
        pointData2.X = relativeX;
        pointData2.Y = relativeY;
    } else if (lineNo==3) {
        point3.style.left = `${relativeX-10}px`;
        point3.style.top = `${relativeY-10}px`;
        pointData3.X = relativeX;
        pointData3.Y = relativeY;
    }

    DrawCurve();
}

function DrawCurve() {
    const coefficient1 = applyQuadricCurve(pointData1.X, pointData1.Y);
    const coefficient2 = applyQuadricCurve(pointData2.X, pointData2.Y);
    const coefficient3 = applyQuadricCurve(pointData3.X, pointData3.Y);

    const coefficientMatrix = [
        ...coefficient1[0],
        ...coefficient2[0],
        ...coefficient3[0]
    ];

    const constant = [coefficient1[1], coefficient2[1], coefficient3[1]];

    const quadricCoefficient = solve33(coefficientMatrix, constant);
    const [a, b, c] = quadricCoefficient;

    //Clear
    priviousLine.forEach(element => {
        element.remove();
    });

    let prevX=0, prevY=0;

    for (i=0; i<160; ++i) {
        const x = i * 10;
        const y = a * x * x + b * x + c;

        if (i!=0) {
            const line = MakeLineTo(prevX, prevY, x, y);
            priviousLine.push(line);
        }

        prevX = x;
        prevY = y;
    }
}

function applyQuadricCurve(x, y) {
    return [[x*x, x, 1], y]
}

function MakeLineTo(x1, y1, x2, y2) {
    const x = x2 - x1;
    const y = y2 - y1;
    const width = Math.sqrt(x**2 + y**2);
    const rotation = Math.atan2(y, x);

    const line2 = line.cloneNode(true);
    line2.id = "line2";
    line2.hidden = false;
    
    line2.style.left = `${x1}px`;
    line2.style.top = `${y1}px`;
    line2.style.width = `${width}px`;
    line2.style.transform = `rotate(${rotation}rad)`;

    line.after(line2);
    return line2;
}

content.onmousedown = (e) => {
    if (e.target == point1) {
        Update(1, e.x, e.y);
        draggingState = 1;
    }
    else if (e.target == point2) {
        Update(2, e.x, e.y);
        draggingState = 2;
    }else if (e.target == point3) {
        Update(3, e.x, e.y);
        draggingState = 3;
    }
}

window.onmouseup = (e) => {
    draggingState = 0;
}

content.onmousemove = (e) => {
    Update(draggingState, e.x, e.y);
}

content.oncontextmenu = (e) => {
    console.log(e);
}

DrawCurve();
