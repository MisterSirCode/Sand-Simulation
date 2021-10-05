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
    for (var i = 0; i < 30; ++i) {
        setSand(10 + i, 10 + i, 1);
    }
}

function update() {
    let newtable = createSandbox(cvw, cvh);
    for (let y = 0; y < sdb.length; ++y) {
        for (let x = 0; x < sdb[y].length; ++x) {
            let sand = sdb[y][x];
            if (sand != 0) {
                let nx = x + Math.round(randomRange(1, 3) - 2);
                nx = clamp(x < 0 ? 0 : x > cvw ? cvw - 1 : x, 0, cvw-1);
                let ny = clamp(y + 1, 0, cvh-1);
                newtable[ny][nx] = 1;
                pxm.setPixel(x, y, 0, 0, 0, 255);
                pxm.setPixel(nx, ny, 255, 0, 0, 255);
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
    setInterval(update, 50);
}

initialize();