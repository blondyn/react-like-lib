module.exports = function patch ({ parent, newVirtualNode }) {
    let newElement;
    if (typeof newVirtualNode === 'string') {
        newElement = document.createTextNode(newVirtualNode)
    } else {
        newElement = document.createElement(newVirtualNode.tag);

        Object.keys(newVirtualNode.data).forEach((key) => {
            newElement.setAttribute(`${key}`, newVirtualNode.data[key])
        });

        newVirtualNode.children.forEach(child => {
            patch({parent: newElement, newVirtualNode: child});
        });
    }
    return parent.appendChild(newElement);
};