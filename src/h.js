// React.createElement
module.exports = function tag(tag, data = {}, children = []) {
    return {
        tag,
        data,
        children
    }
};
