import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />)

    })

	it("should render 2 <NavigationItem /> elements if not authenticated", () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2)
    });
    
    it('should render 3 <NavigationItem /> elements if authenticated', ()=>{
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should have the node <NavigationItem link="/">Logout</NavigationItem>', ()=>{
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })

});