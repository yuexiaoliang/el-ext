import { defineComponent } from 'vue';
import './index.scss';

export default defineComponent({
  setup(props, { slots, attrs }) {
    const msg = 'hello tsx';
    return () => <div class='ele-button'>{slots.default ? slots.default() : msg}</div>;
  }
});
