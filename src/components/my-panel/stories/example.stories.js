import { MyPanel } from '../index';

export default {
  id: 'my-panel-examples',
  title: '组件列表/MyPanel/示例',
  component: MyPanel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

const Template = (args) => ({
  components: { MyPanel },
  setup() {
    return { args };
  },
  template: `
    <my-panel v-bind="$props">
      <template #header>
        {{args.title}}
      </template>
      <template #default>
        {{args.content}}
      </template>
      <template #footer>
        {{args.footer}}
      </template>
    </my-panel>
    `,
});

export const Example1 = Template.bind({
  name: '基本用法',
});
Example1.args = {
  canClose: true,
  title: '这是标题',
  content: '这是内容',
  footer: '这是底部',
};
