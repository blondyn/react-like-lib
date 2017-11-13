const test = require("tape");
const h = require("../src/h");
const patch = require("../src/patch");
require("jsdom-global")();

test("create new element", t => {
    document.body.innerHTML = "";
    const newElement = patch({ parent: document.body, newVirtualNode: h("div", { id: "foo" }) });

    t.strictEqual(document.body.innerHTML, '<div id="foo"></div>');
    t.strictEqual(newElement.outerHTML, '<div id="foo"></div>');

    t.end();
});

test("create new text element", t => {
    document.body.innerHTML = "";
    const newElement = patch({ parent: document.body, newVirtualNode: "some text" });

    t.strictEqual(document.body.innerHTML, "some text");
    t.strictEqual(newElement.textContent, "some text");

    t.end();
});

test("create new element with a text child", t => {
    document.body.innerHTML = "";
    const newElement = patch({ parent: document.body, newVirtualNode: h("div", { id: 'foo' }, ["some text"]) });

    t.strictEqual(document.body.innerHTML, '<div id="foo">some text</div>');
    t.strictEqual(newElement.outerHTML, '<div id="foo">some text</div>');

    t.end();
});

test("create new element with children elements", t => {
    document.body.innerHTML = "";
    const newElement = patch({
        parent: document.body,
        newVirtualNode: h("div", { id: 'foo' }, [
            "some text",
            h("p", { id: 'paragraph' },
                ["some text 2"])
        ])
    });

    t.strictEqual(document.body.innerHTML, '<div id="foo">some text<p id="paragraph">some text 2</p></div>');
    t.strictEqual(newElement.outerHTML, '<div id="foo">some text<p id="paragraph">some text 2</p></div>');

    t.end();
});

test("replace element with a new one", t => {
    document.body.innerHTML = "<div></div>";
    const newElement = patch({
        parent: document.body,
        newVirtualNode: h("span"),
        element: document.querySelector("div"),
        oldVirtualNode: h("div"),
    });

    t.strictEqual(document.body.innerHTML, "<span></span>");
    t.strictEqual(newElement.outerHTML, "<span></span>");

    t.end();
});


test("update element attributes", t => {
    document.body.innerHTML = '<body><div id="foo"></div></body>';
    const oldElement = document.querySelector("div");
    const newElement = patch({
        parent: document.body,
        element: document.querySelector("div"),
        oldVirtualNode: h("div", {id: 'foo'}),
        newVirtualNode: h("div", {id: "bar", class: "baz"})
    });
    t.strictEqual(document.body.innerHTML, '<div id="bar" class="baz"></div>');
    t.strictEqual(newElement.outerHTML, '<div id="bar" class="baz"></div>');
    t.strictEqual(newElement, oldElement);

    t.end();
});

test("should not update element attributes, when those are not changed", t => {
    document.body.innerHTML = '<body><div id="foo"></div></body>';
    const oldElement = document.querySelector("div");
    oldElement.setAttribute = () => {throw new Error("should not be called")};

    const newElement = patch({
        parent: document.body,
        element: oldElement,
        oldVirtualNode: h("div", {id: 'foo'}),
        newVirtualNode: h("div", {id: "foo"})
    });
    t.strictEqual(document.body.innerHTML, '<div id="foo"></div>');
    t.strictEqual(newElement.outerHTML, '<div id="foo"></div>');
    t.strictEqual(newElement, oldElement);

    t.end();
});

test("should remove element attributes, when those are not changed", t => {
    document.body.innerHTML = '<body><div id="foo"></div></body>';
    const oldElement = document.querySelector("div");
    const newElement = patch({
        parent: document.body,
        element: oldElement,
        oldVirtualNode: h("div", {id: 'foo'}),
        newVirtualNode: h("div", {})
    });
    t.strictEqual(document.body.innerHTML, '<div></div>');
    t.strictEqual(newElement.outerHTML, '<div></div>');
    t.strictEqual(newElement, oldElement);

    t.end();
});

test("should remove excess child nodes", t => {
    document.body.innerHTML = '<body><div><span></span></div></body>';
    const oldElement = document.querySelector("div");
    const newElement = patch({
        parent: document.body,
        element: oldElement,
        oldVirtualNode: h("div", {}, [h("span")]),
        newVirtualNode: h("div")
    });
    t.strictEqual(document.body.innerHTML, '<div></div>');
    t.strictEqual(newElement.outerHTML, '<div></div>');

    t.end();
});
//
// test("patch matching children on update", t => {
//     document.body.innerHTML = '<div><span id="foo"></span></div>';
//     const oldChild = document.querySelector("span");
//     patch({
//         parent: document.body,
//         element: document.querySelector("div"),
//         oldVirtualNode: h("div", {}, [h("span", {id: "foo"})]),
//         newVirtualNode: h("div", {}, [h("span", {id: "bar"})])
//     });
//     const newChild = document.querySelector("span");
//
//     t.strictEqual(document.body.innerHTML, '<div><span id="bar"></span></div>');
//     t.strictEqual(oldChild, newChild);
//
//     t.end();
// });