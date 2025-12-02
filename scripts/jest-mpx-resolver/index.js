// jest resolver
const path = require("path");

// 用于处理 ?resolve 的问题，目前弃用，原因在 test/transform/resolve.js
module.exports = (reqPath, options) => {
  // 处理路径构建时索引问题
  if (reqPath.includes("?resolve")) {
    if (reqPath.includes("checkbox-group"))
      return path.resolve(__dirname, "./checkbox-group.js");
    if (reqPath.includes("checkbox"))
      return path.resolve(__dirname, "./checkbox.js");
    if (reqPath.includes("tab-bar/tab"))
      return path.resolve(__dirname, "./tab.js");
    if (reqPath.includes("tab-bar/index"))
      return path.resolve(__dirname, "./tab-bar.js");
  }
  return options.defaultResolver(reqPath, {
    ...options,
  });
};
