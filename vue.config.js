module.exports = {
    publicPath: process.env.NODE_ENV === "production"
        ? "/bim/dxf"
        : "/",
    transpileDependencies: [
        /[\\\/]node_modules[\\\/]dxf-viewer[\\\/]/
    ]
}
