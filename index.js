const [cvw, cvh] = [100, 100];
const cvs = document.querySelector(".sandbox");
const ctx = cvs.getContext("2d");
const pxm = new PXMAN(ctx, cvw, cvh);
let sdb = [];

function createSandbox(w, h) {
    return Array(h).fill(new Array(w).fill(0));
}

function setSand(x, y, data) {
    sdb[y][x] = data;
}

function getSand(x, y) {
    return sdb[y][x] || 0;
}

function setupSandbox() {
    for (var i = 0; i < 30; ++i) {
        setSand(10 + i, 10 + i, 1);
    }
}

function applyPhysics(x, y) {
    x = x + Math.round(randomRange(1, 3) - 2);
    x = x < 0 ? 0 : x > cvw ? cvw - 1 : x;
    y = y + 1 > cvh ? cvh - 1 : y < 0 ? 0 : y;
    return [x, y];
}

function update() {
    let newtable = createSandbox(cvw, cvh);
    for (let y = 0; y < sdb.length; ++y) {
        for (let x = 0; x < sdb[y].length; ++x) {
            pxm.render(0, 0);
            let sand = sdb[y][x];
            if (sand != 0) {
                let [nx, ny] = applyPhysics(x, y);
                newtable[ny][nx] = 1;
                pxm.setPixel(nx, ny, 1, 1, 1, 1);
            } else {
                pxm.setPixel(x, y, 0, 0, 0, 0);
            }
        }
    }
    sdb = newtable;
    // pxm.render(0, 0);
}

function initialize() {
    cvs.width = cvw;
    cvs.height = cvh;
    sdb = createSandbox(cvw, cvh);
    setupSandbox();
    update();
    // setInterval(update, 1000);
}

initialize();