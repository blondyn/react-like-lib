const test = require("tape");
const h = require("../src/h");

test("empty node", function(t) {
    t.deepEqual(h("div"), {tag: "div", data: {}, children: []});
    t.end();
});


test("node with a single child", function(t) {
    t.deepEqual(h("div", {}, ["foo"]), {tag: "div", data: {}, children: ["foo"]});
    t.end();
});