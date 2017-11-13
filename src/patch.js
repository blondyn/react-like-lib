module.exports = patch;

function patch ({ parent, newVirtualNode, element, oldVirtualNode }) {
    const newElement = createElement(newVirtualNode);
    return parent.appendChild(newElement);
};

function createElement (newVirtualNode) {
    if (typeof newVirtualNode === 'string') {
        return document.createTextNode(newVirtualNode)
    }
    return createTagElement(newVirtualNode);
};

function createTagElement (newVirtualNode) {
    const newElement = document.createElement(newVirtualNode.tag);

    Object.keys(newVirtualNode.data).forEach((key) => {
        newElement.setAttribute(`${key}`, newVirtualNode.data[key])
    });

    newVirtualNode.children.forEach(child => {
        patch({ parent: newElement, newVirtualNode: child });
    });
    return newElement;
}