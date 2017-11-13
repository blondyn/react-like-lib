module.exports = patch;

function patch ({ parent, newVirtualNode, element, oldVirtualNode }) {
    if (oldVirtualNode) {
        removeExcessiveChildren(oldVirtualNode, newVirtualNode, element);
        if (oldVirtualNode.tag == newVirtualNode.tag) {
            return updateElementData(newVirtualNode, oldVirtualNode, element);
        } else {
            const newElement = createElement(newVirtualNode);
            parent.replaceChild(newElement, element);
            return newElement
        }
    }
    const newElement = createElement(newVirtualNode);
    return parent.appendChild(newElement);
};

function updateElementData (newVirtualNode, oldVirtualNode, element) {
    for (let attr in newVirtualNode.data) {
        if (newVirtualNode.data[attr] !== oldVirtualNode.data[attr]) {
            element.setAttribute(attr, newVirtualNode.data[attr]);
        }
    }

    for (let attr in oldVirtualNode.data) {
        if (newVirtualNode.data[attr] == null) {
            element.removeAttribute(attr);
        }
    }
    return element;
};

function removeExcessiveChildren (oldVirtualNode, newVirtualNode, element) {
    const childrenToRemove = [];
    for (let i = newVirtualNode.children.length; i < oldVirtualNode.children.length; ++i) {
        childrenToRemove.push(element.childNodes[i]);
    }
    childrenToRemove.forEach(child => element.removeChild(child));
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
};