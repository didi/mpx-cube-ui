export function beauty(obj) {
  return JSON.stringify(obj, function(_, value) {
    if (Array.isArray(value)) return JSON.stringify(value).replaceAll("\"", '\'')
    else return value
  }, 2).replaceAll('"[', '[').replaceAll(']"', ']')
}
