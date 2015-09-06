var React = require('react/addons'),
    assert = require('assert'),
    TodoItem = require('../../common/components/todo-item'),
    TestUtils = React.addons.TestUtils,
    jsdom = require('jsdom').jsdom;

var Testlib = {
    renderJSX: function (jsx, context) {
        return Testlib.renderComponent(React.createClass({
            displayName: 'TestJSX',
            render: function () {return jsx;}
        }), undefined, context);
    },
    renderComponent: function (react, props, context) {
        var rendered;
        global.document = jsdom('<!DOCTYPE html><html><body></body></html>');
        global.window = document.parentWindow;
        rendered = TestUtils.renderIntoDocument(React.createElement(react, props));
        return TestUtils.findRenderedComponentWithType(rendered, react);
    }
};

describe('Todo-item component', function () {
    before('render and locate element', function () {
        var node = Testlib.renderJSX(<TodoItem done={false} name="Write Tutorial"/>);

        // Searching for <input> tag within rendered React component
        // Throws an exception if not found
        var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
          node,
          'input'
        );
        this.inputElement = inputComponent.getDOMNode();
        //console.log(this.inputElement);

    });

    it.skip('should not show coverage info for Todo-item component', function() {
        console.log('test2.jsx is not included in coverage report');
    });

    it('<input> should be of type "checkbox"', function() {
        assert(this.inputElement.getAttribute('type') === 'checkbox');
    });

    it('<input> should not be checked', function() {
        assert(this.inputElement.checked === false);
    });

});