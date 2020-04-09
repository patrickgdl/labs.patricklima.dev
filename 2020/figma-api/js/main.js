const { FIGMA_KEY, FIGMA_PROJECT_KEY } = process.env;

var BASE_URL = 'https://api.figma.com/v1';

var myHeaders = new Headers();
myHeaders.append('X-Figma-Token', FIGMA_KEY);

var myInit = { method: 'GET', headers: myHeaders, mode: 'cors', cache: 'default' };

const intToHex = int => {
  let hex = Number(int).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
};

const rgbToHex = (r, g, b) => {
  const red = intToHex(r);
  const green = intToHex(g);
  const blue = intToHex(b);

  return `#${red}${green}${blue}`;
};

const Project = node => {
  const { r, g, b, a } = node.backgroundColor;
  const rgb = [r, g, b].map(n => Math.ceil(n * 255));

  const colorHex = rgbToHex(...rgb);

  return {
    name: node.name,
    background: colorHex,
    id: node.id
  };
};

const parameterizeName = name => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 -]/, '')
    .replace(/\s/g, '-');
};

const Screen = node => ({
  name: node.name,
  image: '',
  comments: []
});

const _projectScreens = project => {
  const { children } = project;
  const screens = {};

  // TODO: add check for type frame
  children.forEach(node => (screens[node.id] = Screen(node)));

  console.log('frames', screens);

  // building the image request
  var url = new URL(`${BASE_URL}/images/${FIGMA_PROJECT_KEY}`);
  var ids = Object.keys(screens);
  var params = { ids: ids.join(','), scale: 2 };

  url.search = new URLSearchParams(params).toString();

  return fetch(url, myInit)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('screens', data);

      var screenImages = data.images;

      Object.keys(screenImages).forEach(function(id) {
        const image = screenImages[id];
        screens[id].image = image;
      });

      console.log('screen image', screenImages);

      return screens;
    })
    .then(screen => {
      console.log('screens', screens);

      var img = document.getElementById('cv');
      img.src = screen['1:2'].image;
    });
};

var requestFiles = new Request(`${BASE_URL}/files/${FIGMA_PROJECT_KEY}`, myInit);

fetch(requestFiles)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log('node', data);
    const nodes = data.document.children;
    const projects = nodes.map(node => Project(node));

    console.log('projects names', projects);

    _projectScreens(nodes[0]);
  });
// .then(function(myBlob) {
//   var objectURL = URL.createObjectURL(myBlob);
//   myImage.src = objectURL;
// });
