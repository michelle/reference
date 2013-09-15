function reference(file) {
  var components = JSON.parse(file);

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

// TODO: sanitize objects. Right now we're assuming well-formed.
function processObj(obj, path) {
  if (!obj.name) {
    throw new Error('Your objects must each have a `name` property: e.g. {"name":"MyObject", ...}');
  }
  var html = '';
  if (!path) {
    // This is a top-level deal.
    html += '<div class="toplevel" id="';
  } else {
    html += '<div class="child" id="';
  }
  html += path + obj.name + '">';
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
    html += '<div class="children">' + process(obj.children, obj.name + '-') + '</div>';
  }

  html += '</div>';
  return html;
}

module.exports = reference;
