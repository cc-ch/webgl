// 顶点着色器
var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'void main() { \n' +
    'gl_Position = a_Position; \n' +
    'gl_PointSize = 10.0;\n' + 
    '}\n';

// 片元着色器
var FSHADER_SOURCE = 
    'precision mediump float;\n'+      
    'uniform vec4 u_FragColor;\n'+      // uniform 变量
    'void main() {\n' +
    'gl_FragColor = u_FragColor;\n' +
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

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    var u_Position = gl.getUniformLocation(gl.program, 'u_FragColor');

    if(a_Position < 0) {
        console.log("Fauled to get the a_Position");
    }

    canvas.onmousedown = function(ev) {
        clickFuc(ev, gl, canvas, a_Position, u_Position);
    }

    // 将顶点位置传输给 attribute 变量
    // gl.vertexAttrib3f(a_Position, 0.0,0.0,0.0);

    // // 设置 canvas 背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // // 清空 canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_Points = [];
var g_colors = [];
function clickFuc(ev, gl, canvas, a_Position, u_FragColor) {
    var x = ev.clientX;
    var y = ev.clientY;

    var rect = ev.target.getBoundingClientRect();

    x = ((x-rect.left) - canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);

    g_Points.push([x,y]);

    if(x >= 0.0 && y >= 0.0) {
        g_colors.push([1.0, 0.0, 0.0, 1.0]);
    }else if (x < 0.0 && y < 0.0) {
        g_colors.push([0.0, 1.0, 0.0, 1.0]);
    }else {
        g_colors.push([1.0, 1.0, 1.0, 1.0]);
    }

    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_Points.length;
    for(var i = 0; i < len; i++) {
        var xy = g_Points[i]
        var rgba = g_colors[i]

        gl.vertexAttrib3f(a_Position, xy[0],xy[1], 0.0);

        gl.uniform4f(u_FragColor, rgba[0],rgba[1],rgba[2],rgba[3]);

        gl.drawArrays(gl.POINTS, 0 , 1);
    }
}

main();
