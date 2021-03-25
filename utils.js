export const frontExperiments = [
  {
    subTitle: 'SVG',
    title: 'After Effects export to SVG/Canvas',
    description: 'Experiments on Lottie, After Effects plugin for exporting animations to web.',
    url: '/2020/lottie-web-ae/index.html',
  },
  {
    subTitle: 'SVG',
    title: 'Figma Project API',
    description: 'Using Figma API to generate a web résume.',
    url: '/2020/figma-api/index.html',
  },
  {
    subTitle: 'CSS',
    title: 'CSS Grid Painting',
    description: 'Piet Mondrian painting using Grid Layout.',
    url: '/2020/mondrian-grid/index.html',
  },
  {
    subTitle: 'Canvas',
    title: 'Canvas with Web Audio',
    description: 'Doing a audio sensible visualizer with Canvas.',
    url: '/2020/canvas-experiments/index.html',
  },
  {
    subTitle: 'SVG',
    title: 'After Effects export to SVG/Canvas',
    description: 'Experiments on Lottie, After Effects plugin for exporting animations to web.',
    url: '/2020/lottie-web-ae/index.html',
  }
];

export const dataScienceExperiments = [
  {
    subTitle: 'Big Data',
    title: 'Project Name',
    description: 'To be created',
    url: '#',
  },
  {
    subTitle: 'Artificial Intelligence',
    title: 'Project Name',
    description: 'To be created',
    url: '#',
  },
  {
    subTitle: 'NLP',
    title: 'Project Name',
    description: 'To be created',
    url: '#',
  }
];

/**
 * Function that loads experiments from given array and render on specified idElement
 * @param {Array} array
 * @param {String} idElement
 */
export function renderExperiments(array, idElement) {
  // check if is less than six to identify and render dummie elements
  const numberOfDummieElements = array.length < 7 ? (6 - array.length) : array.length

  debugger
  document.getElementById(idElement).innerHTML = array.map(experiment => { 
    return `
      <article itemscope="itemscope" itemtype="http://schema.org/CreativeWork">
        <a href=${experiment.url} class="content">
          <h6>
            ${experiment.subTitle}
          </h6>
          <h3 itemprop="name" class="mt-8">
            ${experiment.title}
          </h3>
          <p class="mt-8">
            ${experiment.description}
          </p>
        </a>
      </article>
    `
  }).join('')
}