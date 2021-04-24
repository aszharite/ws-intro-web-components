import { Badge } from '../components/Badge.js';

if (!customElements.get('jsl-badge')) {
  customElements.define('jsl-badge', Badge);
}
