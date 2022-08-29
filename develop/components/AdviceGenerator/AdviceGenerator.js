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
    handleClick() {
      fetch('https://api.adviceslip.com/advice', {
        cache: 'no-cache',
      })
        .then((res) => res.json())
        .then((data) => {
          const {
            slip: { id, advice },
          } = data;

          const cardQuote =
            this.shadowRoot.children[2].children[0].children[1].children[0];
          cardQuote.textContent = advice;

          const cardTitle = this.shadowRoot.children[2].children[0].children[0];
          cardTitle.textContent = `Advice #${id}`;
        })
        .catch((e) => {
          if (e) throw new Error(e.message);
        });
    }

    // LIFE CYCLE METHODS
    connectedCallback() {
      const generateAdviceBtn = this.shadowRoot.children[2].children[2];
      generateAdviceBtn.addEventListener('click', () => this.handleClick());
    }
  }
  window.customElements.define('advice-generator', AdviceGenerator);
}
