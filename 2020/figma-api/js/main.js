const intToHex = (int) => { 
  let hex = Number(int).toString(16);
  if (hex.length < 2) { hex = "0" + hex; }
  return hex;
}

const rgbToHex = (r,g,b) => {
  const red = intToHex(r);
  const green = intToHex(g);
  const blue = intToHex(b);

  return `#${red}${green}${blue}`;
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

const parameterizeName = (name) => {
  return name.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-");
};

const Screen = node => ({
  name: node.name,
  image: "",
  comments: []
});

const _projectScreens = (project) => {
  console.log(project)
  const { children } = project;
  const screens = {};

  // TODO: add check for type frame
  children.forEach(node => (screens[node.id] = Screen(node)));

  console.log(screens)

  // const screenImages = (
  //   await this.client.fileImages(this.file, {
  //     ids: Object.keys(screens),
  //     scale: 2
  //   })
  // ).data.images;

  // Object.keys(screenImages).forEach(function(id) {
  //   const image = screenImages[id];
  //   screens[id].image = image;
  // });

  // return screens;
}


var figmaKey = config.FIGMA_KEY;
var projectKey = config.PROJECT_KEY;

var myHeaders = new Headers();
myHeaders.append('X-Figma-Token', figmaKey);

var myInit = { method: 'GET', headers: myHeaders, mode: 'cors', cache: 'default' };

var myRequest = new Request(`https://api.figma.com/v1/files/${projectKey}`, myInit);

fetch(myRequest)
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
    const nodes = data.document.children;
    const projects = nodes.map(node => Project(node));

    console.log(nodes);

    _projectScreens(nodes[0])
  });
  // .then(function(myBlob) {
  //   var objectURL = URL.createObjectURL(myBlob);
  //   myImage.src = objectURL;
  // });
  