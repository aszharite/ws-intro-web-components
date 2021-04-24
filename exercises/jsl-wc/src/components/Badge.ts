import { html, LitElement } from 'lit-element';

export class Badge extends LitElement {
  src: string = 'https://odindesignthemes.com/vikinger/img/badge/bronze-b.png';

  alt: string = 'bronze smiley face';

  render() {
    return html`
      <img src="${this.src}" alt="${this.alt}" />
    `;
  }
}
