({
    baseUrl: "www/js/",
    mainConfigFile: 'www/js/req.js',
    optimize: "uglify",
    uglify: {
        toplevel: true,
        ascii_only: true,
        beautify: false,
        max_line_length: 1000,
        no_mangle: true
    },
    optimizeCss: "none",
    name: 'req',
    preserveLicenseComments: false,
    out: "www/smashApp-built.js"
})
