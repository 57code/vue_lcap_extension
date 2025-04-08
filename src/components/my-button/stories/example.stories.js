import { MyButton } from '../index';

export default {
  id: 'my-button-examples',
  title: '组件列表/MyButton/示例',
  component: MyButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'button clicked' },
  },
};

const Template = (args) => ({
  components: { MyButton },
  setup() {
    return { args };
  },
  template: '<MyButton v-bind="args" @click="args.onClick" />',
});

export const Example1 = Template.bind({
  name: '基本用法',
});
Example1.args = {
  label: 'Hello World',
  type: 'primary',
};

export const Example2 = Template.bind({
  name: '点击事件',
});
Example2.args = {
  label: '点我',
  onClick: () => {
    console.log('事件触发：my-click')
  },
};
