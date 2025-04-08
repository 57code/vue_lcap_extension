/// <reference types="@nasl/types" />
namespace extensions.cw_fe_certification.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '我的按钮',
    description: '我的按钮',
  })
  export class MyButton extends ViewComponent {
    constructor(options?: Partial<MyButtonOptions>) {
      super();
    }
  }

  export class MyButtonOptions extends ViewComponentOptions {
    @Prop({
      title: '文本标签',
      description: '按钮文本标签，默认值为按钮',
      setter: {
        concept: 'InputSetter'
      }
    })
    label: nasl.core.String = '按钮';

    @Prop({
      title: '按钮类型',
      description: '按钮类型，',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '默认'
          },
          {
            title: '主色'
          },
          {
            title: '成功'
          },
          {
            title: '警告'
          },
          {
            title: '危险'
          },
          {
            title: '信息'
          }
        ]
      }
    })
    type: null | 'primary' | 'success' | 'warning' | 'danger' | 'info' = null;

    @Event({
      title: '点击事件',
      description: '点击事件',
    })
    onMyClick: (e: { timestamp: nasl.core.Integer }) => void;
  }
}