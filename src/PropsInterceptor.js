import mapValues from 'lodash/mapValues';
import includes from 'lodash/includes';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import wrapDisplayName from 'recompose/wrapDisplayName';
import setDisplayName from 'recompose/setDisplayName';

const propsInterceptor = (options) => {
    function handler(props) {
        const propNames = Object.keys(props || {});
        return (propWrapper, propWrapperName) => {
            if (includes(propNames, propWrapperName)) {
                return propWrapper(props[propWrapperName], props);
            }

            return propWrapper;
        }
    }

    return (BaseComponent) => {
        let enhancer = compose(
            setDisplayName(wrapDisplayName(BaseComponent, 'PropsInterceptor')),
            mapProps((props) => mapValues(options, handler(props))),
        );

        return enhancer(BaseComponent);
    };
};

export default interceptor;
