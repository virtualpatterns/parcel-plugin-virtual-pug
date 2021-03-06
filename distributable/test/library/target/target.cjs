// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"source.pug":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _h = _interopRequireDefault(require("virtual-dom/h.js"));

var _htmlToVdom = _interopRequireDefault(require("html-to-vdom"));

var _vnode = _interopRequireDefault(require("virtual-dom/vnode/vnode.js"));

var _vtext = _interopRequireDefault(require("virtual-dom/vnode/vtext.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Powered by @virtualpatterns/mablung-virtual-pug v0.0.1-13
// FilePath = 'node_modules/@virtualpatterns/mablung-virtual-pug/distributable-commonjs/library/transform.cjs'
const ConvertToVirtualNode = (0, _htmlToVdom.default)({
  VNode: _vnode.default,
  VText: _vtext.default
});

function __getNode(__local = {}, __option = {}) {
  const {
    name
  } = __local;

  function __getNodeName(name) {
    return name;
  }

  function __getNodeProperty(property) {
    let map = {}; // { 'CLASS': 'className', 'FOR': 'htmlFor', 'HTTP-EQUIV': 'httpEquiv' }

    let entry = Object.entries(property);
    entry.sort(([leftName], [rightName]) => leftName.localeCompare(rightName)).forEach(([name, value]) => {
      if (name.toUpperCase() in map) {
        delete property[name];
        property[map[name.toUpperCase()] || name] = value;
      }
    });
    return property;
  }

  function __getChildNode(node) {
    return node;
  }

  function __createNode(name, property, childNode, createNodeFn) {
    name = __getNodeName(name); //

    property = __getNodeProperty(property); //

    childNode = __getChildNode(childNode); //

    return createNodeFn(name, {
      attributes: property
    }, childNode);
  }

  function __getNode(__option = {}) {
    const __node = [];

    __node.push(__createNode('p', {}, (() => {
      const __node = [];

      __node.push(...[__option.convertToNode('Hello, ')].flat());

      {
        let value = name;

        if (typeof value === 'string') {
          __node.push(...[__option.convertToNode(value)].flat());
        } else {
          __node.push(value);
        }
      }

      __node.push(...[__option.convertToNode('!')].flat());

      return __node;
    })(), __option.createNode));

    return __node;
  }

  return __getNode(__option);
}

function _default(__local = {}, __option = {
  createNode: _h.default,
  convertToNode: ConvertToVirtualNode
}) {
  return __getNode(__local, __option);
}
},{}],"source.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _source.default;
  }
});

var _source = _interopRequireDefault(require("./source.pug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./source.pug":"source.pug"}]},{},["source.js"], null)
//# sourceMappingURL=/target.cjs.map