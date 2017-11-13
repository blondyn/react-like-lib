module.exports = ({ parent, newVirtualNode })  => {
    let newElement;
    if(newVirtualNode.tag) {
        newElement = document.createElement(newVirtualNode.tag);
    } else {
        newElement = document.createTextNode(newVirtualNode)
    }
    parent.appendChild(newElement);
    return newElement
};