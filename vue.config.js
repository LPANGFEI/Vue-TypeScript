module.exports = {
    // 反向代理
    devServer: {
        proxy: {
            // 配置跨域
            '/api': {
                target: 'https://vuets-api.herokuapp.com/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};