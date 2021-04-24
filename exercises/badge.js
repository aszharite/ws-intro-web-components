export class Badge extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');

    template.innerHTML = `
      <div>badge works!</div>
    `;

    this.attachShadow({mode: 'open'})
      .appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('jsl-badge', Badge);
