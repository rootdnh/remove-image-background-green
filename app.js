const canvas = document.getElementById('canvas');
const tolerance = 171;
const image = new Image(100 , 200);
const referenceCOlor = {r: 0, g: 255, b: 0};
image.src = 'rickdiculo.png';
image.width=200;
image.height=200;
image.onload = drawImage;


function drawImage(){
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    processImage(context);
}

function processImage(context){
  const imageData = context.getImageData(0,0, canvas.width, canvas.height);
  const data = imageData.data;
  for(let i=0; i<data.length; i+=4){
    //console.log(data[i], data[i+1], data[i+2], data[i+3]);
    const r = data[i];
    const g = data[i+1];
    const b = data[i]+2;

    const color = {r,g,b};
    if(distance(color, referenceCOlor) < tolerance){
      data[i+3] = 20;
    }
  }
  context.putImageData(imageData, 0, 0);
}

function distance(color, reference){
  const diff = {r: reference.r - color.r, g: reference.g - color.g, b: reference.b - color.b}
  const module = Math.sqrt((diff.r * diff.r) + (diff.g * diff.g) + (diff.b * diff.b)) //soma dos quadrados igual a ......
  return module;
}