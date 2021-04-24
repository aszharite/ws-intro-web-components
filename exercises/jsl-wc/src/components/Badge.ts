import { html, LitElement } from 'lit-element';

const badges: {[key: string]: string} = {
  "bronze": "https://odindesignthemes.com/vikinger/img/badge/bronze-b.png",
  "silver": "https://odindesignthemes.com/vikinger/img/badge/silver-b.png",
  "gold": "https://odindesignthemes.com/vikinger/img/badge/gold-b.png",
  "platinum": "https://odindesignthemes.com/vikinger/img/badge/platinum-b.png",
  "traveller": "https://odindesignthemes.com/vikinger/img/badge/traveller-b.png",
  "caffeinated": "https://odindesignthemes.com/vikinger/img/badge/caffeinated-b.png",
  "upowered": "https://odindesignthemes.com/vikinger/img/badge/upowered-b.png",
  "scientist": "https://odindesignthemes.com/vikinger/img/badge/scientist-b.png",
  "ncreature": "https://odindesignthemes.com/vikinger/img/badge/ncreature-b.png",
  "warrior": "https://odindesignthemes.com/vikinger/img/badge/warrior-b.png",
  "liked": "https://odindesignthemes.com/vikinger/img/badge/liked-b.png",
  "sloved": "https://odindesignthemes.com/vikinger/img/badge/sloved-b.png",
  "qconq": "https://odindesignthemes.com/vikinger/img/badge/qconq-b.png",
  "villain": "https://odindesignthemes.com/vikinger/img/badge/villain-b.png",
  "age": "https://odindesignthemes.com/vikinger/img/badge/age-b.png",
  "tstruck": "https://odindesignthemes.com/vikinger/img/badge/tstruck-b.png",
  "uexp": "https://odindesignthemes.com/vikinger/img/badge/uexp-b.png",
  "globet": "https://odindesignthemes.com/vikinger/img/badge/globet-b.png",
  "verifieds": "https://odindesignthemes.com/vikinger/img/badge/verifieds-b.png",
  "gempost": "https://odindesignthemes.com/vikinger/img/badge/gempost-b.png",
  "peoplesp": "https://odindesignthemes.com/vikinger/img/badge/peoplesp-b.png",
  "rulerm": "https://odindesignthemes.com/vikinger/img/badge/rulerm-b.png",
  "marketeer": "https://odindesignthemes.com/vikinger/img/badge/marketeer-b.png",
  "tycoon": "https://odindesignthemes.com/vikinger/img/badge/tycoon-b.png",
  "mightiers": "https://odindesignthemes.com/vikinger/img/badge/mightiers-b.png",
  "phantom": "https://odindesignthemes.com/vikinger/img/badge/phantom-b.png",
  "forumsf": "https://odindesignthemes.com/vikinger/img/badge/forumsf-b.png",
  "fcultivator": "https://odindesignthemes.com/vikinger/img/badge/fcultivator-b.png",
  "splanner": "https://odindesignthemes.com/vikinger/img/badge/splanner-b.png",
  "collector": "https://odindesignthemes.com/vikinger/img/badge/collector-b.png",
  "prophoto": "https://odindesignthemes.com/vikinger/img/badge/prophoto-b.png",
  "rmachine": "https://odindesignthemes.com/vikinger/img/badge/rmachine-b.png",
  "bronzec": "https://odindesignthemes.com/vikinger/img/badge/bronzec-b.png",
  "silverc": "https://odindesignthemes.com/vikinger/img/badge/silverc-b.png",
  "goldc": "https://odindesignthemes.com/vikinger/img/badge/goldc-b.png",
  "platinumc": "https://odindesignthemes.com/vikinger/img/badge/platinumc-b.png",
}

export class Badge extends LitElement {
  static get properties() {
    return {
      badge: {type: String},
    };
  }

  badge: string;

  constructor() {
    super();

    this.badge = '';
  }

  _handleHover() {
    console.log('hover inside badge component');

    const event = new CustomEvent('badge-hover', {
      detail: {
        badge: this.badge
      },
      bubbles: true,
      composed: true
    })

    this.dispatchEvent(event);
  }

  render() {
    return html`
      <img 
        src="${badges[this.badge]}" 
        alt="${this.badge}" 
        @focus="${() => this._handleHover()}"
        @mouseover="${() => this._handleHover()}" />
    `;
  }
}
