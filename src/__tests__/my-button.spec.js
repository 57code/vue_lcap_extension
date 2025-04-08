import { mount, shallowMount } from '@vue/test-utils';
import MyButton from '../components/my-button';
import fs from 'fs-extra';

describe('MyButton组件', () => {

    let metaData;

    beforeEach(async () => {
        // 在所有测试用例执行前读取组件数据文件
        metaData = await fs.readJSON('./nasl.extension.json');
    });

    // 测试组件是否能正常渲染
    it('应该能正常渲染', () => {
        const wrapper = shallowMount(MyButton);
        expect(wrapper.exists()).toBe(true);
    });

    // 测试传入label属性时是否正确渲染显示
    it('传入label属性时应该正确显示文本', () => {
        const labelText = '测试按钮';
        const wrapper = mount(MyButton, {
            propsData: {
                label: labelText
            }
        });
        expect(wrapper.text()).toContain(labelText);
    });

    // 测试平台api的属性是否正确
    it('应该有正确的平台组件属性设置', () => {
        // 获取nasl.extention.json中指定组件的定义
        const componentDefinition = findComponent(metaData, 'MyButton')[0];
        expect(componentDefinition).toBeDefined();
        expect(componentDefinition).toHaveMetaData('name', 'MyButton');
        expect(componentDefinition).toHaveProps('label');
        expect(componentDefinition).toHavePropsDefaultValue('label', '按钮');
        expect(componentDefinition).toHaveProps('type');
        expect(componentDefinition).toHavePropsSetter('type', 'EnumSelectSetter');
        expect(componentDefinition).toPropsSetterOptionsBe('type', [
            {
                "title": "默认",
                "value": null
            },
            {
                "title": "主色",
                "value": "primary"
            },
            {
                "title": "成功",
                "value": "success"
            },
            {
                "title": "警告",
                "value": "warning"
            },
            {
                "title": "危险",
                "value": "danger"
            },
            {
                "title": "信息",
                "value": "info"
            }
        ]);
    });

    // 测试组件是否有正确的事件绑定
    it('应该有正确的事件绑定', async () => {
        const wrapper = mount(MyButton);
        const comp = wrapper.findComponent({ name: 'el-button' });
        expect(wrapper.emitted('my-click')).toBeUndefined();
        await comp.trigger('click');
        const event = wrapper.emitted('my-click')
        expect(event).toBeTruthy();
        expect(event[0][0].timestamp).toBeTruthy();
    });

    // 测试接口描述中事件的正确性
    it('接口描述中应该有正确的事件定义', () => {
        // 获取nasl.extention.json中指定组件的定义
        const componentDefinition = findComponent(metaData, 'MyButton')[0];
        expect(componentDefinition).toBeDefined();
        expect(componentDefinition).toHaveEvents('my-click');
        // 验证事件参数类型正确性
        expect(componentDefinition).toEventParamsTypeBe('my-click', 'timestamp', 'nasl.core.Integer');
    });

    // 测试传入type属性时是否正确绑定到内部Button组件的type属性上
    it('传入type属性时应该正确传递给内部Button组件', () => {
        const typeValue = 'primary';
        const wrapper = shallowMount(MyButton, {
            propsData: {
                type: typeValue
            }
        });
        const buttonComponent = wrapper.findComponent({ name: 'my-button' });
        expect(buttonComponent.props('type')).toBe(typeValue);
    });

    // 测试 label 属性默认值
    it('能够处理空label的情况', () => {
        const wrapper = mount(MyButton);  
        expect(wrapper.text()).toEqual('按钮');
    });

    // 测试组件是否在pc和h5平台上都能被支持
    it('MyButton能同时支持pc和h5平台', async () => {
        expect(metaData).toBeSupportedOnPlatform('pc', 'MyButton');
        expect(metaData).toBeSupportedOnPlatform('h5', 'MyButton');
    });

});

