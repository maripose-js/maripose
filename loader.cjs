
module.exports = function (code) {
    const callback = this.async();
    import('./dist/loader.js').then(({ default: loader }) => {
        return loader.call(this, this, code, callback);
    });
};