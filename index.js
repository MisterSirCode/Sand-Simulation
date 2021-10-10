const [cvw, cvh] = [100, 100];
const cvs = document.querySelector(".sandbox");
const ctx = cvs.getContext("2d");
const pxm = new PXMAN(ctx, cvw, cvh);
const randomRange = (min, max) => Math.random() * (max - min) + min;
const clamp = (n, min, max) => Math.max(min, Math.min(n, max));
let sdb = [];

function createSandbox(w, h) {
    let array = [];
    for (var y = 0; y < h; ++y) {
        array[y] = [];
        for (var x = 0; x < w; ++x) {
            array[y][x] = 0;
        }
    }
    return array;
}

sdb = createSandbox(4, 4);

function setSand(x, y, data) {
    sdb[y][x] = data;
}

function getSand(x, y) {
    return sdb[y][x] || 0;
}

function setupSandbox() {
    for (var y = 0; y < 40; ++y) {
        for (var x = 0; x < 70; ++x) {
            setSand(10 + x, 10 + y, 1);
        }
    }
}

function checkAroundPoint(x, y, dx, dy) {
    let ndx = dx;
    let ndy = dy;
    if (sdb[y + dy][x + dx] == 1) {
        if (sdb[y][x + dx] == 1)
            ndx = 0;
        if (sdb[y + dy][x] == 1)
            ndy = 0;
    }
    return [ndy, ndx];
}

function update() {
    let newtable = createSandbox(cvw, cvh);
    for (let y = 0; y < sdb.length; ++y) {
        for (let x = 0; x < sdb[y].length; ++x) {
            let sand = sdb[y][x];
            if (sand != 0) {
                try {
                    let nd = checkAroundPoint(x, y, Math.round(randomRange(1, 3) - 2), 1);
                    let fx = clamp(x + nd[1], 0, cvw - 1);
                    let fy = clamp(y + nd[0], 0, cvh - 2);
                    newtable[y][x] = 0;
                    pxm.setPixel(x, y + 1, 0, 0, 0, 255);
                    if (newtable[fy][fx] == 1 || newtable[fy][fx] ) {
                        newtable[fy - 0][fx - nd[1]] = 1;
                        pxm.setPixel(fx, fy + 1, 255, 0, 0, 255);
                    } else {
                        newtable[fy][fx] = 1;
                        pxm.setPixel(fx, fy + 1, 255, 255, 0, 255);
                    }
                } catch(e) {
                    // console.log(e);
                }
            }
        }
    }
    sdb = newtable;
    pxm.render(0, 0);
}

function initialize() {
    cvs.width = cvw;
    cvs.height = cvh;
    sdb = createSandbox(cvw, cvh);
    setupSandbox();
    update();
    setInterval(update, 25);
}

initialize();