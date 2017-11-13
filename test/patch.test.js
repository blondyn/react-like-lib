const test = require("tape");
const h = require("../src/h");
const patch = require("../src/patch");
require("jsdom-global")();

test("create new element", t => {
    document.body.innerHTML = "";
    const newElement = patch({parent: document.body, newVirtualNode: h("div", {id: "foo"})});

    t.strictEqual(document.body.innerHTML, '<div id="foo"></div>');
    t.strictEqual(newElement.outerHTML, '<div id="foo"></div>');

    t.end();
});

test("create new text element", t => {
    document.body.innerHTML = "";
    const newElement = patch({parent: document.body, newVirtualNode: "some text"});

    t.strictEqual(document.body.innerHTML, "some text");
    t.strictEqual(newElement.textContent, "some text");

    t.end();
});

test("create new element with children assigned", t => {
    document.body.innerHTML = "";
    const newElement = patch({parent: document.body, newVirtualNode: h("div", {id: 'foo'}, ["some text"])});

    t.strictEqual(document.body.innerHTML, '<div id="foo">some text</div>');
    t.strictEqual(newElement.outerHTML, '<div id="foo">some text</div>');

    t.end();
});