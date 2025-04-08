import { mount, shallowMount } from '@vue/test-utils';
import MyPanel from '../components/my-panel';
import fs from 'fs-extra';

describe('MyPanel组件', () => {

    let metaData;

    beforeEach(async () => {
        // 在所有测试用例执行前读取组件数据文件
        metaData = await fs.readJSON('./nasl.extension.json');
    });

    it('组件能正常渲染', () => {
        const wrapper = shallowMount(MyPanel);
        expect(wrapper.exists()).toBe(true);
    });

    
    it('扩展组件为平台提供正确的接口', () => {        
        // 获取nasl.extention.json中指定组件的定义
        const componentDefinition = findComponent(metaData, 'MyPanel')[0];
        expect(componentDefinition).toBeDefined();
        expect(componentDefinition).toHaveMetaData('name', 'MyPanel');
        // 提供`header`、`default`两个插槽作为内容分发
        expect(componentDefinition).toHaveSlots('header');
        expect(componentDefinition).toHaveSlots('default');
        // 提供`canClose`属性，setter为SwitchSetter，类型为nasl.core.Boolean
        expect(componentDefinition).toHaveProps('canClose');
        expect(componentDefinition).toHavePropsSetter('canClose', 'SwitchSetter');
        expect(componentDefinition).toHavePropsType('canClose', 'nasl.core.Boolean');
        expect(componentDefinition).toHavePropsDefaultValue('canClose', 'true');
        
    });

    // 测试组件是否在pc平台上能被支持
    it('MyPanel能同时支持pc和h5平台', async () => {
        expect(metaData).toBeSupportedOnPlatform('pc', 'MyPanel');
    });

});

