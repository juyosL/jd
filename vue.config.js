module.exports = function () {
    return {
        publicPath: './',
        devServer: {
            open: true,
            port: 8080,
            proxy: {
                '/api': {
                    target: 'http://121.89.205.189/api',  // 老师的
                    changeOrigin: true,
                    ws: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
        }
    }
}
