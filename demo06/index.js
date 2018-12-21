// 顶点着色器
var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'void main() { \n' +
    'gl_Position = a_Position; \n' +
    // 'gl_PointSize = 10.0;\n' + 
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

    var n = initVertexBuffers(gl);
    if(n < 0) {
        console.log('Failed to set the position of the vertices');
        return;
    }
    

    // var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    // if(a_Position < 0) {
    //     console.log("Fauled to get the a_Position");
    // }

    // // 将顶点位置传输给 attribute 变量
    // gl.vertexAttrib3f(a_Position, 0.0,0.0,0.0);

    // // 设置 canvas 背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // // 清空 canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0 , n);

}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5,
        -0.5, -0.5, 
        0.5, -0.5
    ]);
    var n = 3;

    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer) {
        Console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

    gl.bufferData(gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(a_Position);

    return n;


}

main();
