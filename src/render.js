const patch = require('./patch');
module.exports = function (newVirtualNode) {
    return patch({ parent: document.body, element: null, oldVirtualNode: null, newVirtualNode });
};