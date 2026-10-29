 // Geometry rasterizer: retain the established meshes, projection and art; draw triangles with depth on WebGL2.
 let geometryGPU=null,geometryGPUFailed=false,geometryGPUEnabled=true,geometryFrame=0,geometrySeen=-1,geometryVertices=new Float32Array(16384),geometryDraws=0,geometryDeferred=false;
 function geometryBegin(){geometryFrame++;geometryDraws=0;}
 function geometryInit(){
  if(!geometryGPUEnabled||geometryGPUFailed)return null;if(geometryGPU)return geometryGPU;
  try{
   const canvas=document.createElement('canvas'),gl=canvas.getContext('webgl2',{alpha:true,antialias:false,depth:true,stencil:false,premultipliedAlpha:true,preserveDrawingBuffer:true});if(!gl)throw Error('WebGL2 unavailable');
   const compile=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
   const program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,`#version 300 es
    precision highp float;layout(location=0) in vec3 position;layout(location=1) in vec4 color;uniform vec2 size;out vec4 rgba;
    void main(){float z=position.z;float near=.16;float far=240.;vec2 xy=vec2(position.x/size.x*2.-1.,1.-position.y/size.y*2.);gl_Position=vec4(xy*z,((far+near)/(far-near))*z-(2.*far*near/(far-near)),z);rgba=color;}`));
   gl.attachShader(program,compile(gl.FRAGMENT_SHADER,`#version 300 es
    precision mediump float;in vec4 rgba;out vec4 outputColor;void main(){outputColor=vec4(rgba.rgb*rgba.a,rgba.a);}`));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
   gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,28,0);gl.enableVertexAttribArray(1);gl.vertexAttribPointer(1,4,gl.FLOAT,false,28,12);gl.enable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl.depthFunc(gl.LEQUAL);gl.clearColor(0,0,0,0);
   canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();geometryGPUFailed=true;});canvas.addEventListener('webglcontextrestored',()=>{geometryGPU=null;geometryGPUFailed=false;geometrySeen=-1;});
   geometryGPU={canvas,gl,buffer,program,size:gl.getUniformLocation(program,'size'),capacity:0};return geometryGPU;
  }catch{geometryGPUFailed=true;return null;}
 }
 function geometryFlush(faces){
  const gpu=geometryInit();if(!gpu)return false;if(!faces.length)return true;const {canvas,gl}=gpu;
  let count=0;for(const f of faces)count+=Math.max(0,f.points.length-2)*21;if(count>geometryVertices.length){let capacity=geometryVertices.length;while(capacity<count)capacity*=2;geometryVertices=new Float32Array(capacity);}
  let cursor=0;for(const f of faces)for(let i=1;i<f.points.length-1;i++)for(const p of [f.points[0],f.points[i],f.points[i+1]]){geometryVertices[cursor++]=p.x;geometryVertices[cursor++]=p.y;geometryVertices[cursor++]=p.z;geometryVertices[cursor++]=f.color[0]/255;geometryVertices[cursor++]=f.color[1]/255;geometryVertices[cursor++]=f.color[2]/255;geometryVertices[cursor++]=f.alpha??1;}
  const resized=canvas.width!==W||canvas.height!==H;if(resized){canvas.width=W;canvas.height=H;gl.viewport(0,0,W,H);}gl.useProgram(gpu.program);gl.uniform2f(gpu.size,W,H);gl.clear(gl.COLOR_BUFFER_BIT|(resized||geometrySeen!==geometryFrame?gl.DEPTH_BUFFER_BIT:0));geometrySeen=geometryFrame;
  gl.bindBuffer(gl.ARRAY_BUFFER,gpu.buffer);if(gpu.capacity<geometryVertices.byteLength){gpu.capacity=geometryVertices.byteLength;gl.bufferData(gl.ARRAY_BUFFER,gpu.capacity,gl.DYNAMIC_DRAW);}gl.bufferSubData(gl.ARRAY_BUFFER,0,geometryVertices.subarray(0,cursor));gl.drawArrays(gl.TRIANGLES,0,cursor/7);g.drawImage(canvas,0,0);geometryDraws++;return true;
 }
 const geometryColors=new Map();
 function geometryColor(fill){let color=geometryColors.get(fill);if(color)return color;if(/^#[0-9a-f]{6}$/i.test(fill))color={rgb:[parseInt(fill.slice(1,3),16),parseInt(fill.slice(3,5),16),parseInt(fill.slice(5,7),16)],alpha:1};else if(/^#[0-9a-f]{3}$/i.test(fill))color={rgb:[...fill.slice(1)].map(x=>parseInt(x+x,16)),alpha:1};else{const m=String(fill).match(/^rgba?\(([^)]+)\)$/);if(m){const v=m[1].split(',').map(Number);if(v.every(Number.isFinite))color={rgb:v.slice(0,3),alpha:v[3]??1};}}if(color)geometryColors.set(fill,color);return color;}
 function geometryFace(points,color,unlit=false){const n=meshFaces.length;meshFace(points,color.rgb);if(meshFaces.length>n){const face=meshFaces.at(-1);face.alpha=color.alpha*g.globalAlpha;if(unlit)face.color=color.rgb;return face;}return null;}
 function geometryLineProjected(a,b,width,color){const length=Math.hypot(b.x-a.x,b.y-a.y);if(length<.05)return;const dx=-(b.y-a.y)/length*width/2,dy=(b.x-a.x)/length*width/2;meshFaces.push({points:[{x:a.x+dx,y:a.y+dy,z:a.z-.0002},{x:b.x+dx,y:b.y+dy,z:b.z-.0002},{x:b.x-dx,y:b.y-dy,z:b.z-.0002},{x:a.x-dx,y:a.y-dy,z:a.z-.0002}],depth:(a.z+b.z)/2,color:color.rgb,alpha:color.alpha*g.globalAlpha});}
 function geometryGround(points,fill,stroke){
  // Ground colors are authored values: a second moon-light factor erased the cobbles.
  // Keep their outlines/cracks in the same batch; raster art is composited after explicit drains.
  if(!geometryInit())return false;const color=geometryColor(fill);if(!color){geometryDrain();return false;}const face=geometryFace(points,color,true);if(face&&stroke){const edge=geometryColor(stroke),ps=face.points;if(edge){let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;for(const p of ps){minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);minY=Math.min(minY,p.y);maxY=Math.max(maxY,p.y);}if(maxX-minX>6||maxY-minY>6)for(let i=0;i<ps.length;i++)geometryLineProjected(ps[i],ps[(i+1)%ps.length],.8,edge);}}return true;
 }
 function geometryStroke(a,b,width,fill){if(!geometryInit())return false;const color=geometryColor(fill);if(!color){geometryDrain();return false;}const pa=proj(a),pb=proj(b);if(!pa||!pb)return true;geometryLineProjected(pa,pb,Math.max(.65,(pa.s+pb.s)*width*.5),color);return true;}
 function geometryDrain(){if(!meshFaces.length)return;const deferred=geometryDeferred;geometryDeferred=false;flushMesh();geometryDeferred=deferred;}
