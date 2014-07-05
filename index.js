var fs = require('fs'),
  util = require('util'),
  os = require('os'),
  log = require('npmlog');

/**
 * Adapted from <https://github.com/npm/npm/blob/master/lib/utils/error-handler.js#L328>
 */
exports.write = function (_log, file) {
  if (!fs.existsSync(file)) throw new Error(file +' does not exist');

  log.silly('npmlog-file', 'Writing log file:', file);
  var out = '';

  _log.record.forEach(function (m) {
    var out = '';
    var pref = [m.id, m.level];
    if (m.prefix) pref.push(m.prefix);
    pref = pref.join(' ');

    m.message
      .trim()
      .split(/\r?\n/).map(function (line) {
        return (pref + ' ' + line).trim();
      })
      .forEach(function (line) {
        out += line + os.EOL;
      });
  });

  fs.writeFileSync(file, out);
};
