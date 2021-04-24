import { Achievement } from '../components/Achievement.js';

if (!customElements.get('jsl-achieveemnt')) {
  customElements.define('jsl-achievement', Achievement);
}
