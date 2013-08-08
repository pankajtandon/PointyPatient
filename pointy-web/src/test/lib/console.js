/**
 * Prevents "console.log is undefined error" in maven build process
 */

if (typeof(console) === 'undefined') {
    console = {
        log: function() {},
        warn: function() {},
        error: function() {}
    };
}
