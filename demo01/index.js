// 顶点着色器
var VSHADER_SOURCE = 
    'void main() { \n' +
    'gl_Position = vec4(0.0, 0.0 , 0.0, 1.0); \n' +
    'gl_PointSize = 10.0;\n' + 
    '}\n';

// 片元着色器
var FSHADER_SOURCE = 
    'void main() {\n' +
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}\n';

function main() {
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);
    if(!gl) {
        console.log('Failed to get the webgl')
        return;
    }

    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
        console.log('Failed initialize shaders');
    }

    // 设置 canvas 背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清空 canva
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0 , 1);

}

main();
