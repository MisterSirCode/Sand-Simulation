const [cvw, cvh] = [512, 512];
const cvs = document.querySelector(".sandbox");
const ctx = cvs.getContext("2d");
const pxm = new PXMAN(ctx, cvw, cvh);

function initialize() {
    cvs.width = cvw;
    cvs.height = cvh;
}

initialize();