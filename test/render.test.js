const test = require("tape");
const h = require("../src/h");
const render = require("../src/render");
require("jsdom-global")();

test("complex example", function (t) {
    document.body.innerHTML = "";
    render(
        h("div", { class: "outer" }, [h("div", { class: "inner" }, ["text"])])
    );

    t.strictEqual(
        document.body.innerHTML,
        '<div class="outer"><div class="inner">text</div></div>'
    );
    document.body.innerHTML = "";
    t.end();
});