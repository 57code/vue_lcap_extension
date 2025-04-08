import { JSONPath } from 'jsonpath-plus'

global.findComponent = (json, component, platform = 'pc') => JSONPath({
    json, path: `$.frontends[?(@.type == "${platform}")].viewComponents[?(@.name == "${component}")]`
});

function has(json, path) {
    return JSONPath({ json, path }).length > 0
}
function get(json, path) {
    return JSONPath({ json, path })[0]
}

expect.extend({
    toMetaDataBe(json, path, value) {
        let result = get(json, path), pass;
        if (typeof value === 'object' && value !== null) {
            pass = expect(value).toEqual(result);
        } else {
            pass = expect(value).toBe(result);
        }
        return {
            message: () => pass ? 'meta数据的值符合预期' : 'meta数据的值不符合预期',
            pass
        };
    },
    toHaveMetaData(json, path) {
        let result = get(json, path);
        if (result.length === 0) {
            return {
                message: () => `meta数据不存在`,
                pass: false
            };
        } else {
            return {
                message: () => '有meta数据',
                pass: true
            };
        }
    },
    toHaveProps(json, value) {
        const pass = has(json, `$.props[?(@.name == "${value}")]`)
        return {
            message: () => pass ? `组件props包含指定属性${value}` : `组件props未包含指定属性${value}`,
            pass
        }
    },
    toHavePropsType(json, key, value) {
        const pass = expect(json).toMetaDataBe(`$.props[?(@.name == "${key}")].tsType`, value)
        return {
            message: () => pass ? `组件${value}属性默认值符合预期` : `组件${value}属性默认值不符合预期`,
            pass
        }
    },
    toHavePropsDefaultValue(json, key, value) {
        const pass = expect(json).toMetaDataBe(`$.props[?(@.name == "${key}")].defaultValue.expression.value`, value)
        return {
            message: () => pass ? `组件${value}属性默认值符合预期` : `组件${value}属性默认值不符合预期`,
            pass
        }
    },
    toHavePropsSetter(json, key, value) {
        const pass = expect(json).toMetaDataBe(`$.props[?(@.name == "${key}")].setter.concept`, value)
        return {
            message: () => pass ? '符合预期' : `组件${key}属性设置器类型不符合预期`,
            pass
        }
    },
    toHavePropsSetterOptions(json, value) {
        const pass = has(json, `$.props[?(@.name == "${value}")].setter.options`)
        return {
            message: () => pass ? '符合预期' : `组件${key}属性设置器选项未正确设置`,
            pass
        }
    },
    toPropsSetterOptionsBe(json, key, value) {
        const pass = expect(json).toMetaDataBe(`$.props[?(@.name == "${key}")].setter.options`, value)
        return {
            message: () => pass ? `组件${value}属性选项符合预期` : `组件${value}属性选项设置不符合预期`,
            pass
        }
    },
    toHaveSlots(json, value) {
        return {
            pass: has(json, `$.slots[?(@.name == "${value}")]`)
        }
    },
    toHaveEvents(json, value) {
        const pass = has(json, `$.events[?(@.name == "${value}")]`)
        return {
            message: () => pass ? `组件${value}事件符合预期` : `组件${value}事件设置不符合预期`,
            pass
        }
    },
    toEventParamsTypeBe(json, eventName, params, paramsType) {
        // 可以验证字符串中是否包含指定的key和value
        // 假如tsType是"(e: {\n  timestamp: nasl.core.Integer;\n}) => void"
        // 判断tsType中是否包含timestamp和其类型nasl.core.Integer
        const result = JSONPath({ json, path: `$.events[?(@.name == "${eventName}")].tsType` })
        if (result.length === 0) {
            return {
                message: () => `没有为事件${eventName}设置参数类型`,
                pass: false
            }
        }
        const tsType = result[0];
        const pass = tsType.includes(`${params}: ${paramsType}`) || tsType.includes(`${params}:${paramsType}`)
        return {  
            message: () => pass ? `组件${eventName}事件参数类型符合预期` : `组件${eventName}事件参数类型不符合预期`,
            pass
        }
    },
    toBeSupportedOnPlatform(json, platform, componentName) {
        const result = JSONPath({ json, path: `$.frontends[?(@.type == "${platform}")].viewComponents[?(@.name == "${componentName}")]` })
        const pass = result.length > 0;
        return {
            message: () => pass ? `组件 ${componentName} 在 ${platform} 平台上已被支持` : `组件 ${componentName} 在 ${platform} 平台上未被支持`,
            pass
        };
    }
});