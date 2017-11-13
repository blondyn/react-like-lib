const test = require("tape");
const h = require("../src/h");
const patch = require("../src/patch");
require("jsdom-global")();

test("create new element", t => {
    document.body.innerHTML = "";
    const newElement = patch({parent: document.body, newVirtualNode: h("div")});

    t.strictEqual(document.body.innerHTML, "<div></div>");
    t.strictEqual(newElement.outerHTML, "<div></div>");

    t.end();
});

test("create new text element", t => {
    document.body.innerHTML = "";
    const newElement = patch({parent: document.body, newVirtualNode: "some text"});

    t.strictEqual(document.body.innerHTML, "some text");
    t.strictEqual(newElement.textContent, "some text");

    t.end();
});