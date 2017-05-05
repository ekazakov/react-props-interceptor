import React from 'react';
import { mount } from 'enzyme';
import noop from 'lodash/noop';
import interceptor from '../PropsInterceptor';

const ComponentFoo = ({ action = noop, ...restProps } = {}) => {
    return <div onClick={() => action('action')} {...restProps}>ComponentFoo</div>;
};

describe('Intercept props actions', () => {
    it('sync props call', () => {
        expect.assertions(2);
        const spy = jest.fn();
        const CompFoo1 = interceptor({
            action: (target) => (...args) => target(...args)
        })(ComponentFoo);
        const wrapper = mount(<CompFoo1 action={spy} />);

        wrapper.simulate('click');
        expect(wrapper.props().action).toBeDefined();
        expect(spy).toBeCalledWith('action');
    });

    it('wrap element with custom name', () => {
        const CompFoo1 = interceptor()(ComponentFoo);
        const wrapper = mount(<CompFoo1 />);

        expect(wrapper.name()).toEqual('PropsInterceptor(ComponentFoo)');
    });

    // it('lifecycle hooks', () => {
    //     expect.assertions(1);
    //     const spy = jest.fn();
    //
    //     const options = {
    //         componentDidMount: spy
    //     };
    //     const CompFoo1 = interceptor(null, options)(ComponentFoo);
    //     mount(<CompFoo1 x="1" y="2" />);
    //     expect(spy).toBeCalled();
    // });

    // it('extends props', () => {
    //     expect.assertions(1);
    //     const CompFoo1 = interceptor({ x: 1 })(ComponentFoo);
    //     const wrapper = mount(<CompFoo1 y={2} />);
    //     expect(wrapper.find('div').props()).toMatchObject({ x: 1, y: 2 })
    // })
});

describe('withAnalytics', () => {
    it('Intercept with sync action', () =>{
        const spy = jest.fn();
        const Foo = analytics({
            action: { action: 'foo' }
        })(ComponentFoo);
        const wrapper = mount(<Foo action={spy}/>);
        wrapper.simulate('click');

    });
});