// TODO: eventually allow configurable yaml/json, html/md.
function reference(file, options) {
  options = options || {};

  try {
    var components = JSON.parse(file);
  } catch (e) {
    throw new Error('Please pass in a JSON file buffer/string.');
  }

  return process(components, '', options.anchor);
}

function process(arr, path, anchor) {
  var html = '';

  if (arr.constructor === Array) {
    for (var i = 0, ii = arr.length; i < ii; i += 1) {
      html += processObj(arr[i], path, anchor);
    }
  } else {
    html += processObj(arr, path, anchor);
  }

  return html;
}

function processObj(obj, path, anchor) {
  if (obj.name === undefined) {
    throw new Error('Your objects must each have a `name` property: e.g. {"name":"MyObject", ...}');
  }
  var html = '';

  var tags = '';
  if (obj.tags && obj.tags.constructor === Array) {
    for (var i = 0, ii = obj.tags.length; i < ii; i += 1) {
      var tag = sanitize(obj.tags[i].toString());
      tags += tag + ' ';
    }
  }

  if (!path) {
    // This is a top-level deal.
    html += '<div class="toplevel ' + tags + '" id="';
  } else {
    html += '<div class="child ' + tags + '" id="';
  }

  var sanitizedName = sanitize(obj.name.toString());
  path += sanitizedName;
  html += path + '">';
  var name = obj.name;

  if (obj.optional) {
    name = '<span class="optional"><span class="bracket">[</span>' + name;
    name += '<span class="bracket">]</span></span>';
  }

  // Add anchor to name.
  if (anchor) {
    name = '<a href="#' + path + '">' + name + '</a>';
  }
  html += '<span class="name">' + name;

  if (obj.type) {
    html += '<span class="tag type ' + obj.type + '">' + obj.type + '</span>';
  }

  if (obj.tags && obj.tags.constructor === Array) {
    for (var i = 0, ii = obj.tags.length; i < ii; i += 1) {
      var tag = sanitize(obj.tags[i].toString());
      html += '<span class="tag ' + tag + '">' + tag + '</span>';
    }
  }

  if (obj.snippet) {
    html += '<span class="snippet">' + obj.snippet + '</span>';
  }

  html += '</span>';

  if (obj.description) {
    html += '<p class="description">' + obj.description + '</p>';
  }

  if (obj.children) {
    html += '<div class="children">' + process(obj.children, path + '-', anchor) + '</div>';
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
