
module.exports = function (code) {
    const callback = this.async();
    // eslint-disable-next-line node/file-extension-in-import
    import('./dist/loader.js').then(({ default: loader }) => {
        return loader.call(this, this, code, callback);
    });
};