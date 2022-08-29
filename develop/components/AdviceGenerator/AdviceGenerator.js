fetch('./develop/components/AdviceGenerator/AdviceGenerator.html')
  .then((stream) => stream.text())
  .then((text) => {
    define(text);
  });

function define(html) {
  class AdviceGenerator extends HTMLElement {
    constructor() {
      super();

      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = html;
    }

    // VARIABLES

    // METHODS
  }
  window.customElements.define('advice-generator', AdviceGenerator);
}
