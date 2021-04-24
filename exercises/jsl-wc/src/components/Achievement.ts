import { html, css, LitElement } from 'lit-element';

import '../registry/badge.js';

export class Achievement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      p {
        color: #3e3f5e;
        font-family: Rajdhani,sans-serif;
        line-height: 1em;
        margin: 0;
      }

      .achievement-card {
        padding: 32px 28px;
        border-radius: 12px;
        background-color: #fff;
        box-shadow: 0 0 40px 0 rgb(94 92 154 / 6%);
        position: relative;
        display: flex;
        flex-direction: column;
      }

      jsl-badge {
        display: block;
        margin: 0 auto;
      }

      .stat-title {
        margin-top: 36px;
        font-size: 1.125rem;
        font-weight: 700;
        text-align: center;
      }

      .stat-description {
        width: 180px;
        margin: 16px auto 0;
        color: #3e3f5e;
        font-size: .875rem;
        font-weight: 500;
        line-height: 1.4285714286em;
        text-align: center;
      }

      .stat-progress {
        width: 204px;
        heigth: 4px;
        margin: 54px auto 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .stat-progress-bar {
        width: 100%;
        height: 4px;
        position: relative;
        display: flex;
        flex-direction: row;
        background-color: #D6DAE0;
        border-radius: 1px;
      }

      .stat-progress-bar .fill {
        height: 4px;
        background-color: #0050EF;
        border-top-left-radius: 1px;
        border-bottom-left-radius: 1px;
      }

      .stat-progress-info {
        font-size: .75rem;
        font-weight: 700;
        margin-top: 28px;
        color: #3e3f5e;
        text-transform: uppercase;
      }
    `;
  }

  static get properties() {
    return {
      badge: {type: String},
      title: {type: String},
      description: {type: String},
      progress: {type: String},
      tooltip: {type: String},
    }
  }

  badge: string;

  title: string;

  description: string;

  progress: number;

  tooltip: string;

  constructor() {
    super();

    this.badge = '';
    this.title = '';
    this.description = '';
    this.progress = 0;
    this.tooltip = '';
  }


  render() {
    return html`
      <div class="achievement-card">
        <jsl-badge badge="${this.badge}"></jsl-badge>
        <p class="stat-title">${this.title}</p>
        <p class="stat-description">${this.description}</p>
        <div class="stat-progress">
          <div class="stat-progress-bar">
            <div class="fill" style="width: ${this.progress}%"></div>
          </div>
          <p class="stat-progress-info">${this.tooltip}</p>
        </div>
      </div>
    `;
  }
}
