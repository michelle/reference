// TODO: eventually allow configurable yaml/json, html/md.
function reference(file) {
  try {
    var components = JSON.parse(file);
  } catch (e) {
    throw new Error('Please pass in a JSON file buffer/string.');
  }

  return process(components, '');
}

function process(arr, path) {
  var html = '';

  if (arr.constructor === Array) {
    for (var i = 0, ii = arr.length; i < ii; i += 1) {
      html += processObj(arr[i], path);
    }
  } else {
    html += processObj(arr, path);
  }

  return html;
}

function processObj(obj, path) {
  if (obj.name === undefined) {
    throw new Error('Your objects must each have a `name` property: e.g. {"name":"MyObject", ...}');
  }
  var html = '';
  if (!path) {
    // This is a top-level deal.
    html += '<div class="toplevel" id="';
  } else {
    html += '<div class="child" id="';
  }

  var sanitizedName = sanitize(obj.name.toString());
  path += sanitizedName;
  html += path + '">';
  var name = obj.name;

  if (obj.optional) {
    name = '<span class="optional"><span class="bracket">[</span>' + name;
    name += '<span class="bracket">]</span></span>';
  }
  html += '<span class="name">' + name;

  if (obj.type) {
    html += '<span class="type ' + obj.type + '">' + obj.type + '</span>';
  }

  if (obj.snippet) {
    html += '<span class="snippet">' + obj.snippet + '</span>';
  }

  html += '</span>';

  if (obj.description) {
    html += '<p class="description">' + obj.description + '</p>';
  }

  if (obj.children) {
    html += '<div class="children">' + process(obj.children, path + '-') + '</div>';
  }

  html += '</div>';
  return html;
}

function sanitize(str) {
  str = str.replace(/\s+/g, '_');
  str = str.replace(/[^\w\-]/g, '');
  return str.toLowerCase();
}

module.exports = reference;
