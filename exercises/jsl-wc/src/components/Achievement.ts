import { html, LitElement } from 'lit-element';

import '../registry/badge.js';

export class Achievement extends LitElement {
  title: string = "Bronze User";

  description: string = "Has posted more than 1 post on their profile";

  progress: number = 100;

  tooltip: string = "UNLOCKED!";

  render() {
    return html`
      <jsl-badge></jsl-badge>
      <div>${this.title}</div>
      <div>${this.description}</div>
      <div>${this.progress}</div>
      <div>${this.tooltip}</div>
    `;
  }
}
