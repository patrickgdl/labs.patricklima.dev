const intToHex = (int) => { 
  let hex = Number(int).toString(16);
  if (hex.length < 2) { hex = "0" + hex; }
  return hex;
}

const rgbToHex = (r,g,b) => {
  const red = intToHex(r);
  const green = intToHex(g);
  const blue = intToHex(b);
  return "#"+red+green+blue;
}

const Project = node => {
  const { r, g, b, a } = node.backgroundColor;
  const rgb = [r, g, b].map(n => Math.ceil(n * 255));

  const colorHex = rgbToHex(...rgb)

  return {
    name: node.name,
    background: colorHex,
    id: node.id
  };
};


var figmaKey = config.FIGMA_KEY;
var projectKey = config.PROJECT_KEY;

var myHeaders = new Headers();
myHeaders.append('X-Figma-Token', figmaKey);

var myInit = { method: 'GET', headers: myHeaders, mode: 'cors', cache: 'default' };

var myRequest = new Request(`https://api.figma.com/v1/files/${projectKey}`, myInit);

fetch(myRequest)
  .then(function(response) {
    return response.json()
  })
  .then(data => {
    console.log(data)
    const nodes = data.document.children;
    const projects = nodes.map(node => Project(node));

    console.log(projects);
  })
  ;
  // .then(function(myBlob) {
  //   var objectURL = URL.createObjectURL(myBlob);
  //   myImage.src = objectURL;
  // });


  