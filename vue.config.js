module.exports = {
    publicPath: process.env.NODE_ENV === "production"
        ? "/bim/dxf/viewer"
        : "/",
    transpileDependencies: [
        /[\\\/]node_modules[\\\/]dxf-viewer[\\\/]/
    ]
}
