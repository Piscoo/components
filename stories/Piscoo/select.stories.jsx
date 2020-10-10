// import Vue from 'vue'
import NormalStory from "./select/Normal.story.vue";
import AnotherStory from "./select/Another.story.vue";
// import Clickoutside from './utils/clickoutside.js'
// Vue.directive('clickoutside', Clickoutside)

export default {
  title: "组件列表/Piscoo/Select"
};

export const normal = () => ({
  render(h) {
    return <NormalStory></NormalStory>;
  }
});

export const another = () => ({
  render(h) {
    return <AnotherStory></AnotherStory>;
  }
});
