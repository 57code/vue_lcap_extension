/// <reference types="@nasl/types" />
namespace extensions.cw_fe_certification.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({  
    title: '自定义面板',
    description: '自定义拥有两个插槽，可以自定义面板的标题和内容',
  })
  export class MyPanel extends ViewComponent {
    constructor(options?: Partial<MyPanelOptions>) {
      super();
    }

    @Prop({
        title: '显示状态',
        settable: true,
    })
    show: nasl.core.Boolean;
  }

  export class MyPanelOptions extends ViewComponentOptions {
    @Prop({
      title: '是否可关闭', 
      setter: {
        concept: 'SwitchSetter'
      }
    })
    canClose: nasl.core.Boolean = true

    @Slot({
      title: '内容定制',
      description: 'xxxx'
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;


    @Slot({
      title: '标题定制'
    })
    slotHeader: () => Array<nasl.ui.ViewComponent>;

    @Slot({
      title: '页脚定制'
    })
    slotFooter: () => Array<nasl.ui.ViewComponent>;
  }
}