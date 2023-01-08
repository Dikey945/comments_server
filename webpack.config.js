module.exports = function (webpackEnv) {
    return {
        resolve: {
            fallback: {
                util: require.resolve("util/")
            }
        }
    }
}