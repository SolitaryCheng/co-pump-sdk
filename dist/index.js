"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js"(exports) {
    "use strict";
    exports.read = function(buffer, offset2, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset2 + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset2 + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset2 + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset2, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset2 + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset2 + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset2 + i - d] |= s * 128;
    };
  }
});

// node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string2, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string2, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string2, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array3) {
      const length = array3.length < 0 ? 0 : checked(array3.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array3[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array3, byteOffset, length) {
      if (byteOffset < 0 || array3.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array3.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array3);
      } else if (length === void 0) {
        buf = new Uint8Array(array3, byteOffset);
      } else {
        buf = new Uint8Array(array3, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b) return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer2.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string2, encoding) {
      if (Buffer2.isBuffer(string2)) {
        return string2.length;
      }
      if (ArrayBuffer.isView(string2) || isInstance(string2, ArrayBuffer)) {
        return string2.byteLength;
      }
      if (typeof string2 !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string2
        );
      }
      const len = string2.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string2).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string2).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string2).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString2() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b) {
      if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      let str2 = "";
      const max = exports.INSPECT_MAX_BYTES;
      str2 = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str2 += " ... ";
      return "<Buffer " + str2 + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string2, offset2, length) {
      offset2 = Number(offset2) || 0;
      const remaining = buf.length - offset2;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string2.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string2.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset2 + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string2, offset2, length) {
      return blitBuffer(utf8ToBytes(string2, buf.length - offset2), buf, offset2, length);
    }
    function asciiWrite(buf, string2, offset2, length) {
      return blitBuffer(asciiToBytes(string2), buf, offset2, length);
    }
    function base64Write(buf, string2, offset2, length) {
      return blitBuffer(base64ToBytes(string2), buf, offset2, length);
    }
    function ucs2Write(buf, string2, offset2, length) {
      return blitBuffer(utf16leToBytes(string2, buf.length - offset2), buf, offset2, length);
    }
    Buffer2.prototype.write = function write(string2, offset2, length, encoding) {
      if (offset2 === void 0) {
        encoding = "utf8";
        length = this.length;
        offset2 = 0;
      } else if (length === void 0 && typeof offset2 === "string") {
        encoding = offset2;
        length = this.length;
        offset2 = 0;
      } else if (isFinite(offset2)) {
        offset2 = offset2 >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset2;
      if (length === void 0 || length > remaining) length = remaining;
      if (string2.length > 0 && (length < 0 || offset2 < 0) || offset2 > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string2, offset2, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string2, offset2, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string2, offset2, length);
          case "base64":
            return base64Write(this, string2, offset2, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string2, offset2, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset2, ext, length) {
      if (offset2 % 1 !== 0 || offset2 < 0) throw new RangeError("offset is not uint");
      if (offset2 + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset2, byteLength2, noAssert) {
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset2, byteLength2, this.length);
      let val = this[offset2];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset2 + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset2, byteLength2, noAssert) {
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset2, byteLength2, this.length);
      }
      let val = this[offset2 + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset2 + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 1, this.length);
      return this[offset2];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 2, this.length);
      return this[offset2] | this[offset2 + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 2, this.length);
      return this[offset2] << 8 | this[offset2 + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 4, this.length);
      return (this[offset2] | this[offset2 + 1] << 8 | this[offset2 + 2] << 16) + this[offset2 + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 4, this.length);
      return this[offset2] * 16777216 + (this[offset2 + 1] << 16 | this[offset2 + 2] << 8 | this[offset2 + 3]);
    };
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset2) {
      offset2 = offset2 >>> 0;
      validateNumber(offset2, "offset");
      const first = this[offset2];
      const last = this[offset2 + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset2, this.length - 8);
      }
      const lo = first + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 24;
      const hi = this[++offset2] + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset2) {
      offset2 = offset2 >>> 0;
      validateNumber(offset2, "offset");
      const first = this[offset2];
      const last = this[offset2 + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset2, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + this[++offset2];
      const lo = this[++offset2] * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer2.prototype.readIntLE = function readIntLE(offset2, byteLength2, noAssert) {
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset2, byteLength2, this.length);
      let val = this[offset2];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset2 + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset2, byteLength2, noAssert) {
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset2, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset2 + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset2 + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 1, this.length);
      if (!(this[offset2] & 128)) return this[offset2];
      return (255 - this[offset2] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 2, this.length);
      const val = this[offset2] | this[offset2 + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 2, this.length);
      const val = this[offset2 + 1] | this[offset2] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 4, this.length);
      return this[offset2] | this[offset2 + 1] << 8 | this[offset2 + 2] << 16 | this[offset2 + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 4, this.length);
      return this[offset2] << 24 | this[offset2 + 1] << 16 | this[offset2 + 2] << 8 | this[offset2 + 3];
    };
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset2) {
      offset2 = offset2 >>> 0;
      validateNumber(offset2, "offset");
      const first = this[offset2];
      const last = this[offset2 + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset2, this.length - 8);
      }
      const val = this[offset2 + 4] + this[offset2 + 5] * 2 ** 8 + this[offset2 + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 24);
    });
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset2) {
      offset2 = offset2 >>> 0;
      validateNumber(offset2, "offset");
      const first = this[offset2];
      const last = this[offset2 + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset2, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + this[++offset2];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset2] * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + last);
    });
    Buffer2.prototype.readFloatLE = function readFloatLE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 4, this.length);
      return ieee754.read(this, offset2, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 4, this.length);
      return ieee754.read(this, offset2, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 8, this.length);
      return ieee754.read(this, offset2, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 8, this.length);
      return ieee754.read(this, offset2, false, 52, 8);
    };
    function checkInt(buf, value, offset2, ext, max, min) {
      if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset2 + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset2, byteLength2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset2, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset2] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset2 + i] = value / mul & 255;
      }
      return offset2 + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset2, byteLength2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset2, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset2 + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset2 + i] = value / mul & 255;
      }
      return offset2 + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 1, 255, 0);
      this[offset2] = value & 255;
      return offset2 + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 2, 65535, 0);
      this[offset2] = value & 255;
      this[offset2 + 1] = value >>> 8;
      return offset2 + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 2, 65535, 0);
      this[offset2] = value >>> 8;
      this[offset2 + 1] = value & 255;
      return offset2 + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 4, 4294967295, 0);
      this[offset2 + 3] = value >>> 24;
      this[offset2 + 2] = value >>> 16;
      this[offset2 + 1] = value >>> 8;
      this[offset2] = value & 255;
      return offset2 + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 4, 4294967295, 0);
      this[offset2] = value >>> 24;
      this[offset2 + 1] = value >>> 16;
      this[offset2 + 2] = value >>> 8;
      this[offset2 + 3] = value & 255;
      return offset2 + 4;
    };
    function wrtBigUInt64LE(buf, value, offset2, min, max) {
      checkIntBI(value, min, max, buf, offset2, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset2++] = lo;
      lo = lo >> 8;
      buf[offset2++] = lo;
      lo = lo >> 8;
      buf[offset2++] = lo;
      lo = lo >> 8;
      buf[offset2++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset2++] = hi;
      hi = hi >> 8;
      buf[offset2++] = hi;
      hi = hi >> 8;
      buf[offset2++] = hi;
      hi = hi >> 8;
      buf[offset2++] = hi;
      return offset2;
    }
    function wrtBigUInt64BE(buf, value, offset2, min, max) {
      checkIntBI(value, min, max, buf, offset2, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset2 + 7] = lo;
      lo = lo >> 8;
      buf[offset2 + 6] = lo;
      lo = lo >> 8;
      buf[offset2 + 5] = lo;
      lo = lo >> 8;
      buf[offset2 + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset2 + 3] = hi;
      hi = hi >> 8;
      buf[offset2 + 2] = hi;
      hi = hi >> 8;
      buf[offset2 + 1] = hi;
      hi = hi >> 8;
      buf[offset2] = hi;
      return offset2 + 8;
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset2 = 0) {
      return wrtBigUInt64LE(this, value, offset2, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset2 = 0) {
      return wrtBigUInt64BE(this, value, offset2, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset2, byteLength2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset2, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset2] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset2 + i - 1] !== 0) {
          sub = 1;
        }
        this[offset2 + i] = (value / mul >> 0) - sub & 255;
      }
      return offset2 + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset2, byteLength2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset2, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset2 + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset2 + i + 1] !== 0) {
          sub = 1;
        }
        this[offset2 + i] = (value / mul >> 0) - sub & 255;
      }
      return offset2 + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset2] = value & 255;
      return offset2 + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 2, 32767, -32768);
      this[offset2] = value & 255;
      this[offset2 + 1] = value >>> 8;
      return offset2 + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 2, 32767, -32768);
      this[offset2] = value >>> 8;
      this[offset2 + 1] = value & 255;
      return offset2 + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 4, 2147483647, -2147483648);
      this[offset2] = value & 255;
      this[offset2 + 1] = value >>> 8;
      this[offset2 + 2] = value >>> 16;
      this[offset2 + 3] = value >>> 24;
      return offset2 + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset2] = value >>> 24;
      this[offset2 + 1] = value >>> 16;
      this[offset2 + 2] = value >>> 8;
      this[offset2 + 3] = value & 255;
      return offset2 + 4;
    };
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset2 = 0) {
      return wrtBigUInt64LE(this, value, offset2, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset2 = 0) {
      return wrtBigUInt64BE(this, value, offset2, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset2, ext, max, min) {
      if (offset2 + ext > buf.length) throw new RangeError("Index out of range");
      if (offset2 < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset2, littleEndian, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset2, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset2, littleEndian, 23, 4);
      return offset2 + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset2, noAssert) {
      return writeFloat(this, value, offset2, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset2, noAssert) {
      return writeFloat(this, value, offset2, false, noAssert);
    };
    function writeDouble(buf, value, offset2, littleEndian, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset2, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset2, littleEndian, 52, 8);
      return offset2 + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset2, noAssert) {
      return writeDouble(this, value, offset2, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset2, noAssert) {
      return writeDouble(this, value, offset2, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str2, range, input) {
        let msg = `The value of "${str2}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset2, byteLength2) {
      validateNumber(offset2, "offset");
      if (buf[offset2] === void 0 || buf[offset2 + byteLength2] === void 0) {
        boundsError(offset2, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset2, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset2, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type2) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type2);
        throw new errors.ERR_OUT_OF_RANGE(type2 || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type2 || "offset",
        `>= ${type2 ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str2) {
      str2 = str2.split("=")[0];
      str2 = str2.trim().replace(INVALID_BASE64_RE, "");
      if (str2.length < 2) return "";
      while (str2.length % 4 !== 0) {
        str2 = str2 + "=";
      }
      return str2;
    }
    function utf8ToBytes(string2, units) {
      units = units || Infinity;
      let codePoint;
      const length = string2.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string2.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str2) {
      const byteArray = [];
      for (let i = 0; i < str2.length; ++i) {
        byteArray.push(str2.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str2, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str2.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str2.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str2) {
      return base64.toByteArray(base64clean(str2));
    }
    function blitBuffer(src, dst, offset2, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset2 >= dst.length || i >= src.length) break;
        dst[i + offset2] = src[i];
      }
      return i;
    }
    function isInstance(obj, type2) {
      return obj instanceof type2 || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type2.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i162 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i162 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js"(exports, module2) {
    "use strict";
    var buffer = require_buffer();
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/.pnpm/base-x@3.0.11/node_modules/base-x/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/base-x@3.0.11/node_modules/base-x/src/index.js"(exports, module2) {
    "use strict";
    var _Buffer = require_safe_buffer().Buffer;
    function base(ALPHABET) {
      if (ALPHABET.length >= 255) {
        throw new TypeError("Alphabet too long");
      }
      var BASE_MAP = new Uint8Array(256);
      for (var j = 0; j < BASE_MAP.length; j++) {
        BASE_MAP[j] = 255;
      }
      for (var i = 0; i < ALPHABET.length; i++) {
        var x = ALPHABET.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
          throw new TypeError(x + " is ambiguous");
        }
        BASE_MAP[xc] = i;
      }
      var BASE = ALPHABET.length;
      var LEADER = ALPHABET.charAt(0);
      var FACTOR = Math.log(BASE) / Math.log(256);
      var iFACTOR = Math.log(256) / Math.log(BASE);
      function encode(source) {
        if (Array.isArray(source) || source instanceof Uint8Array) {
          source = _Buffer.from(source);
        }
        if (!_Buffer.isBuffer(source)) {
          throw new TypeError("Expected Buffer");
        }
        if (source.length === 0) {
          return "";
        }
        var zeroes = 0;
        var length = 0;
        var pbegin = 0;
        var pend = source.length;
        while (pbegin !== pend && source[pbegin] === 0) {
          pbegin++;
          zeroes++;
        }
        var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
        var b58 = new Uint8Array(size);
        while (pbegin !== pend) {
          var carry = source[pbegin];
          var i2 = 0;
          for (var it1 = size - 1; (carry !== 0 || i2 < length) && it1 !== -1; it1--, i2++) {
            carry += 256 * b58[it1] >>> 0;
            b58[it1] = carry % BASE >>> 0;
            carry = carry / BASE >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          pbegin++;
        }
        var it2 = size - length;
        while (it2 !== size && b58[it2] === 0) {
          it2++;
        }
        var str2 = LEADER.repeat(zeroes);
        for (; it2 < size; ++it2) {
          str2 += ALPHABET.charAt(b58[it2]);
        }
        return str2;
      }
      function decodeUnsafe(source) {
        if (typeof source !== "string") {
          throw new TypeError("Expected String");
        }
        if (source.length === 0) {
          return _Buffer.alloc(0);
        }
        var psz = 0;
        var zeroes = 0;
        var length = 0;
        while (source[psz] === LEADER) {
          zeroes++;
          psz++;
        }
        var size = (source.length - psz) * FACTOR + 1 >>> 0;
        var b256 = new Uint8Array(size);
        while (psz < source.length) {
          var charCode = source.charCodeAt(psz);
          if (charCode > 255) {
            return;
          }
          var carry = BASE_MAP[charCode];
          if (carry === 255) {
            return;
          }
          var i2 = 0;
          for (var it3 = size - 1; (carry !== 0 || i2 < length) && it3 !== -1; it3--, i2++) {
            carry += BASE * b256[it3] >>> 0;
            b256[it3] = carry % 256 >>> 0;
            carry = carry / 256 >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          psz++;
        }
        var it4 = size - length;
        while (it4 !== size && b256[it4] === 0) {
          it4++;
        }
        var vch = _Buffer.allocUnsafe(zeroes + (size - it4));
        vch.fill(0, 0, zeroes);
        var j2 = zeroes;
        while (it4 !== size) {
          vch[j2++] = b256[it4++];
        }
        return vch;
      }
      function decode2(string2) {
        var buffer = decodeUnsafe(string2);
        if (buffer) {
          return buffer;
        }
        throw new Error("Non-base" + BASE + " character");
      }
      return {
        encode,
        decodeUnsafe,
        decode: decode2
      };
    }
    module2.exports = base;
  }
});

// node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js
var require_bs58 = __commonJS({
  "node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js"(exports, module2) {
    "use strict";
    var basex = require_src();
    var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    module2.exports = basex(ALPHABET);
  }
});

// node_modules/.pnpm/camelcase@6.3.0/node_modules/camelcase/index.js
var require_camelcase = __commonJS({
  "node_modules/.pnpm/camelcase@6.3.0/node_modules/camelcase/index.js"(exports, module2) {
    "use strict";
    var UPPERCASE = /[\p{Lu}]/u;
    var LOWERCASE = /[\p{Ll}]/u;
    var LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
    var IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
    var SEPARATORS = /[_.\- ]+/;
    var LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
    var SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
    var NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");
    var preserveCamelCase = (string2, toLowerCase, toUpperCase) => {
      let isLastCharLower = false;
      let isLastCharUpper = false;
      let isLastLastCharUpper = false;
      for (let i = 0; i < string2.length; i++) {
        const character = string2[i];
        if (isLastCharLower && UPPERCASE.test(character)) {
          string2 = string2.slice(0, i) + "-" + string2.slice(i);
          isLastCharLower = false;
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = true;
          i++;
        } else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
          string2 = string2.slice(0, i - 1) + "-" + string2.slice(i - 1);
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = false;
          isLastCharLower = true;
        } else {
          isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
        }
      }
      return string2;
    };
    var preserveConsecutiveUppercase = (input, toLowerCase) => {
      LEADING_CAPITAL.lastIndex = 0;
      return input.replace(LEADING_CAPITAL, (m1) => toLowerCase(m1));
    };
    var postProcess = (input, toUpperCase) => {
      SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
      NUMBERS_AND_IDENTIFIER.lastIndex = 0;
      return input.replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier)).replace(NUMBERS_AND_IDENTIFIER, (m) => toUpperCase(m));
    };
    var camelCase2 = (input, options) => {
      if (!(typeof input === "string" || Array.isArray(input))) {
        throw new TypeError("Expected the input to be `string | string[]`");
      }
      options = {
        pascalCase: false,
        preserveConsecutiveUppercase: false,
        ...options
      };
      if (Array.isArray(input)) {
        input = input.map((x) => x.trim()).filter((x) => x.length).join("-");
      } else {
        input = input.trim();
      }
      if (input.length === 0) {
        return "";
      }
      const toLowerCase = options.locale === false ? (string2) => string2.toLowerCase() : (string2) => string2.toLocaleLowerCase(options.locale);
      const toUpperCase = options.locale === false ? (string2) => string2.toUpperCase() : (string2) => string2.toLocaleUpperCase(options.locale);
      if (input.length === 1) {
        return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
      }
      const hasUpperCase = input !== toLowerCase(input);
      if (hasUpperCase) {
        input = preserveCamelCase(input, toLowerCase, toUpperCase);
      }
      input = input.replace(LEADING_SEPARATORS, "");
      if (options.preserveConsecutiveUppercase) {
        input = preserveConsecutiveUppercase(input, toLowerCase);
      } else {
        input = toLowerCase(input);
      }
      if (options.pascalCase) {
        input = toUpperCase(input.charAt(0)) + input.slice(1);
      }
      return postProcess(input, toUpperCase);
    };
    module2.exports = camelCase2;
    module2.exports.default = camelCase2;
  }
});

// node_modules/.pnpm/buffer-layout@1.2.2/node_modules/buffer-layout/lib/Layout.js
var require_Layout = __commonJS({
  "node_modules/.pnpm/buffer-layout@1.2.2/node_modules/buffer-layout/lib/Layout.js"(exports) {
    "use strict";
    var Layout2 = class {
      constructor(span, property) {
        if (!Number.isInteger(span)) {
          throw new TypeError("span must be an integer");
        }
        this.span = span;
        this.property = property;
      }
      /** Function to create an Object into which decoded properties will
       * be written.
       *
       * Used only for layouts that {@link Layout#decode|decode} to Object
       * instances, which means:
       * * {@link Structure}
       * * {@link Union}
       * * {@link VariantLayout}
       * * {@link BitStructure}
       *
       * If left undefined the JavaScript representation of these layouts
       * will be Object instances.
       *
       * See {@link bindConstructorLayout}.
       */
      makeDestinationObject() {
        return {};
      }
      /**
       * Decode from a Buffer into an JavaScript value.
       *
       * @param {Buffer} b - the buffer from which encoded data is read.
       *
       * @param {Number} [offset] - the offset at which the encoded data
       * starts.  If absent a zero offset is inferred.
       *
       * @returns {(Number|Array|Object)} - the value of the decoded data.
       *
       * @abstract
       */
      decode(b, offset2) {
        throw new Error("Layout is abstract");
      }
      /**
       * Encode a JavaScript value into a Buffer.
       *
       * @param {(Number|Array|Object)} src - the value to be encoded into
       * the buffer.  The type accepted depends on the (sub-)type of {@link
       * Layout}.
       *
       * @param {Buffer} b - the buffer into which encoded data will be
       * written.
       *
       * @param {Number} [offset] - the offset at which the encoded data
       * starts.  If absent a zero offset is inferred.
       *
       * @returns {Number} - the number of bytes encoded, including the
       * space skipped for internal padding, but excluding data such as
       * {@link Sequence#count|lengths} when stored {@link
       * ExternalLayout|externally}.  This is the adjustment to `offset`
       * producing the offset where data for the next layout would be
       * written.
       *
       * @abstract
       */
      encode(src, b, offset2) {
        throw new Error("Layout is abstract");
      }
      /**
       * Calculate the span of a specific instance of a layout.
       *
       * @param {Buffer} b - the buffer that contains an encoded instance.
       *
       * @param {Number} [offset] - the offset at which the encoded instance
       * starts.  If absent a zero offset is inferred.
       *
       * @return {Number} - the number of bytes covered by the layout
       * instance.  If this method is not overridden in a subclass the
       * definition-time constant {@link Layout#span|span} will be
       * returned.
       *
       * @throws {RangeError} - if the length of the value cannot be
       * determined.
       */
      getSpan(b, offset2) {
        if (0 > this.span) {
          throw new RangeError("indeterminate span");
        }
        return this.span;
      }
      /**
       * Replicate the layout using a new property.
       *
       * This function must be used to get a structurally-equivalent layout
       * with a different name since all {@link Layout} instances are
       * immutable.
       *
       * **NOTE** This is a shallow copy.  All fields except {@link
       * Layout#property|property} are strictly equal to the origin layout.
       *
       * @param {String} property - the value for {@link
       * Layout#property|property} in the replica.
       *
       * @returns {Layout} - the copy with {@link Layout#property|property}
       * set to `property`.
       */
      replicate(property) {
        const rv = Object.create(this.constructor.prototype);
        Object.assign(rv, this);
        rv.property = property;
        return rv;
      }
      /**
       * Create an object from layout properties and an array of values.
       *
       * **NOTE** This function returns `undefined` if invoked on a layout
       * that does not return its value as an Object.  Objects are
       * returned for things that are a {@link Structure}, which includes
       * {@link VariantLayout|variant layouts} if they are structures, and
       * excludes {@link Union}s.  If you want this feature for a union
       * you must use {@link Union.getVariant|getVariant} to select the
       * desired layout.
       *
       * @param {Array} values - an array of values that correspond to the
       * default order for properties.  As with {@link Layout#decode|decode}
       * layout elements that have no property name are skipped when
       * iterating over the array values.  Only the top-level properties are
       * assigned; arguments are not assigned to properties of contained
       * layouts.  Any unused values are ignored.
       *
       * @return {(Object|undefined)}
       */
      fromArray(values) {
        return void 0;
      }
    };
    exports.Layout = Layout2;
    function nameWithProperty2(name, lo) {
      if (lo.property) {
        return name + "[" + lo.property + "]";
      }
      return name;
    }
    exports.nameWithProperty = nameWithProperty2;
    function bindConstructorLayout(Class, layout) {
      if ("function" !== typeof Class) {
        throw new TypeError("Class must be constructor");
      }
      if (Class.hasOwnProperty("layout_")) {
        throw new Error("Class is already bound to a layout");
      }
      if (!(layout && layout instanceof Layout2)) {
        throw new TypeError("layout must be a Layout");
      }
      if (layout.hasOwnProperty("boundConstructor_")) {
        throw new Error("layout is already bound to a constructor");
      }
      Class.layout_ = layout;
      layout.boundConstructor_ = Class;
      layout.makeDestinationObject = () => new Class();
      Object.defineProperty(Class.prototype, "encode", {
        value: function(b, offset2) {
          return layout.encode(this, b, offset2);
        },
        writable: true
      });
      Object.defineProperty(Class, "decode", {
        value: function(b, offset2) {
          return layout.decode(b, offset2);
        },
        writable: true
      });
    }
    exports.bindConstructorLayout = bindConstructorLayout;
    var ExternalLayout2 = class extends Layout2 {
      /**
       * Return `true` iff the external layout decodes to an unsigned
       * integer layout.
       *
       * In that case it can be used as the source of {@link
       * Sequence#count|Sequence counts}, {@link Blob#length|Blob lengths},
       * or as {@link UnionLayoutDiscriminator#layout|external union
       * discriminators}.
       *
       * @abstract
       */
      isCount() {
        throw new Error("ExternalLayout is abstract");
      }
    };
    var GreedyCount = class extends ExternalLayout2 {
      constructor(elementSpan, property) {
        if (void 0 === elementSpan) {
          elementSpan = 1;
        }
        if (!Number.isInteger(elementSpan) || 0 >= elementSpan) {
          throw new TypeError("elementSpan must be a (positive) integer");
        }
        super(-1, property);
        this.elementSpan = elementSpan;
      }
      /** @override */
      isCount() {
        return true;
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const rem = b.length - offset2;
        return Math.floor(rem / this.elementSpan);
      }
      /** @override */
      encode(src, b, offset2) {
        return 0;
      }
    };
    var OffsetLayout2 = class extends ExternalLayout2 {
      constructor(layout, offset2, property) {
        if (!(layout instanceof Layout2)) {
          throw new TypeError("layout must be a Layout");
        }
        if (void 0 === offset2) {
          offset2 = 0;
        } else if (!Number.isInteger(offset2)) {
          throw new TypeError("offset must be integer or undefined");
        }
        super(layout.span, property || layout.property);
        this.layout = layout;
        this.offset = offset2;
      }
      /** @override */
      isCount() {
        return this.layout instanceof UInt2 || this.layout instanceof UIntBE2;
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        return this.layout.decode(b, offset2 + this.offset);
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        return this.layout.encode(src, b, offset2 + this.offset);
      }
    };
    var UInt2 = class extends Layout2 {
      constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        return b.readUIntLE(offset2, this.span);
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        b.writeUIntLE(src, offset2, this.span);
        return this.span;
      }
    };
    var UIntBE2 = class extends Layout2 {
      constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        return b.readUIntBE(offset2, this.span);
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        b.writeUIntBE(src, offset2, this.span);
        return this.span;
      }
    };
    var Int = class extends Layout2 {
      constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        return b.readIntLE(offset2, this.span);
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        b.writeIntLE(src, offset2, this.span);
        return this.span;
      }
    };
    var IntBE = class extends Layout2 {
      constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        return b.readIntBE(offset2, this.span);
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        b.writeIntBE(src, offset2, this.span);
        return this.span;
      }
    };
    var V2E322 = Math.pow(2, 32);
    function divmodInt642(src) {
      const hi32 = Math.floor(src / V2E322);
      const lo32 = src - hi32 * V2E322;
      return { hi32, lo32 };
    }
    function roundedInt642(hi32, lo32) {
      return hi32 * V2E322 + lo32;
    }
    var NearUInt642 = class extends Layout2 {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const lo32 = b.readUInt32LE(offset2);
        const hi32 = b.readUInt32LE(offset2 + 4);
        return roundedInt642(hi32, lo32);
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const split = divmodInt642(src);
        b.writeUInt32LE(split.lo32, offset2);
        b.writeUInt32LE(split.hi32, offset2 + 4);
        return 8;
      }
    };
    var NearUInt64BE = class extends Layout2 {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const hi32 = b.readUInt32BE(offset2);
        const lo32 = b.readUInt32BE(offset2 + 4);
        return roundedInt642(hi32, lo32);
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const split = divmodInt642(src);
        b.writeUInt32BE(split.hi32, offset2);
        b.writeUInt32BE(split.lo32, offset2 + 4);
        return 8;
      }
    };
    var NearInt642 = class extends Layout2 {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const lo32 = b.readUInt32LE(offset2);
        const hi32 = b.readInt32LE(offset2 + 4);
        return roundedInt642(hi32, lo32);
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const split = divmodInt642(src);
        b.writeUInt32LE(split.lo32, offset2);
        b.writeInt32LE(split.hi32, offset2 + 4);
        return 8;
      }
    };
    var NearInt64BE = class extends Layout2 {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const hi32 = b.readInt32BE(offset2);
        const lo32 = b.readUInt32BE(offset2 + 4);
        return roundedInt642(hi32, lo32);
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const split = divmodInt642(src);
        b.writeInt32BE(split.hi32, offset2);
        b.writeUInt32BE(split.lo32, offset2 + 4);
        return 8;
      }
    };
    var Float = class extends Layout2 {
      constructor(property) {
        super(4, property);
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        return b.readFloatLE(offset2);
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        b.writeFloatLE(src, offset2);
        return 4;
      }
    };
    var FloatBE = class extends Layout2 {
      constructor(property) {
        super(4, property);
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        return b.readFloatBE(offset2);
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        b.writeFloatBE(src, offset2);
        return 4;
      }
    };
    var Double = class extends Layout2 {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        return b.readDoubleLE(offset2);
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        b.writeDoubleLE(src, offset2);
        return 8;
      }
    };
    var DoubleBE = class extends Layout2 {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        return b.readDoubleBE(offset2);
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        b.writeDoubleBE(src, offset2);
        return 8;
      }
    };
    var Sequence = class extends Layout2 {
      constructor(elementLayout, count, property) {
        if (!(elementLayout instanceof Layout2)) {
          throw new TypeError("elementLayout must be a Layout");
        }
        if (!(count instanceof ExternalLayout2 && count.isCount() || Number.isInteger(count) && 0 <= count)) {
          throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");
        }
        let span = -1;
        if (!(count instanceof ExternalLayout2) && 0 < elementLayout.span) {
          span = count * elementLayout.span;
        }
        super(span, property);
        this.elementLayout = elementLayout;
        this.count = count;
      }
      /** @override */
      getSpan(b, offset2) {
        if (0 <= this.span) {
          return this.span;
        }
        if (void 0 === offset2) {
          offset2 = 0;
        }
        let span = 0;
        let count = this.count;
        if (count instanceof ExternalLayout2) {
          count = count.decode(b, offset2);
        }
        if (0 < this.elementLayout.span) {
          span = count * this.elementLayout.span;
        } else {
          let idx = 0;
          while (idx < count) {
            span += this.elementLayout.getSpan(b, offset2 + span);
            ++idx;
          }
        }
        return span;
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const rv = [];
        let i = 0;
        let count = this.count;
        if (count instanceof ExternalLayout2) {
          count = count.decode(b, offset2);
        }
        while (i < count) {
          rv.push(this.elementLayout.decode(b, offset2));
          offset2 += this.elementLayout.getSpan(b, offset2);
          i += 1;
        }
        return rv;
      }
      /** Implement {@link Layout#encode|encode} for {@link Sequence}.
       *
       * **NOTE** If `src` is shorter than {@link Sequence#count|count} then
       * the unused space in the buffer is left unchanged.  If `src` is
       * longer than {@link Sequence#count|count} the unneeded elements are
       * ignored.
       *
       * **NOTE** If {@link Layout#count|count} is an instance of {@link
       * ExternalLayout} then the length of `src` will be encoded as the
       * count after `src` is encoded. */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const elo = this.elementLayout;
        const span = src.reduce((span2, v) => {
          return span2 + elo.encode(v, b, offset2 + span2);
        }, 0);
        if (this.count instanceof ExternalLayout2) {
          this.count.encode(src.length, b, offset2);
        }
        return span;
      }
    };
    var Structure2 = class extends Layout2 {
      constructor(fields, property, decodePrefixes) {
        if (!(Array.isArray(fields) && fields.reduce((acc, v) => acc && v instanceof Layout2, true))) {
          throw new TypeError("fields must be array of Layout instances");
        }
        if ("boolean" === typeof property && void 0 === decodePrefixes) {
          decodePrefixes = property;
          property = void 0;
        }
        for (const fd of fields) {
          if (0 > fd.span && void 0 === fd.property) {
            throw new Error("fields cannot contain unnamed variable-length layout");
          }
        }
        let span = -1;
        try {
          span = fields.reduce((span2, fd) => span2 + fd.getSpan(), 0);
        } catch (e) {
        }
        super(span, property);
        this.fields = fields;
        this.decodePrefixes = !!decodePrefixes;
      }
      /** @override */
      getSpan(b, offset2) {
        if (0 <= this.span) {
          return this.span;
        }
        if (void 0 === offset2) {
          offset2 = 0;
        }
        let span = 0;
        try {
          span = this.fields.reduce((span2, fd) => {
            const fsp = fd.getSpan(b, offset2);
            offset2 += fsp;
            return span2 + fsp;
          }, 0);
        } catch (e) {
          throw new RangeError("indeterminate span");
        }
        return span;
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const dest = this.makeDestinationObject();
        for (const fd of this.fields) {
          if (void 0 !== fd.property) {
            dest[fd.property] = fd.decode(b, offset2);
          }
          offset2 += fd.getSpan(b, offset2);
          if (this.decodePrefixes && b.length === offset2) {
            break;
          }
        }
        return dest;
      }
      /** Implement {@link Layout#encode|encode} for {@link Structure}.
       *
       * If `src` is missing a property for a member with a defined {@link
       * Layout#property|property} the corresponding region of the buffer is
       * left unmodified. */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const firstOffset = offset2;
        let lastOffset = 0;
        let lastWrote = 0;
        for (const fd of this.fields) {
          let span = fd.span;
          lastWrote = 0 < span ? span : 0;
          if (void 0 !== fd.property) {
            const fv = src[fd.property];
            if (void 0 !== fv) {
              lastWrote = fd.encode(fv, b, offset2);
              if (0 > span) {
                span = fd.getSpan(b, offset2);
              }
            }
          }
          lastOffset = offset2;
          offset2 += span;
        }
        return lastOffset + lastWrote - firstOffset;
      }
      /** @override */
      fromArray(values) {
        const dest = this.makeDestinationObject();
        for (const fd of this.fields) {
          if (void 0 !== fd.property && 0 < values.length) {
            dest[fd.property] = values.shift();
          }
        }
        return dest;
      }
      /**
       * Get access to the layout of a given property.
       *
       * @param {String} property - the structure member of interest.
       *
       * @return {Layout} - the layout associated with `property`, or
       * undefined if there is no such property.
       */
      layoutFor(property) {
        if ("string" !== typeof property) {
          throw new TypeError("property must be string");
        }
        for (const fd of this.fields) {
          if (fd.property === property) {
            return fd;
          }
        }
      }
      /**
       * Get the offset of a structure member.
       *
       * @param {String} property - the structure member of interest.
       *
       * @return {Number} - the offset in bytes to the start of `property`
       * within the structure, or undefined if `property` is not a field
       * within the structure.  If the property is a member but follows a
       * variable-length structure member a negative number will be
       * returned.
       */
      offsetOf(property) {
        if ("string" !== typeof property) {
          throw new TypeError("property must be string");
        }
        let offset2 = 0;
        for (const fd of this.fields) {
          if (fd.property === property) {
            return offset2;
          }
          if (0 > fd.span) {
            offset2 = -1;
          } else if (0 <= offset2) {
            offset2 += fd.span;
          }
        }
      }
    };
    var UnionDiscriminator2 = class {
      constructor(property) {
        this.property = property;
      }
      /** Analog to {@link Layout#decode|Layout decode} for union discriminators.
       *
       * The implementation of this method need not reference the buffer if
       * variant information is available through other means. */
      decode() {
        throw new Error("UnionDiscriminator is abstract");
      }
      /** Analog to {@link Layout#decode|Layout encode} for union discriminators.
       *
       * The implementation of this method need not store the value if
       * variant information is maintained through other means. */
      encode() {
        throw new Error("UnionDiscriminator is abstract");
      }
    };
    var UnionLayoutDiscriminator2 = class extends UnionDiscriminator2 {
      constructor(layout, property) {
        if (!(layout instanceof ExternalLayout2 && layout.isCount())) {
          throw new TypeError("layout must be an unsigned integer ExternalLayout");
        }
        super(property || layout.property || "variant");
        this.layout = layout;
      }
      /** Delegate decoding to {@link UnionLayoutDiscriminator#layout|layout}. */
      decode(b, offset2) {
        return this.layout.decode(b, offset2);
      }
      /** Delegate encoding to {@link UnionLayoutDiscriminator#layout|layout}. */
      encode(src, b, offset2) {
        return this.layout.encode(src, b, offset2);
      }
    };
    var Union2 = class extends Layout2 {
      constructor(discr, defaultLayout, property) {
        const upv = discr instanceof UInt2 || discr instanceof UIntBE2;
        if (upv) {
          discr = new UnionLayoutDiscriminator2(new OffsetLayout2(discr));
        } else if (discr instanceof ExternalLayout2 && discr.isCount()) {
          discr = new UnionLayoutDiscriminator2(discr);
        } else if (!(discr instanceof UnionDiscriminator2)) {
          throw new TypeError("discr must be a UnionDiscriminator or an unsigned integer layout");
        }
        if (void 0 === defaultLayout) {
          defaultLayout = null;
        }
        if (!(null === defaultLayout || defaultLayout instanceof Layout2)) {
          throw new TypeError("defaultLayout must be null or a Layout");
        }
        if (null !== defaultLayout) {
          if (0 > defaultLayout.span) {
            throw new Error("defaultLayout must have constant span");
          }
          if (void 0 === defaultLayout.property) {
            defaultLayout = defaultLayout.replicate("content");
          }
        }
        let span = -1;
        if (defaultLayout) {
          span = defaultLayout.span;
          if (0 <= span && upv) {
            span += discr.layout.span;
          }
        }
        super(span, property);
        this.discriminator = discr;
        this.usesPrefixDiscriminator = upv;
        this.defaultLayout = defaultLayout;
        this.registry = {};
        let boundGetSourceVariant = this.defaultGetSourceVariant.bind(this);
        this.getSourceVariant = function(src) {
          return boundGetSourceVariant(src);
        };
        this.configGetSourceVariant = function(gsv) {
          boundGetSourceVariant = gsv.bind(this);
        };
      }
      /** @override */
      getSpan(b, offset2) {
        if (0 <= this.span) {
          return this.span;
        }
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const vlo = this.getVariant(b, offset2);
        if (!vlo) {
          throw new Error("unable to determine span for unrecognized variant");
        }
        return vlo.getSpan(b, offset2);
      }
      /**
       * Method to infer a registered Union variant compatible with `src`.
       *
       * The first satisified rule in the following sequence defines the
       * return value:
       * * If `src` has properties matching the Union discriminator and
       *   the default layout, `undefined` is returned regardless of the
       *   value of the discriminator property (this ensures the default
       *   layout will be used);
       * * If `src` has a property matching the Union discriminator, the
       *   value of the discriminator identifies a registered variant, and
       *   either (a) the variant has no layout, or (b) `src` has the
       *   variant's property, then the variant is returned (because the
       *   source satisfies the constraints of the variant it identifies);
       * * If `src` does not have a property matching the Union
       *   discriminator, but does have a property matching a registered
       *   variant, then the variant is returned (because the source
       *   matches a variant without an explicit conflict);
       * * An error is thrown (because we either can't identify a variant,
       *   or we were explicitly told the variant but can't satisfy it).
       *
       * @param {Object} src - an object presumed to be compatible with
       * the content of the Union.
       *
       * @return {(undefined|VariantLayout)} - as described above.
       *
       * @throws {Error} - if `src` cannot be associated with a default or
       * registered variant.
       */
      defaultGetSourceVariant(src) {
        if (src.hasOwnProperty(this.discriminator.property)) {
          if (this.defaultLayout && src.hasOwnProperty(this.defaultLayout.property)) {
            return void 0;
          }
          const vlo = this.registry[src[this.discriminator.property]];
          if (vlo && (!vlo.layout || src.hasOwnProperty(vlo.property))) {
            return vlo;
          }
        } else {
          for (const tag in this.registry) {
            const vlo = this.registry[tag];
            if (src.hasOwnProperty(vlo.property)) {
              return vlo;
            }
          }
        }
        throw new Error("unable to infer src variant");
      }
      /** Implement {@link Layout#decode|decode} for {@link Union}.
       *
       * If the variant is {@link Union#addVariant|registered} the return
       * value is an instance of that variant, with no explicit
       * discriminator.  Otherwise the {@link Union#defaultLayout|default
       * layout} is used to decode the content. */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        let dest;
        const dlo = this.discriminator;
        const discr = dlo.decode(b, offset2);
        let clo = this.registry[discr];
        if (void 0 === clo) {
          let contentOffset = 0;
          clo = this.defaultLayout;
          if (this.usesPrefixDiscriminator) {
            contentOffset = dlo.layout.span;
          }
          dest = this.makeDestinationObject();
          dest[dlo.property] = discr;
          dest[clo.property] = this.defaultLayout.decode(b, offset2 + contentOffset);
        } else {
          dest = clo.decode(b, offset2);
        }
        return dest;
      }
      /** Implement {@link Layout#encode|encode} for {@link Union}.
       *
       * This API assumes the `src` object is consistent with the union's
       * {@link Union#defaultLayout|default layout}.  To encode variants
       * use the appropriate variant-specific {@link VariantLayout#encode}
       * method. */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const vlo = this.getSourceVariant(src);
        if (void 0 === vlo) {
          const dlo = this.discriminator;
          const clo = this.defaultLayout;
          let contentOffset = 0;
          if (this.usesPrefixDiscriminator) {
            contentOffset = dlo.layout.span;
          }
          dlo.encode(src[dlo.property], b, offset2);
          return contentOffset + clo.encode(
            src[clo.property],
            b,
            offset2 + contentOffset
          );
        }
        return vlo.encode(src, b, offset2);
      }
      /** Register a new variant structure within a union.  The newly
       * created variant is returned.
       *
       * @param {Number} variant - initializer for {@link
       * VariantLayout#variant|variant}.
       *
       * @param {Layout} layout - initializer for {@link
       * VariantLayout#layout|layout}.
       *
       * @param {String} property - initializer for {@link
       * Layout#property|property}.
       *
       * @return {VariantLayout} */
      addVariant(variant, layout, property) {
        const rv = new VariantLayout2(this, variant, layout, property);
        this.registry[variant] = rv;
        return rv;
      }
      /**
       * Get the layout associated with a registered variant.
       *
       * If `vb` does not produce a registered variant the function returns
       * `undefined`.
       *
       * @param {(Number|Buffer)} vb - either the variant number, or a
       * buffer from which the discriminator is to be read.
       *
       * @param {Number} offset - offset into `vb` for the start of the
       * union.  Used only when `vb` is an instance of {Buffer}.
       *
       * @return {({VariantLayout}|undefined)}
       */
      getVariant(vb, offset2) {
        let variant = vb;
        if (Buffer.isBuffer(vb)) {
          if (void 0 === offset2) {
            offset2 = 0;
          }
          variant = this.discriminator.decode(vb, offset2);
        }
        return this.registry[variant];
      }
    };
    var VariantLayout2 = class extends Layout2 {
      constructor(union2, variant, layout, property) {
        if (!(union2 instanceof Union2)) {
          throw new TypeError("union must be a Union");
        }
        if (!Number.isInteger(variant) || 0 > variant) {
          throw new TypeError("variant must be a (non-negative) integer");
        }
        if ("string" === typeof layout && void 0 === property) {
          property = layout;
          layout = null;
        }
        if (layout) {
          if (!(layout instanceof Layout2)) {
            throw new TypeError("layout must be a Layout");
          }
          if (null !== union2.defaultLayout && 0 <= layout.span && layout.span > union2.defaultLayout.span) {
            throw new Error("variant span exceeds span of containing union");
          }
          if ("string" !== typeof property) {
            throw new TypeError("variant must have a String property");
          }
        }
        let span = union2.span;
        if (0 > union2.span) {
          span = layout ? layout.span : 0;
          if (0 <= span && union2.usesPrefixDiscriminator) {
            span += union2.discriminator.layout.span;
          }
        }
        super(span, property);
        this.union = union2;
        this.variant = variant;
        this.layout = layout || null;
      }
      /** @override */
      getSpan(b, offset2) {
        if (0 <= this.span) {
          return this.span;
        }
        if (void 0 === offset2) {
          offset2 = 0;
        }
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
          contentOffset = this.union.discriminator.layout.span;
        }
        return contentOffset + this.layout.getSpan(b, offset2 + contentOffset);
      }
      /** @override */
      decode(b, offset2) {
        const dest = this.makeDestinationObject();
        if (void 0 === offset2) {
          offset2 = 0;
        }
        if (this !== this.union.getVariant(b, offset2)) {
          throw new Error("variant mismatch");
        }
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
          contentOffset = this.union.discriminator.layout.span;
        }
        if (this.layout) {
          dest[this.property] = this.layout.decode(b, offset2 + contentOffset);
        } else if (this.property) {
          dest[this.property] = true;
        } else if (this.union.usesPrefixDiscriminator) {
          dest[this.union.discriminator.property] = this.variant;
        }
        return dest;
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
          contentOffset = this.union.discriminator.layout.span;
        }
        if (this.layout && !src.hasOwnProperty(this.property)) {
          throw new TypeError("variant lacks property " + this.property);
        }
        this.union.discriminator.encode(this.variant, b, offset2);
        let span = contentOffset;
        if (this.layout) {
          this.layout.encode(src[this.property], b, offset2 + contentOffset);
          span += this.layout.getSpan(b, offset2 + contentOffset);
          if (0 <= this.union.span && span > this.union.span) {
            throw new Error("encoded variant overruns containing union");
          }
        }
        return span;
      }
      /** Delegate {@link Layout#fromArray|fromArray} to {@link
       * VariantLayout#layout|layout}. */
      fromArray(values) {
        if (this.layout) {
          return this.layout.fromArray(values);
        }
      }
    };
    function fixBitwiseResult(v) {
      if (0 > v) {
        v += 4294967296;
      }
      return v;
    }
    var BitStructure = class extends Layout2 {
      constructor(word, msb, property) {
        if (!(word instanceof UInt2 || word instanceof UIntBE2)) {
          throw new TypeError("word must be a UInt or UIntBE layout");
        }
        if ("string" === typeof msb && void 0 === property) {
          property = msb;
          msb = void 0;
        }
        if (4 < word.span) {
          throw new RangeError("word cannot exceed 32 bits");
        }
        super(word.span, property);
        this.word = word;
        this.msb = !!msb;
        this.fields = [];
        let value = 0;
        this._packedSetValue = function(v) {
          value = fixBitwiseResult(v);
          return this;
        };
        this._packedGetValue = function() {
          return value;
        };
      }
      /** @override */
      decode(b, offset2) {
        const dest = this.makeDestinationObject();
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const value = this.word.decode(b, offset2);
        this._packedSetValue(value);
        for (const fd of this.fields) {
          if (void 0 !== fd.property) {
            dest[fd.property] = fd.decode(value);
          }
        }
        return dest;
      }
      /** Implement {@link Layout#encode|encode} for {@link BitStructure}.
       *
       * If `src` is missing a property for a member with a defined {@link
       * Layout#property|property} the corresponding region of the packed
       * value is left unmodified.  Unused bits are also left unmodified. */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        const value = this.word.decode(b, offset2);
        this._packedSetValue(value);
        for (const fd of this.fields) {
          if (void 0 !== fd.property) {
            const fv = src[fd.property];
            if (void 0 !== fv) {
              fd.encode(fv);
            }
          }
        }
        return this.word.encode(this._packedGetValue(), b, offset2);
      }
      /** Register a new bitfield with a containing bit structure.  The
       * resulting bitfield is returned.
       *
       * @param {Number} bits - initializer for {@link BitField#bits|bits}.
       *
       * @param {string} property - initializer for {@link
       * Layout#property|property}.
       *
       * @return {BitField} */
      addField(bits, property) {
        const bf = new BitField(this, bits, property);
        this.fields.push(bf);
        return bf;
      }
      /** As with {@link BitStructure#addField|addField} for single-bit
       * fields with `boolean` value representation.
       *
       * @param {string} property - initializer for {@link
       * Layout#property|property}.
       *
       * @return {Boolean} */
      addBoolean(property) {
        const bf = new Boolean2(this, property);
        this.fields.push(bf);
        return bf;
      }
      /**
       * Get access to the bit field for a given property.
       *
       * @param {String} property - the bit field of interest.
       *
       * @return {BitField} - the field associated with `property`, or
       * undefined if there is no such property.
       */
      fieldFor(property) {
        if ("string" !== typeof property) {
          throw new TypeError("property must be string");
        }
        for (const fd of this.fields) {
          if (fd.property === property) {
            return fd;
          }
        }
      }
    };
    var BitField = class {
      constructor(container, bits, property) {
        if (!(container instanceof BitStructure)) {
          throw new TypeError("container must be a BitStructure");
        }
        if (!Number.isInteger(bits) || 0 >= bits) {
          throw new TypeError("bits must be positive integer");
        }
        const totalBits = 8 * container.span;
        const usedBits = container.fields.reduce((sum, fd) => sum + fd.bits, 0);
        if (bits + usedBits > totalBits) {
          throw new Error("bits too long for span remainder (" + (totalBits - usedBits) + " of " + totalBits + " remain)");
        }
        this.container = container;
        this.bits = bits;
        this.valueMask = (1 << bits) - 1;
        if (32 === bits) {
          this.valueMask = 4294967295;
        }
        this.start = usedBits;
        if (this.container.msb) {
          this.start = totalBits - usedBits - bits;
        }
        this.wordMask = fixBitwiseResult(this.valueMask << this.start);
        this.property = property;
      }
      /** Store a value into the corresponding subsequence of the containing
       * bit field. */
      decode() {
        const word = this.container._packedGetValue();
        const wordValue = fixBitwiseResult(word & this.wordMask);
        const value = wordValue >>> this.start;
        return value;
      }
      /** Store a value into the corresponding subsequence of the containing
       * bit field.
       *
       * **NOTE** This is not a specialization of {@link
       * Layout#encode|Layout.encode} and there is no return value. */
      encode(value) {
        if (!Number.isInteger(value) || value !== fixBitwiseResult(value & this.valueMask)) {
          throw new TypeError(nameWithProperty2("BitField.encode", this) + " value must be integer not exceeding " + this.valueMask);
        }
        const word = this.container._packedGetValue();
        const wordValue = fixBitwiseResult(value << this.start);
        this.container._packedSetValue(fixBitwiseResult(word & ~this.wordMask) | wordValue);
      }
    };
    var Boolean2 = class extends BitField {
      constructor(container, property) {
        super(container, 1, property);
      }
      /** Override {@link BitField#decode|decode} for {@link Boolean|Boolean}.
       *
       * @returns {boolean} */
      decode(b, offset2) {
        return !!BitField.prototype.decode.call(this, b, offset2);
      }
      /** @override */
      encode(value) {
        if ("boolean" === typeof value) {
          value = +value;
        }
        return BitField.prototype.encode.call(this, value);
      }
    };
    var Blob2 = class extends Layout2 {
      constructor(length, property) {
        if (!(length instanceof ExternalLayout2 && length.isCount() || Number.isInteger(length) && 0 <= length)) {
          throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");
        }
        let span = -1;
        if (!(length instanceof ExternalLayout2)) {
          span = length;
        }
        super(span, property);
        this.length = length;
      }
      /** @override */
      getSpan(b, offset2) {
        let span = this.span;
        if (0 > span) {
          span = this.length.decode(b, offset2);
        }
        return span;
      }
      /** @override */
      decode(b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        let span = this.span;
        if (0 > span) {
          span = this.length.decode(b, offset2);
        }
        return b.slice(offset2, offset2 + span);
      }
      /** Implement {@link Layout#encode|encode} for {@link Blob}.
       *
       * **NOTE** If {@link Layout#count|count} is an instance of {@link
       * ExternalLayout} then the length of `src` will be encoded as the
       * count after `src` is encoded. */
      encode(src, b, offset2) {
        let span = this.length;
        if (this.length instanceof ExternalLayout2) {
          span = src.length;
        }
        if (!(Buffer.isBuffer(src) && span === src.length)) {
          throw new TypeError(nameWithProperty2("Blob.encode", this) + " requires (length " + span + ") Buffer as src");
        }
        if (offset2 + span > b.length) {
          throw new RangeError("encoding overruns Buffer");
        }
        b.write(src.toString("hex"), offset2, span, "hex");
        if (this.length instanceof ExternalLayout2) {
          this.length.encode(span, b, offset2);
        }
        return span;
      }
    };
    var CString = class extends Layout2 {
      constructor(property) {
        super(-1, property);
      }
      /** @override */
      getSpan(b, offset2) {
        if (!Buffer.isBuffer(b)) {
          throw new TypeError("b must be a Buffer");
        }
        if (void 0 === offset2) {
          offset2 = 0;
        }
        let idx = offset2;
        while (idx < b.length && 0 !== b[idx]) {
          idx += 1;
        }
        return 1 + idx - offset2;
      }
      /** @override */
      decode(b, offset2, dest) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        let span = this.getSpan(b, offset2);
        return b.slice(offset2, offset2 + span - 1).toString("utf-8");
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        if ("string" !== typeof src) {
          src = src.toString();
        }
        const srcb = new Buffer(src, "utf8");
        const span = srcb.length;
        if (offset2 + span > b.length) {
          throw new RangeError("encoding overruns Buffer");
        }
        srcb.copy(b, offset2);
        b[offset2 + span] = 0;
        return span + 1;
      }
    };
    var UTF8 = class extends Layout2 {
      constructor(maxSpan, property) {
        if ("string" === typeof maxSpan && void 0 === property) {
          property = maxSpan;
          maxSpan = void 0;
        }
        if (void 0 === maxSpan) {
          maxSpan = -1;
        } else if (!Number.isInteger(maxSpan)) {
          throw new TypeError("maxSpan must be an integer");
        }
        super(-1, property);
        this.maxSpan = maxSpan;
      }
      /** @override */
      getSpan(b, offset2) {
        if (!Buffer.isBuffer(b)) {
          throw new TypeError("b must be a Buffer");
        }
        if (void 0 === offset2) {
          offset2 = 0;
        }
        return b.length - offset2;
      }
      /** @override */
      decode(b, offset2, dest) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        let span = this.getSpan(b, offset2);
        if (0 <= this.maxSpan && this.maxSpan < span) {
          throw new RangeError("text length exceeds maxSpan");
        }
        return b.slice(offset2, offset2 + span).toString("utf-8");
      }
      /** @override */
      encode(src, b, offset2) {
        if (void 0 === offset2) {
          offset2 = 0;
        }
        if ("string" !== typeof src) {
          src = src.toString();
        }
        const srcb = new Buffer(src, "utf8");
        const span = srcb.length;
        if (0 <= this.maxSpan && this.maxSpan < span) {
          throw new RangeError("text length exceeds maxSpan");
        }
        if (offset2 + span > b.length) {
          throw new RangeError("encoding overruns Buffer");
        }
        srcb.copy(b, offset2);
        return span;
      }
    };
    var Constant = class extends Layout2 {
      constructor(value, property) {
        super(0, property);
        this.value = value;
      }
      /** @override */
      decode(b, offset2, dest) {
        return this.value;
      }
      /** @override */
      encode(src, b, offset2) {
        return 0;
      }
    };
    exports.ExternalLayout = ExternalLayout2;
    exports.GreedyCount = GreedyCount;
    exports.OffsetLayout = OffsetLayout2;
    exports.UInt = UInt2;
    exports.UIntBE = UIntBE2;
    exports.Int = Int;
    exports.IntBE = IntBE;
    exports.Float = Float;
    exports.FloatBE = FloatBE;
    exports.Double = Double;
    exports.DoubleBE = DoubleBE;
    exports.Sequence = Sequence;
    exports.Structure = Structure2;
    exports.UnionDiscriminator = UnionDiscriminator2;
    exports.UnionLayoutDiscriminator = UnionLayoutDiscriminator2;
    exports.Union = Union2;
    exports.VariantLayout = VariantLayout2;
    exports.BitStructure = BitStructure;
    exports.BitField = BitField;
    exports.Boolean = Boolean2;
    exports.Blob = Blob2;
    exports.CString = CString;
    exports.UTF8 = UTF8;
    exports.Constant = Constant;
    exports.greedy = (elementSpan, property) => new GreedyCount(elementSpan, property);
    exports.offset = (layout, offset2, property) => new OffsetLayout2(layout, offset2, property);
    exports.u8 = (property) => new UInt2(1, property);
    exports.u16 = (property) => new UInt2(2, property);
    exports.u24 = (property) => new UInt2(3, property);
    exports.u32 = (property) => new UInt2(4, property);
    exports.u40 = (property) => new UInt2(5, property);
    exports.u48 = (property) => new UInt2(6, property);
    exports.nu64 = (property) => new NearUInt642(property);
    exports.u16be = (property) => new UIntBE2(2, property);
    exports.u24be = (property) => new UIntBE2(3, property);
    exports.u32be = (property) => new UIntBE2(4, property);
    exports.u40be = (property) => new UIntBE2(5, property);
    exports.u48be = (property) => new UIntBE2(6, property);
    exports.nu64be = (property) => new NearUInt64BE(property);
    exports.s8 = (property) => new Int(1, property);
    exports.s16 = (property) => new Int(2, property);
    exports.s24 = (property) => new Int(3, property);
    exports.s32 = (property) => new Int(4, property);
    exports.s40 = (property) => new Int(5, property);
    exports.s48 = (property) => new Int(6, property);
    exports.ns64 = (property) => new NearInt642(property);
    exports.s16be = (property) => new IntBE(2, property);
    exports.s24be = (property) => new IntBE(3, property);
    exports.s32be = (property) => new IntBE(4, property);
    exports.s40be = (property) => new IntBE(5, property);
    exports.s48be = (property) => new IntBE(6, property);
    exports.ns64be = (property) => new NearInt64BE(property);
    exports.f32 = (property) => new Float(property);
    exports.f32be = (property) => new FloatBE(property);
    exports.f64 = (property) => new Double(property);
    exports.f64be = (property) => new DoubleBE(property);
    exports.struct = (fields, property, decodePrefixes) => new Structure2(fields, property, decodePrefixes);
    exports.bits = (word, msb, property) => new BitStructure(word, msb, property);
    exports.seq = (elementLayout, count, property) => new Sequence(elementLayout, count, property);
    exports.union = (discr, defaultLayout, property) => new Union2(discr, defaultLayout, property);
    exports.unionLayoutDiscriminator = (layout, property) => new UnionLayoutDiscriminator2(layout, property);
    exports.blob = (length, property) => new Blob2(length, property);
    exports.cstr = (property) => new CString(property);
    exports.utf8 = (maxSpan, property) => new UTF8(maxSpan, property);
    exports.const = (value, property) => new Constant(value, property);
  }
});

// node_modules/.pnpm/@coral-xyz+borsh@0.31.1_@solana+web3.js@1.98.2_bufferutil@4.0.9_typescript@5.8.3_utf-8-validate@5.0.10_/node_modules/@coral-xyz/borsh/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/@coral-xyz+borsh@0.31.1_@solana+web3.js@1.98.2_bufferutil@4.0.9_typescript@5.8.3_utf-8-validate@5.0.10_/node_modules/@coral-xyz/borsh/dist/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.struct = exports.f64 = exports.f32 = exports.i32 = exports.u32 = exports.i16 = exports.u16 = exports.i8 = exports.u8 = void 0;
    exports.u64 = u643;
    exports.i64 = i642;
    exports.u128 = u1282;
    exports.i128 = i1282;
    exports.u256 = u2562;
    exports.i256 = i2562;
    exports.publicKey = publicKey3;
    exports.option = option2;
    exports.bool = bool2;
    exports.vec = vec2;
    exports.tagged = tagged;
    exports.vecU8 = vecU82;
    exports.str = str2;
    exports.rustEnum = rustEnum2;
    exports.array = array3;
    exports.map = map;
    var buffer_layout_1 = require_Layout();
    var web3_js_1 = require("@solana/web3.js");
    var bn_js_1 = __importDefault(require("bn.js"));
    var buffer_layout_2 = require_Layout();
    Object.defineProperty(exports, "u8", { enumerable: true, get: function() {
      return buffer_layout_2.u8;
    } });
    Object.defineProperty(exports, "i8", { enumerable: true, get: function() {
      return buffer_layout_2.s8;
    } });
    Object.defineProperty(exports, "u16", { enumerable: true, get: function() {
      return buffer_layout_2.u16;
    } });
    Object.defineProperty(exports, "i16", { enumerable: true, get: function() {
      return buffer_layout_2.s16;
    } });
    Object.defineProperty(exports, "u32", { enumerable: true, get: function() {
      return buffer_layout_2.u32;
    } });
    Object.defineProperty(exports, "i32", { enumerable: true, get: function() {
      return buffer_layout_2.s32;
    } });
    Object.defineProperty(exports, "f32", { enumerable: true, get: function() {
      return buffer_layout_2.f32;
    } });
    Object.defineProperty(exports, "f64", { enumerable: true, get: function() {
      return buffer_layout_2.f64;
    } });
    Object.defineProperty(exports, "struct", { enumerable: true, get: function() {
      return buffer_layout_2.struct;
    } });
    var BNLayout = class extends buffer_layout_1.Layout {
      constructor(span, signed, property) {
        super(span, property);
        this.blob = (0, buffer_layout_1.blob)(span);
        this.signed = signed;
      }
      decode(b, offset2 = 0) {
        const num = new bn_js_1.default(this.blob.decode(b, offset2), 10, "le");
        if (this.signed) {
          return num.fromTwos(this.span * 8).clone();
        }
        return num;
      }
      encode(src, b, offset2 = 0) {
        if (this.signed) {
          src = src.toTwos(this.span * 8);
        }
        return this.blob.encode(src.toArrayLike(Buffer, "le", this.span), b, offset2);
      }
    };
    function u643(property) {
      return new BNLayout(8, false, property);
    }
    function i642(property) {
      return new BNLayout(8, true, property);
    }
    function u1282(property) {
      return new BNLayout(16, false, property);
    }
    function i1282(property) {
      return new BNLayout(16, true, property);
    }
    function u2562(property) {
      return new BNLayout(32, false, property);
    }
    function i2562(property) {
      return new BNLayout(32, true, property);
    }
    var WrappedLayout2 = class extends buffer_layout_1.Layout {
      constructor(layout, decoder, encoder, property) {
        super(layout.span, property);
        this.layout = layout;
        this.decoder = decoder;
        this.encoder = encoder;
      }
      decode(b, offset2) {
        return this.decoder(this.layout.decode(b, offset2));
      }
      encode(src, b, offset2) {
        return this.layout.encode(this.encoder(src), b, offset2);
      }
      getSpan(b, offset2) {
        return this.layout.getSpan(b, offset2);
      }
    };
    function publicKey3(property) {
      return new WrappedLayout2((0, buffer_layout_1.blob)(32), (b) => new web3_js_1.PublicKey(b), (key) => key.toBuffer(), property);
    }
    var OptionLayout = class extends buffer_layout_1.Layout {
      constructor(layout, property) {
        super(-1, property);
        this.layout = layout;
        this.discriminator = (0, buffer_layout_1.u8)();
      }
      encode(src, b, offset2 = 0) {
        if (src === null || src === void 0) {
          return this.discriminator.encode(0, b, offset2);
        }
        this.discriminator.encode(1, b, offset2);
        return this.layout.encode(src, b, offset2 + 1) + 1;
      }
      decode(b, offset2 = 0) {
        const discriminator = this.discriminator.decode(b, offset2);
        if (discriminator === 0) {
          return null;
        } else if (discriminator === 1) {
          return this.layout.decode(b, offset2 + 1);
        }
        throw new Error("Invalid option " + this.property);
      }
      getSpan(b, offset2 = 0) {
        const discriminator = this.discriminator.decode(b, offset2);
        if (discriminator === 0) {
          return 1;
        } else if (discriminator === 1) {
          return this.layout.getSpan(b, offset2 + 1) + 1;
        }
        throw new Error("Invalid option " + this.property);
      }
    };
    function option2(layout, property) {
      return new OptionLayout(layout, property);
    }
    function bool2(property) {
      return new WrappedLayout2((0, buffer_layout_1.u8)(), decodeBool, encodeBool, property);
    }
    function decodeBool(value) {
      if (value === 0) {
        return false;
      } else if (value === 1) {
        return true;
      }
      throw new Error("Invalid bool: " + value);
    }
    function encodeBool(value) {
      return value ? 1 : 0;
    }
    function vec2(elementLayout, property) {
      const length = (0, buffer_layout_1.u32)("length");
      const layout = (0, buffer_layout_1.struct)([
        length,
        (0, buffer_layout_1.seq)(elementLayout, (0, buffer_layout_1.offset)(length, -length.span), "values")
      ]);
      return new WrappedLayout2(layout, ({ values }) => values, (values) => ({ values }), property);
    }
    function tagged(tag, layout, property) {
      const wrappedLayout = (0, buffer_layout_1.struct)([
        u643("tag"),
        layout.replicate("data")
      ]);
      function decodeTag({ tag: receivedTag, data }) {
        if (!receivedTag.eq(tag)) {
          throw new Error("Invalid tag, expected: " + tag.toString("hex") + ", got: " + receivedTag.toString("hex"));
        }
        return data;
      }
      return new WrappedLayout2(wrappedLayout, decodeTag, (data) => ({ tag, data }), property);
    }
    function vecU82(property) {
      const length = (0, buffer_layout_1.u32)("length");
      const layout = (0, buffer_layout_1.struct)([
        length,
        (0, buffer_layout_1.blob)((0, buffer_layout_1.offset)(length, -length.span), "data")
      ]);
      return new WrappedLayout2(layout, ({ data }) => data, (data) => ({ data }), property);
    }
    function str2(property) {
      return new WrappedLayout2(vecU82(), (data) => data.toString("utf-8"), (s) => Buffer.from(s, "utf-8"), property);
    }
    function rustEnum2(variants, property, discriminant) {
      const unionLayout = (0, buffer_layout_1.union)(discriminant !== null && discriminant !== void 0 ? discriminant : (0, buffer_layout_1.u8)(), property);
      variants.forEach((variant, index) => unionLayout.addVariant(index, variant, variant.property));
      return unionLayout;
    }
    function array3(elementLayout, length, property) {
      const layout = (0, buffer_layout_1.struct)([
        (0, buffer_layout_1.seq)(elementLayout, length, "values")
      ]);
      return new WrappedLayout2(layout, ({ values }) => values, (values) => ({ values }), property);
    }
    var MapEntryLayout = class extends buffer_layout_1.Layout {
      constructor(keyLayout, valueLayout, property) {
        super(keyLayout.span + valueLayout.span, property);
        this.keyLayout = keyLayout;
        this.valueLayout = valueLayout;
      }
      decode(b, offset2) {
        offset2 = offset2 || 0;
        const key = this.keyLayout.decode(b, offset2);
        const value = this.valueLayout.decode(b, offset2 + this.keyLayout.getSpan(b, offset2));
        return [key, value];
      }
      encode(src, b, offset2) {
        offset2 = offset2 || 0;
        const keyBytes = this.keyLayout.encode(src[0], b, offset2);
        const valueBytes = this.valueLayout.encode(src[1], b, offset2 + keyBytes);
        return keyBytes + valueBytes;
      }
      getSpan(b, offset2) {
        return this.keyLayout.getSpan(b, offset2) + this.valueLayout.getSpan(b, offset2);
      }
    };
    function map(keyLayout, valueLayout, property) {
      const length = (0, buffer_layout_1.u32)("length");
      const layout = (0, buffer_layout_1.struct)([
        length,
        (0, buffer_layout_1.seq)(new MapEntryLayout(keyLayout, valueLayout), (0, buffer_layout_1.offset)(length, -length.span), "values")
      ]);
      return new WrappedLayout2(layout, ({ values }) => new Map(values), (values) => ({ values: Array.from(values.entries()) }), property);
    }
  }
});

// node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js"(exports, module2) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module2) {
      module2.exports = EventEmitter2;
    }
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BONDING_CURVE_NEW_SIZE: () => BONDING_CURVE_NEW_SIZE,
  CANONICAL_POOL_INDEX: () => CANONICAL_POOL_INDEX,
  PUMP_AMM_PROGRAM_ID: () => PUMP_AMM_PROGRAM_ID,
  PUMP_PROGRAM_ID: () => PUMP_PROGRAM_ID,
  PumpSdk: () => PumpSdk,
  bondingCurvePda: () => bondingCurvePda,
  canonicalPumpPoolPda: () => canonicalPumpPoolPda,
  creatorVaultPda: () => creatorVaultPda,
  getBuySolAmountFromTokenAmount: () => getBuySolAmountFromTokenAmount,
  getBuyTokenAmountFromSolAmount: () => getBuyTokenAmountFromSolAmount,
  getPumpProgram: () => getPumpProgram,
  getSellSolAmountFromTokenAmount: () => getSellSolAmountFromTokenAmount,
  globalPda: () => globalPda,
  pumpIdl: () => pump_default,
  pumpPoolAuthorityPda: () => pumpPoolAuthorityPda
});
module.exports = __toCommonJS(index_exports);

// src/idl/pump.json
var pump_default = {
  address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
  metadata: {
    name: "pump",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor"
  },
  instructions: [
    {
      name: "buy",
      docs: ["Buys tokens from a bonding curve."],
      discriminator: [102, 6, 61, 18, 1, 218, 235, 234],
      accounts: [
        {
          name: "global",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [103, 108, 111, 98, 97, 108]
              }
            ]
          }
        },
        {
          name: "fee_recipient",
          writable: true
        },
        {
          name: "mint"
        },
        {
          name: "bonding_curve",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  45,
                  99,
                  117,
                  114,
                  118,
                  101
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ]
          }
        },
        {
          name: "associated_bonding_curve",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "bonding_curve"
              },
              {
                kind: "const",
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "associated_user",
          writable: true
        },
        {
          name: "user",
          writable: true,
          signer: true
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "creator_vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  45,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                kind: "account",
                path: "bonding_curve.creator",
                account: "BondingCurve"
              }
            ]
          }
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: [
        {
          name: "amount",
          type: "u64"
        },
        {
          name: "max_sol_cost",
          type: "u64"
        }
      ]
    },
    {
      name: "collect_creator_fee",
      docs: [
        "Collects creator_fee from creator_vault to the coin creator account"
      ],
      discriminator: [20, 22, 86, 123, 198, 28, 219, 132],
      accounts: [
        {
          name: "creator",
          writable: true,
          signer: true
        },
        {
          name: "creator_vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  45,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                kind: "account",
                path: "creator"
              }
            ]
          }
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: []
    },
    {
      name: "create",
      docs: ["Creates a new coin and bonding curve."],
      discriminator: [24, 30, 200, 40, 5, 28, 7, 119],
      accounts: [
        {
          name: "mint",
          writable: true,
          signer: true
        },
        {
          name: "mint_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  109,
                  105,
                  110,
                  116,
                  45,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "bonding_curve",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  45,
                  99,
                  117,
                  114,
                  118,
                  101
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ]
          }
        },
        {
          name: "associated_bonding_curve",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "bonding_curve"
              },
              {
                kind: "const",
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "global",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [103, 108, 111, 98, 97, 108]
              }
            ]
          }
        },
        {
          name: "mpl_token_metadata",
          address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          name: "metadata",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [109, 101, 116, 97, 100, 97, 116, 97]
              },
              {
                kind: "const",
                value: [
                  11,
                  112,
                  101,
                  177,
                  227,
                  209,
                  124,
                  69,
                  56,
                  157,
                  82,
                  127,
                  107,
                  4,
                  195,
                  205,
                  88,
                  184,
                  108,
                  115,
                  26,
                  160,
                  253,
                  181,
                  73,
                  182,
                  209,
                  188,
                  3,
                  248,
                  41,
                  70
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ],
            program: {
              kind: "account",
              path: "mpl_token_metadata"
            }
          }
        },
        {
          name: "user",
          writable: true,
          signer: true
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "associated_token_program",
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          name: "rent",
          address: "SysvarRent111111111111111111111111111111111"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: [
        {
          name: "name",
          type: "string"
        },
        {
          name: "symbol",
          type: "string"
        },
        {
          name: "uri",
          type: "string"
        },
        {
          name: "creator",
          type: "pubkey"
        }
      ]
    },
    {
      name: "extend_account",
      docs: ["Extends the size of program-owned accounts"],
      discriminator: [234, 102, 194, 203, 150, 72, 62, 229],
      accounts: [
        {
          name: "account",
          writable: true
        },
        {
          name: "user",
          signer: true
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: []
    },
    {
      name: "initialize",
      docs: ["Creates the global state."],
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: "global",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [103, 108, 111, 98, 97, 108]
              }
            ]
          }
        },
        {
          name: "user",
          writable: true,
          signer: true
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        }
      ],
      args: []
    },
    {
      name: "migrate",
      docs: [
        "Migrates liquidity to pump_amm if the bonding curve is complete"
      ],
      discriminator: [155, 234, 231, 146, 236, 158, 162, 30],
      accounts: [
        {
          name: "global",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [103, 108, 111, 98, 97, 108]
              }
            ]
          }
        },
        {
          name: "withdraw_authority",
          writable: true,
          relations: ["global"]
        },
        {
          name: "mint"
        },
        {
          name: "bonding_curve",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  45,
                  99,
                  117,
                  114,
                  118,
                  101
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ]
          }
        },
        {
          name: "associated_bonding_curve",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "bonding_curve"
              },
              {
                kind: "const",
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "user",
          signer: true
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "pump_amm",
          address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
        },
        {
          name: "pool",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [112, 111, 111, 108]
              },
              {
                kind: "const",
                value: [0, 0]
              },
              {
                kind: "account",
                path: "pool_authority"
              },
              {
                kind: "account",
                path: "mint"
              },
              {
                kind: "account",
                path: "wsol_mint"
              }
            ],
            program: {
              kind: "account",
              path: "pump_amm"
            }
          }
        },
        {
          name: "pool_authority",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  112,
                  111,
                  111,
                  108,
                  45,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ]
          }
        },
        {
          name: "pool_authority_mint_account",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "pool_authority"
              },
              {
                kind: "account",
                path: "token_program"
              },
              {
                kind: "account",
                path: "mint"
              }
            ],
            program: {
              kind: "account",
              path: "associated_token_program"
            }
          }
        },
        {
          name: "pool_authority_wsol_account",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "pool_authority"
              },
              {
                kind: "account",
                path: "token_program"
              },
              {
                kind: "account",
                path: "wsol_mint"
              }
            ],
            program: {
              kind: "account",
              path: "associated_token_program"
            }
          }
        },
        {
          name: "amm_global_config",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ],
            program: {
              kind: "account",
              path: "pump_amm"
            }
          }
        },
        {
          name: "wsol_mint",
          address: "So11111111111111111111111111111111111111112"
        },
        {
          name: "lp_mint",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  112,
                  111,
                  111,
                  108,
                  95,
                  108,
                  112,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                kind: "account",
                path: "pool"
              }
            ],
            program: {
              kind: "account",
              path: "pump_amm"
            }
          }
        },
        {
          name: "user_pool_token_account",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "pool_authority"
              },
              {
                kind: "account",
                path: "token_2022_program"
              },
              {
                kind: "account",
                path: "lp_mint"
              }
            ],
            program: {
              kind: "account",
              path: "associated_token_program"
            }
          }
        },
        {
          name: "pool_base_token_account",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "pool"
              },
              {
                kind: "account",
                path: "token_program"
              },
              {
                kind: "account",
                path: "mint"
              }
            ],
            program: {
              kind: "account",
              path: "associated_token_program"
            }
          }
        },
        {
          name: "pool_quote_token_account",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "pool"
              },
              {
                kind: "account",
                path: "token_program"
              },
              {
                kind: "account",
                path: "wsol_mint"
              }
            ],
            program: {
              kind: "account",
              path: "associated_token_program"
            }
          }
        },
        {
          name: "token_2022_program",
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          name: "associated_token_program",
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          name: "pump_amm_event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ],
            program: {
              kind: "account",
              path: "pump_amm"
            }
          }
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: []
    },
    {
      name: "sell",
      docs: ["Sells tokens into a bonding curve."],
      discriminator: [51, 230, 133, 164, 1, 127, 131, 173],
      accounts: [
        {
          name: "global",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [103, 108, 111, 98, 97, 108]
              }
            ]
          }
        },
        {
          name: "fee_recipient",
          writable: true
        },
        {
          name: "mint"
        },
        {
          name: "bonding_curve",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  45,
                  99,
                  117,
                  114,
                  118,
                  101
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ]
          }
        },
        {
          name: "associated_bonding_curve",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "bonding_curve"
              },
              {
                kind: "const",
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "associated_user",
          writable: true
        },
        {
          name: "user",
          writable: true,
          signer: true
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "creator_vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  45,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                kind: "account",
                path: "bonding_curve.creator",
                account: "BondingCurve"
              }
            ]
          }
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: [
        {
          name: "amount",
          type: "u64"
        },
        {
          name: "min_sol_output",
          type: "u64"
        }
      ]
    },
    {
      name: "set_creator",
      docs: [
        "Allows Global::set_creator_authority to set the bonding curve creator from Metaplex metadata or input argument"
      ],
      discriminator: [254, 148, 255, 112, 207, 142, 170, 165],
      accounts: [
        {
          name: "set_creator_authority",
          signer: true,
          relations: ["global"]
        },
        {
          name: "global",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [103, 108, 111, 98, 97, 108]
              }
            ]
          }
        },
        {
          name: "mint"
        },
        {
          name: "metadata",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [109, 101, 116, 97, 100, 97, 116, 97]
              },
              {
                kind: "const",
                value: [
                  11,
                  112,
                  101,
                  177,
                  227,
                  209,
                  124,
                  69,
                  56,
                  157,
                  82,
                  127,
                  107,
                  4,
                  195,
                  205,
                  88,
                  184,
                  108,
                  115,
                  26,
                  160,
                  253,
                  181,
                  73,
                  182,
                  209,
                  188,
                  3,
                  248,
                  41,
                  70
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                11,
                112,
                101,
                177,
                227,
                209,
                124,
                69,
                56,
                157,
                82,
                127,
                107,
                4,
                195,
                205,
                88,
                184,
                108,
                115,
                26,
                160,
                253,
                181,
                73,
                182,
                209,
                188,
                3,
                248,
                41,
                70
              ]
            }
          }
        },
        {
          name: "bonding_curve",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  45,
                  99,
                  117,
                  114,
                  118,
                  101
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ]
          }
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: [
        {
          name: "creator",
          type: "pubkey"
        }
      ]
    },
    {
      name: "set_metaplex_creator",
      docs: [
        "Syncs the bonding curve creator with the Metaplex metadata creator if it exists"
      ],
      discriminator: [138, 96, 174, 217, 48, 85, 197, 246],
      accounts: [
        {
          name: "mint"
        },
        {
          name: "metadata",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [109, 101, 116, 97, 100, 97, 116, 97]
              },
              {
                kind: "const",
                value: [
                  11,
                  112,
                  101,
                  177,
                  227,
                  209,
                  124,
                  69,
                  56,
                  157,
                  82,
                  127,
                  107,
                  4,
                  195,
                  205,
                  88,
                  184,
                  108,
                  115,
                  26,
                  160,
                  253,
                  181,
                  73,
                  182,
                  209,
                  188,
                  3,
                  248,
                  41,
                  70
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                11,
                112,
                101,
                177,
                227,
                209,
                124,
                69,
                56,
                157,
                82,
                127,
                107,
                4,
                195,
                205,
                88,
                184,
                108,
                115,
                26,
                160,
                253,
                181,
                73,
                182,
                209,
                188,
                3,
                248,
                41,
                70
              ]
            }
          }
        },
        {
          name: "bonding_curve",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  45,
                  99,
                  117,
                  114,
                  118,
                  101
                ]
              },
              {
                kind: "account",
                path: "mint"
              }
            ]
          }
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: []
    },
    {
      name: "set_params",
      docs: ["Sets the global state parameters."],
      discriminator: [27, 234, 178, 52, 147, 2, 187, 141],
      accounts: [
        {
          name: "global",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [103, 108, 111, 98, 97, 108]
              }
            ]
          }
        },
        {
          name: "authority",
          writable: true,
          signer: true,
          relations: ["global"]
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: [
        {
          name: "initial_virtual_token_reserves",
          type: "u64"
        },
        {
          name: "initial_virtual_sol_reserves",
          type: "u64"
        },
        {
          name: "initial_real_token_reserves",
          type: "u64"
        },
        {
          name: "token_total_supply",
          type: "u64"
        },
        {
          name: "fee_basis_points",
          type: "u64"
        },
        {
          name: "withdraw_authority",
          type: "pubkey"
        },
        {
          name: "enable_migrate",
          type: "bool"
        },
        {
          name: "pool_migration_fee",
          type: "u64"
        },
        {
          name: "creator_fee_basis_points",
          type: "u64"
        },
        {
          name: "set_creator_authority",
          type: "pubkey"
        }
      ]
    },
    {
      name: "update_global_authority",
      discriminator: [227, 181, 74, 196, 208, 21, 97, 213],
      accounts: [
        {
          name: "global",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [103, 108, 111, 98, 97, 108]
              }
            ]
          }
        },
        {
          name: "authority",
          signer: true,
          relations: ["global"]
        },
        {
          name: "new_authority"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: []
    }
  ],
  accounts: [
    {
      name: "BondingCurve",
      discriminator: [23, 183, 248, 55, 96, 216, 172, 96]
    },
    {
      name: "Global",
      discriminator: [167, 232, 232, 177, 200, 108, 114, 127]
    }
  ],
  events: [
    {
      name: "CollectCreatorFeeEvent",
      discriminator: [122, 2, 127, 1, 14, 191, 12, 175]
    },
    {
      name: "CompleteEvent",
      discriminator: [95, 114, 97, 156, 212, 46, 152, 8]
    },
    {
      name: "CompletePumpAmmMigrationEvent",
      discriminator: [189, 233, 93, 185, 92, 148, 234, 148]
    },
    {
      name: "CreateEvent",
      discriminator: [27, 114, 169, 77, 222, 235, 99, 118]
    },
    {
      name: "ExtendAccountEvent",
      discriminator: [97, 97, 215, 144, 93, 146, 22, 124]
    },
    {
      name: "SetCreatorEvent",
      discriminator: [237, 52, 123, 37, 245, 251, 72, 210]
    },
    {
      name: "SetMetaplexCreatorEvent",
      discriminator: [142, 203, 6, 32, 127, 105, 191, 162]
    },
    {
      name: "SetParamsEvent",
      discriminator: [223, 195, 159, 246, 62, 48, 143, 131]
    },
    {
      name: "TradeEvent",
      discriminator: [189, 219, 127, 211, 78, 230, 97, 238]
    },
    {
      name: "UpdateGlobalAuthorityEvent",
      discriminator: [182, 195, 137, 42, 35, 206, 207, 247]
    }
  ],
  errors: [
    {
      code: 6e3,
      name: "NotAuthorized",
      msg: "The given account is not authorized to execute this instruction."
    },
    {
      code: 6001,
      name: "AlreadyInitialized",
      msg: "The program is already initialized."
    },
    {
      code: 6002,
      name: "TooMuchSolRequired",
      msg: "slippage: Too much SOL required to buy the given amount of tokens."
    },
    {
      code: 6003,
      name: "TooLittleSolReceived",
      msg: "slippage: Too little SOL received to sell the given amount of tokens."
    },
    {
      code: 6004,
      name: "MintDoesNotMatchBondingCurve",
      msg: "The mint does not match the bonding curve."
    },
    {
      code: 6005,
      name: "BondingCurveComplete",
      msg: "The bonding curve has completed and liquidity migrated to raydium."
    },
    {
      code: 6006,
      name: "BondingCurveNotComplete",
      msg: "The bonding curve has not completed."
    },
    {
      code: 6007,
      name: "NotInitialized",
      msg: "The program is not initialized."
    },
    {
      code: 6008,
      name: "WithdrawTooFrequent",
      msg: "Withdraw too frequent"
    },
    {
      code: 6009,
      name: "NewSizeShouldBeGreaterThanCurrentSize",
      msg: "new_size should be > current_size"
    },
    {
      code: 6010,
      name: "AccountTypeNotSupported",
      msg: "Account type not supported"
    },
    {
      code: 6011,
      name: "InitialRealTokenReservesShouldBeLessThanTokenTotalSupply",
      msg: "initial_real_token_reserves should be less than token_total_supply"
    },
    {
      code: 6012,
      name: "InitialVirtualTokenReservesShouldBeGreaterThanInitialRealTokenReserves",
      msg: "initial_virtual_token_reserves should be greater than initial_real_token_reserves"
    },
    {
      code: 6013,
      name: "FeeBasisPointsGreaterThanMaximum",
      msg: "fee_basis_points greater than maximum"
    },
    {
      code: 6014,
      name: "AllZerosWithdrawAuthority",
      msg: "Withdraw authority cannot be set to System Program ID"
    },
    {
      code: 6015,
      name: "PoolMigrationFeeShouldBeLessThanFinalRealSolReserves",
      msg: "pool_migration_fee should be less than final_real_sol_reserves"
    },
    {
      code: 6016,
      name: "PoolMigrationFeeShouldBeGreaterThanCreatorFeePlusMaxMigrateFees",
      msg: "pool_migration_fee should be greater than creator_fee + MAX_MIGRATE_FEES"
    },
    {
      code: 6017,
      name: "DisabledWithdraw",
      msg: "Migrate instruction is disabled"
    },
    {
      code: 6018,
      name: "DisabledMigrate",
      msg: "Migrate instruction is disabled"
    },
    {
      code: 6019,
      name: "InvalidCreator",
      msg: "Invalid creator pubkey"
    },
    {
      code: 6020,
      name: "BuyZeroAmount",
      msg: "Buy zero amount"
    },
    {
      code: 6021,
      name: "NotEnoughTokensToBuy",
      msg: "Not enough tokens to buy"
    },
    {
      code: 6022,
      name: "SellZeroAmount",
      msg: "Sell zero amount"
    },
    {
      code: 6023,
      name: "NotEnoughTokensToSell",
      msg: "Not enough tokens to sell"
    },
    {
      code: 6024,
      name: "Overflow",
      msg: "Overflow"
    },
    {
      code: 6025,
      name: "Truncation",
      msg: "Truncation"
    },
    {
      code: 6026,
      name: "DivisionByZero",
      msg: "Division by zero"
    },
    {
      code: 6027,
      name: "NotEnoughRemainingAccounts",
      msg: "Not enough remaining accounts"
    },
    {
      code: 6028,
      name: "AllFeeRecipientsShouldBeNonZero",
      msg: "All fee recipients should be non-zero"
    },
    {
      code: 6029,
      name: "UnsortedNotUniqueFeeRecipients",
      msg: "Unsorted or not unique fee recipients"
    },
    {
      code: 6030,
      name: "CreatorShouldNotBeZero",
      msg: "Creator should not be zero"
    }
  ],
  types: [
    {
      name: "BondingCurve",
      type: {
        kind: "struct",
        fields: [
          {
            name: "virtual_token_reserves",
            type: "u64"
          },
          {
            name: "virtual_sol_reserves",
            type: "u64"
          },
          {
            name: "real_token_reserves",
            type: "u64"
          },
          {
            name: "real_sol_reserves",
            type: "u64"
          },
          {
            name: "token_total_supply",
            type: "u64"
          },
          {
            name: "complete",
            type: "bool"
          },
          {
            name: "creator",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "CollectCreatorFeeEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "creator",
            type: "pubkey"
          },
          {
            name: "creator_fee",
            type: "u64"
          }
        ]
      }
    },
    {
      name: "CompleteEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "mint",
            type: "pubkey"
          },
          {
            name: "bonding_curve",
            type: "pubkey"
          },
          {
            name: "timestamp",
            type: "i64"
          }
        ]
      }
    },
    {
      name: "CompletePumpAmmMigrationEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "mint",
            type: "pubkey"
          },
          {
            name: "mint_amount",
            type: "u64"
          },
          {
            name: "sol_amount",
            type: "u64"
          },
          {
            name: "pool_migration_fee",
            type: "u64"
          },
          {
            name: "bonding_curve",
            type: "pubkey"
          },
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "pool",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "CreateEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string"
          },
          {
            name: "symbol",
            type: "string"
          },
          {
            name: "uri",
            type: "string"
          },
          {
            name: "mint",
            type: "pubkey"
          },
          {
            name: "bonding_curve",
            type: "pubkey"
          },
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "creator",
            type: "pubkey"
          },
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "virtual_token_reserves",
            type: "u64"
          },
          {
            name: "virtual_sol_reserves",
            type: "u64"
          },
          {
            name: "real_token_reserves",
            type: "u64"
          },
          {
            name: "token_total_supply",
            type: "u64"
          }
        ]
      }
    },
    {
      name: "ExtendAccountEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "account",
            type: "pubkey"
          },
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "current_size",
            type: "u64"
          },
          {
            name: "new_size",
            type: "u64"
          },
          {
            name: "timestamp",
            type: "i64"
          }
        ]
      }
    },
    {
      name: "Global",
      type: {
        kind: "struct",
        fields: [
          {
            name: "initialized",
            docs: ["Unused"],
            type: "bool"
          },
          {
            name: "authority",
            type: "pubkey"
          },
          {
            name: "fee_recipient",
            type: "pubkey"
          },
          {
            name: "initial_virtual_token_reserves",
            type: "u64"
          },
          {
            name: "initial_virtual_sol_reserves",
            type: "u64"
          },
          {
            name: "initial_real_token_reserves",
            type: "u64"
          },
          {
            name: "token_total_supply",
            type: "u64"
          },
          {
            name: "fee_basis_points",
            type: "u64"
          },
          {
            name: "withdraw_authority",
            type: "pubkey"
          },
          {
            name: "enable_migrate",
            docs: ["Unused"],
            type: "bool"
          },
          {
            name: "pool_migration_fee",
            type: "u64"
          },
          {
            name: "creator_fee_basis_points",
            type: "u64"
          },
          {
            name: "fee_recipients",
            type: {
              array: ["pubkey", 7]
            }
          },
          {
            name: "set_creator_authority",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "SetCreatorEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "mint",
            type: "pubkey"
          },
          {
            name: "bonding_curve",
            type: "pubkey"
          },
          {
            name: "creator",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "SetMetaplexCreatorEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "mint",
            type: "pubkey"
          },
          {
            name: "bonding_curve",
            type: "pubkey"
          },
          {
            name: "metadata",
            type: "pubkey"
          },
          {
            name: "creator",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "SetParamsEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "initial_virtual_token_reserves",
            type: "u64"
          },
          {
            name: "initial_virtual_sol_reserves",
            type: "u64"
          },
          {
            name: "initial_real_token_reserves",
            type: "u64"
          },
          {
            name: "final_real_sol_reserves",
            type: "u64"
          },
          {
            name: "token_total_supply",
            type: "u64"
          },
          {
            name: "fee_basis_points",
            type: "u64"
          },
          {
            name: "withdraw_authority",
            type: "pubkey"
          },
          {
            name: "enable_migrate",
            type: "bool"
          },
          {
            name: "pool_migration_fee",
            type: "u64"
          },
          {
            name: "creator_fee_basis_points",
            type: "u64"
          },
          {
            name: "fee_recipients",
            type: {
              array: ["pubkey", 8]
            }
          },
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "set_creator_authority",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "TradeEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "mint",
            type: "pubkey"
          },
          {
            name: "sol_amount",
            type: "u64"
          },
          {
            name: "token_amount",
            type: "u64"
          },
          {
            name: "is_buy",
            type: "bool"
          },
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "virtual_sol_reserves",
            type: "u64"
          },
          {
            name: "virtual_token_reserves",
            type: "u64"
          },
          {
            name: "real_sol_reserves",
            type: "u64"
          },
          {
            name: "real_token_reserves",
            type: "u64"
          },
          {
            name: "fee_recipient",
            type: "pubkey"
          },
          {
            name: "fee_basis_points",
            type: "u64"
          },
          {
            name: "fee",
            type: "u64"
          },
          {
            name: "creator",
            type: "pubkey"
          },
          {
            name: "creator_fee_basis_points",
            type: "u64"
          },
          {
            name: "creator_fee",
            type: "u64"
          }
        ]
      }
    },
    {
      name: "UpdateGlobalAuthorityEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "global",
            type: "pubkey"
          },
          {
            name: "authority",
            type: "pubkey"
          },
          {
            name: "new_authority",
            type: "pubkey"
          },
          {
            name: "timestamp",
            type: "i64"
          }
        ]
      }
    }
  ]
};

// src/bondingCurve.ts
var import_bn = __toESM(require("bn.js"));
var import_web3 = require("@solana/web3.js");
function getFee(global2, bondingCurve, amount, newCoin) {
  return computeFee(amount, global2.feeBasisPoints).add(
    newCoin || !import_web3.PublicKey.default.equals(bondingCurve.creator) ? computeFee(amount, global2.creatorFeeBasisPoints) : new import_bn.default(0)
  );
}
function computeFee(amount, feeBasisPoints) {
  return ceilDiv(amount.mul(feeBasisPoints), new import_bn.default(1e4));
}
function ceilDiv(a, b) {
  return a.add(b.subn(1)).div(b);
}
function getBuyTokenAmountFromSolAmount(global2, bondingCurve, amount, newCoin) {
  if (amount.eq(new import_bn.default(0))) {
    return new import_bn.default(0);
  }
  if (bondingCurve.virtualTokenReserves.eq(new import_bn.default(0))) {
    return new import_bn.default(0);
  }
  const totalFeeBasisPoints = global2.feeBasisPoints.add(
    newCoin || !import_web3.PublicKey.default.equals(bondingCurve.creator) ? global2.creatorFeeBasisPoints : new import_bn.default(0)
  );
  const inputAmount = amount.muln(1e4).div(totalFeeBasisPoints.addn(1e4));
  const tokensReceived = inputAmount.mul(bondingCurve.virtualTokenReserves).div(bondingCurve.virtualSolReserves.add(inputAmount));
  return import_bn.default.min(tokensReceived, bondingCurve.realTokenReserves);
}
function getBuySolAmountFromTokenAmount(global2, bondingCurve, amount, newCoin) {
  if (amount.eq(new import_bn.default(0))) {
    return new import_bn.default(0);
  }
  if (bondingCurve.virtualTokenReserves.eq(new import_bn.default(0))) {
    return new import_bn.default(0);
  }
  const minAmount = import_bn.default.min(amount, bondingCurve.realTokenReserves);
  const solCost = minAmount.mul(bondingCurve.virtualSolReserves).div(bondingCurve.virtualTokenReserves.sub(minAmount)).add(new import_bn.default(1));
  return solCost.add(getFee(global2, bondingCurve, solCost, newCoin));
}
function getSellSolAmountFromTokenAmount(global2, bondingCurve, amount) {
  if (amount.eq(new import_bn.default(0))) {
    return new import_bn.default(0);
  }
  if (bondingCurve.virtualTokenReserves.eq(new import_bn.default(0))) {
    return new import_bn.default(0);
  }
  const solCost = amount.mul(bondingCurve.virtualSolReserves).div(bondingCurve.virtualTokenReserves.add(amount));
  return solCost.sub(getFee(global2, bondingCurve, solCost, false));
}

// src/pda.ts
var import_web32 = require("@solana/web3.js");
var import_spl_token = require("@solana/spl-token");
var import_pump_swap_sdk = require("@pump-fun/pump-swap-sdk");
function globalPda(programId) {
  const [globalPda2] = import_web32.PublicKey.findProgramAddressSync(
    [Buffer.from("global")],
    programId
  );
  return globalPda2;
}
function bondingCurvePda(programId, mint) {
  const [bondingCurvePda2] = import_web32.PublicKey.findProgramAddressSync(
    [Buffer.from("bonding-curve"), new import_web32.PublicKey(mint).toBuffer()],
    programId
  );
  return bondingCurvePda2;
}
function creatorVaultPda(programId, creator) {
  const [creatorVault] = import_web32.PublicKey.findProgramAddressSync(
    [Buffer.from("creator-vault"), creator.toBuffer()],
    programId
  );
  return creatorVault;
}
function pumpPoolAuthorityPda(mint, pumpProgramId) {
  return import_web32.PublicKey.findProgramAddressSync(
    [Buffer.from("pool-authority"), mint.toBuffer()],
    pumpProgramId
  );
}
var CANONICAL_POOL_INDEX = 0;
function canonicalPumpPoolPda(pumpProgramId, pumpAmmProgramId, mint) {
  const [pumpPoolAuthority] = pumpPoolAuthorityPda(mint, pumpProgramId);
  return (0, import_pump_swap_sdk.poolPda)(
    CANONICAL_POOL_INDEX,
    pumpPoolAuthority,
    mint,
    import_spl_token.NATIVE_MINT,
    pumpAmmProgramId
  );
}

// src/sdk.ts
var import_bn4 = __toESM(require("bn.js"));

// node_modules/.pnpm/@coral-xyz+anchor@0.31.1_bufferutil@4.0.9_typescript@5.8.3_utf-8-validate@5.0.10/node_modules/@coral-xyz/anchor/dist/browser/index.js
var import_bn2 = __toESM(require("bn.js"));
var import_bn3 = __toESM(require("bn.js"));
var import_web33 = require("@solana/web3.js");
var web3_js = __toESM(require("@solana/web3.js"));
var import_buffer = __toESM(require_buffer());
var import_bs58 = __toESM(require_bs58());
var import_camelcase = __toESM(require_camelcase());
var borsh = __toESM(require_dist());

// node_modules/.pnpm/pako@2.1.0/node_modules/pako/dist/pako.esm.mjs
var Z_FIXED$1 = 4;
var Z_BINARY = 0;
var Z_TEXT = 1;
var Z_UNKNOWN$1 = 2;
function zero$1(buf) {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH$1 = 3;
var MAX_MATCH$1 = 258;
var LENGTH_CODES$1 = 29;
var LITERALS$1 = 256;
var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
var D_CODES$1 = 30;
var BL_CODES$1 = 19;
var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
var MAX_BITS$1 = 15;
var Buf_size = 16;
var MAX_BL_BITS = 7;
var END_BLOCK = 256;
var REP_3_6 = 16;
var REPZ_3_10 = 17;
var REPZ_11_138 = 18;
var extra_lbits = (
  /* extra bits for each length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
);
var extra_dbits = (
  /* extra bits for each distance code */
  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
);
var extra_blbits = (
  /* extra bits for each bit length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
);
var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var DIST_CODE_LEN = 512;
var static_ltree = new Array((L_CODES$1 + 2) * 2);
zero$1(static_ltree);
var static_dtree = new Array(D_CODES$1 * 2);
zero$1(static_dtree);
var _dist_code = new Array(DIST_CODE_LEN);
zero$1(_dist_code);
var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
zero$1(_length_code);
var base_length = new Array(LENGTH_CODES$1);
zero$1(base_length);
var base_dist = new Array(D_CODES$1);
zero$1(base_dist);
function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree;
  this.extra_bits = extra_bits;
  this.extra_base = extra_base;
  this.elems = elems;
  this.max_length = max_length;
  this.has_stree = static_tree && static_tree.length;
}
var static_l_desc;
var static_d_desc;
var static_bl_desc;
function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;
  this.max_code = 0;
  this.stat_desc = stat_desc;
}
var d_code = (dist2) => {
  return dist2 < 256 ? _dist_code[dist2] : _dist_code[256 + (dist2 >>> 7)];
};
var put_short = (s, w) => {
  s.pending_buf[s.pending++] = w & 255;
  s.pending_buf[s.pending++] = w >>> 8 & 255;
};
var send_bits = (s, value, length) => {
  if (s.bi_valid > Buf_size - length) {
    s.bi_buf |= value << s.bi_valid & 65535;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> Buf_size - s.bi_valid;
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= value << s.bi_valid & 65535;
    s.bi_valid += length;
  }
};
var send_code = (s, c, tree) => {
  send_bits(
    s,
    tree[c * 2],
    tree[c * 2 + 1]
    /*.Len*/
  );
};
var bi_reverse = (code, len) => {
  let res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
};
var bi_flush = (s) => {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;
  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 255;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
};
var gen_bitlen = (s, desc) => {
  const tree = desc.dyn_tree;
  const max_code = desc.max_code;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const extra = desc.stat_desc.extra_bits;
  const base = desc.stat_desc.extra_base;
  const max_length = desc.stat_desc.max_length;
  let h;
  let n, m;
  let bits;
  let xbits;
  let f;
  let overflow = 0;
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    s.bl_count[bits] = 0;
  }
  tree[s.heap[s.heap_max] * 2 + 1] = 0;
  for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1] = bits;
    if (n > max_code) {
      continue;
    }
    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2];
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1] + xbits);
    }
  }
  if (overflow === 0) {
    return;
  }
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) {
      bits--;
    }
    s.bl_count[bits]--;
    s.bl_count[bits + 1] += 2;
    s.bl_count[max_length]--;
    overflow -= 2;
  } while (overflow > 0);
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) {
        continue;
      }
      if (tree[m * 2 + 1] !== bits) {
        s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
        tree[m * 2 + 1] = bits;
      }
      n--;
    }
  }
};
var gen_codes = (tree, max_code, bl_count) => {
  const next_code = new Array(MAX_BITS$1 + 1);
  let code = 0;
  let bits;
  let n;
  for (bits = 1; bits <= MAX_BITS$1; bits++) {
    code = code + bl_count[bits - 1] << 1;
    next_code[bits] = code;
  }
  for (n = 0; n <= max_code; n++) {
    let len = tree[n * 2 + 1];
    if (len === 0) {
      continue;
    }
    tree[n * 2] = bi_reverse(next_code[len]++, len);
  }
};
var tr_static_init = () => {
  let n;
  let bits;
  let length;
  let code;
  let dist2;
  const bl_count = new Array(MAX_BITS$1 + 1);
  length = 0;
  for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < 1 << extra_lbits[code]; n++) {
      _length_code[length++] = code;
    }
  }
  _length_code[length - 1] = code;
  dist2 = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist2;
    for (n = 0; n < 1 << extra_dbits[code]; n++) {
      _dist_code[dist2++] = code;
    }
  }
  dist2 >>= 7;
  for (; code < D_CODES$1; code++) {
    base_dist[code] = dist2 << 7;
    for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
      _dist_code[256 + dist2++] = code;
    }
  }
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    bl_count[bits] = 0;
  }
  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1] = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1] = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
  for (n = 0; n < D_CODES$1; n++) {
    static_dtree[n * 2 + 1] = 5;
    static_dtree[n * 2] = bi_reverse(n, 5);
  }
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
};
var init_block = (s) => {
  let n;
  for (n = 0; n < L_CODES$1; n++) {
    s.dyn_ltree[n * 2] = 0;
  }
  for (n = 0; n < D_CODES$1; n++) {
    s.dyn_dtree[n * 2] = 0;
  }
  for (n = 0; n < BL_CODES$1; n++) {
    s.bl_tree[n * 2] = 0;
  }
  s.dyn_ltree[END_BLOCK * 2] = 1;
  s.opt_len = s.static_len = 0;
  s.sym_next = s.matches = 0;
};
var bi_windup = (s) => {
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
};
var smaller = (tree, n, m, depth) => {
  const _n2 = n * 2;
  const _m2 = m * 2;
  return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
};
var pqdownheap = (s, tree, k) => {
  const v = s.heap[k];
  let j = k << 1;
  while (j <= s.heap_len) {
    if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    if (smaller(tree, v, s.heap[j], s.depth)) {
      break;
    }
    s.heap[k] = s.heap[j];
    k = j;
    j <<= 1;
  }
  s.heap[k] = v;
};
var compress_block = (s, ltree, dtree) => {
  let dist2;
  let lc;
  let sx = 0;
  let code;
  let extra;
  if (s.sym_next !== 0) {
    do {
      dist2 = s.pending_buf[s.sym_buf + sx++] & 255;
      dist2 += (s.pending_buf[s.sym_buf + sx++] & 255) << 8;
      lc = s.pending_buf[s.sym_buf + sx++];
      if (dist2 === 0) {
        send_code(s, lc, ltree);
      } else {
        code = _length_code[lc];
        send_code(s, code + LITERALS$1 + 1, ltree);
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);
        }
        dist2--;
        code = d_code(dist2);
        send_code(s, code, dtree);
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist2 -= base_dist[code];
          send_bits(s, dist2, extra);
        }
      }
    } while (sx < s.sym_next);
  }
  send_code(s, END_BLOCK, ltree);
};
var build_tree = (s, desc) => {
  const tree = desc.dyn_tree;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const elems = desc.stat_desc.elems;
  let n, m;
  let max_code = -1;
  let node;
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE$1;
  for (n = 0; n < elems; n++) {
    if (tree[n * 2] !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;
    } else {
      tree[n * 2 + 1] = 0;
    }
  }
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
    tree[node * 2] = 1;
    s.depth[node] = 0;
    s.opt_len--;
    if (has_stree) {
      s.static_len -= stree[node * 2 + 1];
    }
  }
  desc.max_code = max_code;
  for (n = s.heap_len >> 1; n >= 1; n--) {
    pqdownheap(s, tree, n);
  }
  node = elems;
  do {
    n = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[
      1
      /*SMALLEST*/
    ] = s.heap[s.heap_len--];
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
    m = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[--s.heap_max] = n;
    s.heap[--s.heap_max] = m;
    tree[node * 2] = tree[n * 2] + tree[m * 2];
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1] = tree[m * 2 + 1] = node;
    s.heap[
      1
      /*SMALLEST*/
    ] = node++;
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
  } while (s.heap_len >= 2);
  s.heap[--s.heap_max] = s.heap[
    1
    /*SMALLEST*/
  ];
  gen_bitlen(s, desc);
  gen_codes(tree, max_code, s.bl_count);
};
var scan_tree = (s, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1] = 65535;
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      s.bl_tree[curlen * 2] += count;
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        s.bl_tree[curlen * 2]++;
      }
      s.bl_tree[REP_3_6 * 2]++;
    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]++;
    } else {
      s.bl_tree[REPZ_11_138 * 2]++;
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var send_tree = (s, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      do {
        send_code(s, curlen, s.bl_tree);
      } while (--count !== 0);
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);
    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);
    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var build_bl_tree = (s) => {
  let max_blindex;
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
  build_tree(s, s.bl_desc);
  for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
      break;
    }
  }
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  return max_blindex;
};
var send_all_trees = (s, lcodes, dcodes, blcodes) => {
  let rank2;
  send_bits(s, lcodes - 257, 5);
  send_bits(s, dcodes - 1, 5);
  send_bits(s, blcodes - 4, 4);
  for (rank2 = 0; rank2 < blcodes; rank2++) {
    send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
  }
  send_tree(s, s.dyn_ltree, lcodes - 1);
  send_tree(s, s.dyn_dtree, dcodes - 1);
};
var detect_data_type = (s) => {
  let block_mask = 4093624447;
  let n;
  for (n = 0; n <= 31; n++, block_mask >>>= 1) {
    if (block_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
      return Z_BINARY;
    }
  }
  if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS$1; n++) {
    if (s.dyn_ltree[n * 2] !== 0) {
      return Z_TEXT;
    }
  }
  return Z_BINARY;
};
var static_init_done = false;
var _tr_init$1 = (s) => {
  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }
  s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
  s.bi_buf = 0;
  s.bi_valid = 0;
  init_block(s);
};
var _tr_stored_block$1 = (s, buf, stored_len, last) => {
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
  bi_windup(s);
  put_short(s, stored_len);
  put_short(s, ~stored_len);
  if (stored_len) {
    s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
  }
  s.pending += stored_len;
};
var _tr_align$1 = (s) => {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
};
var _tr_flush_block$1 = (s, buf, stored_len, last) => {
  let opt_lenb, static_lenb;
  let max_blindex = 0;
  if (s.level > 0) {
    if (s.strm.data_type === Z_UNKNOWN$1) {
      s.strm.data_type = detect_data_type(s);
    }
    build_tree(s, s.l_desc);
    build_tree(s, s.d_desc);
    max_blindex = build_bl_tree(s);
    opt_lenb = s.opt_len + 3 + 7 >>> 3;
    static_lenb = s.static_len + 3 + 7 >>> 3;
    if (static_lenb <= opt_lenb) {
      opt_lenb = static_lenb;
    }
  } else {
    opt_lenb = static_lenb = stored_len + 5;
  }
  if (stored_len + 4 <= opt_lenb && buf !== -1) {
    _tr_stored_block$1(s, buf, stored_len, last);
  } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);
  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  init_block(s);
  if (last) {
    bi_windup(s);
  }
};
var _tr_tally$1 = (s, dist2, lc) => {
  s.pending_buf[s.sym_buf + s.sym_next++] = dist2;
  s.pending_buf[s.sym_buf + s.sym_next++] = dist2 >> 8;
  s.pending_buf[s.sym_buf + s.sym_next++] = lc;
  if (dist2 === 0) {
    s.dyn_ltree[lc * 2]++;
  } else {
    s.matches++;
    dist2--;
    s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
    s.dyn_dtree[d_code(dist2) * 2]++;
  }
  return s.sym_next === s.sym_end;
};
var _tr_init_1 = _tr_init$1;
var _tr_stored_block_1 = _tr_stored_block$1;
var _tr_flush_block_1 = _tr_flush_block$1;
var _tr_tally_1 = _tr_tally$1;
var _tr_align_1 = _tr_align$1;
var trees = {
  _tr_init: _tr_init_1,
  _tr_stored_block: _tr_stored_block_1,
  _tr_flush_block: _tr_flush_block_1,
  _tr_tally: _tr_tally_1,
  _tr_align: _tr_align_1
};
var adler32 = (adler, buf, len, pos) => {
  let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
  while (len !== 0) {
    n = len > 2e3 ? 2e3 : len;
    len -= n;
    do {
      s1 = s1 + buf[pos++] | 0;
      s2 = s2 + s1 | 0;
    } while (--n);
    s1 %= 65521;
    s2 %= 65521;
  }
  return s1 | s2 << 16 | 0;
};
var adler32_1 = adler32;
var makeTable = () => {
  let c, table = [];
  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    }
    table[n] = c;
  }
  return table;
};
var crcTable = new Uint32Array(makeTable());
var crc32 = (crc, buf, len, pos) => {
  const t = crcTable;
  const end = pos + len;
  crc ^= -1;
  for (let i = pos; i < end; i++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
  }
  return crc ^ -1;
};
var crc32_1 = crc32;
var messages = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
};
var constants$2 = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
var { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$2,
  Z_PARTIAL_FLUSH,
  Z_FULL_FLUSH: Z_FULL_FLUSH$1,
  Z_FINISH: Z_FINISH$3,
  Z_BLOCK: Z_BLOCK$1,
  Z_OK: Z_OK$3,
  Z_STREAM_END: Z_STREAM_END$3,
  Z_STREAM_ERROR: Z_STREAM_ERROR$2,
  Z_DATA_ERROR: Z_DATA_ERROR$2,
  Z_BUF_ERROR: Z_BUF_ERROR$1,
  Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
  Z_FILTERED,
  Z_HUFFMAN_ONLY,
  Z_RLE,
  Z_FIXED,
  Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
  Z_UNKNOWN,
  Z_DEFLATED: Z_DEFLATED$2
} = constants$2;
var MAX_MEM_LEVEL = 9;
var MAX_WBITS$1 = 15;
var DEF_MEM_LEVEL = 8;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = LITERALS + 1 + LENGTH_CODES;
var D_CODES = 30;
var BL_CODES = 19;
var HEAP_SIZE = 2 * L_CODES + 1;
var MAX_BITS = 15;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
var PRESET_DICT = 32;
var INIT_STATE = 42;
var GZIP_STATE = 57;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
var BS_NEED_MORE = 1;
var BS_BLOCK_DONE = 2;
var BS_FINISH_STARTED = 3;
var BS_FINISH_DONE = 4;
var OS_CODE = 3;
var err = (strm, errorCode) => {
  strm.msg = messages[errorCode];
  return errorCode;
};
var rank = (f) => {
  return f * 2 - (f > 4 ? 9 : 0);
};
var zero = (buf) => {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
};
var slide_hash = (s) => {
  let n, m;
  let p;
  let wsize = s.w_size;
  n = s.hash_size;
  p = n;
  do {
    m = s.head[--p];
    s.head[p] = m >= wsize ? m - wsize : 0;
  } while (--n);
  n = wsize;
  p = n;
  do {
    m = s.prev[--p];
    s.prev[p] = m >= wsize ? m - wsize : 0;
  } while (--n);
};
var HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
var HASH = HASH_ZLIB;
var flush_pending = (strm) => {
  const s = strm.state;
  let len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) {
    return;
  }
  strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
};
var flush_block_only = (s, last) => {
  _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
};
var put_byte = (s, b) => {
  s.pending_buf[s.pending++] = b;
};
var putShortMSB = (s, b) => {
  s.pending_buf[s.pending++] = b >>> 8 & 255;
  s.pending_buf[s.pending++] = b & 255;
};
var read_buf = (strm, buf, start, size) => {
  let len = strm.avail_in;
  if (len > size) {
    len = size;
  }
  if (len === 0) {
    return 0;
  }
  strm.avail_in -= len;
  buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32_1(strm.adler, buf, len, start);
  } else if (strm.state.wrap === 2) {
    strm.adler = crc32_1(strm.adler, buf, len, start);
  }
  strm.next_in += len;
  strm.total_in += len;
  return len;
};
var longest_match = (s, cur_match) => {
  let chain_length = s.max_chain_length;
  let scan = s.strstart;
  let match;
  let len;
  let best_len = s.prev_length;
  let nice_match = s.nice_match;
  const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
  const _win = s.window;
  const wmask = s.w_mask;
  const prev = s.prev;
  const strend = s.strstart + MAX_MATCH;
  let scan_end1 = _win[scan + best_len - 1];
  let scan_end = _win[scan + best_len];
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  if (nice_match > s.lookahead) {
    nice_match = s.lookahead;
  }
  do {
    match = cur_match;
    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
      continue;
    }
    scan += 2;
    match++;
    do {
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;
    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1 = _win[scan + best_len - 1];
      scan_end = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
};
var fill_window = (s) => {
  const _w_size = s.w_size;
  let n, more, str2;
  do {
    more = s.window_size - s.lookahead - s.strstart;
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
      s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      s.block_start -= _w_size;
      if (s.insert > s.strstart) {
        s.insert = s.strstart;
      }
      slide_hash(s);
      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str2 = s.strstart - s.insert;
      s.ins_h = s.window[str2];
      s.ins_h = HASH(s, s.ins_h, s.window[str2 + 1]);
      while (s.insert) {
        s.ins_h = HASH(s, s.ins_h, s.window[str2 + MIN_MATCH - 1]);
        s.prev[str2 & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str2;
        str2++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
};
var deflate_stored = (s, flush) => {
  let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;
  let len, left, have, last = 0;
  let used = s.strm.avail_in;
  do {
    len = 65535;
    have = s.bi_valid + 42 >> 3;
    if (s.strm.avail_out < have) {
      break;
    }
    have = s.strm.avail_out - have;
    left = s.strstart - s.block_start;
    if (len > left + s.strm.avail_in) {
      len = left + s.strm.avail_in;
    }
    if (len > have) {
      len = have;
    }
    if (len < min_block && (len === 0 && flush !== Z_FINISH$3 || flush === Z_NO_FLUSH$2 || len !== left + s.strm.avail_in)) {
      break;
    }
    last = flush === Z_FINISH$3 && len === left + s.strm.avail_in ? 1 : 0;
    _tr_stored_block(s, 0, 0, last);
    s.pending_buf[s.pending - 4] = len;
    s.pending_buf[s.pending - 3] = len >> 8;
    s.pending_buf[s.pending - 2] = ~len;
    s.pending_buf[s.pending - 1] = ~len >> 8;
    flush_pending(s.strm);
    if (left) {
      if (left > len) {
        left = len;
      }
      s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
      s.strm.next_out += left;
      s.strm.avail_out -= left;
      s.strm.total_out += left;
      s.block_start += left;
      len -= left;
    }
    if (len) {
      read_buf(s.strm, s.strm.output, s.strm.next_out, len);
      s.strm.next_out += len;
      s.strm.avail_out -= len;
      s.strm.total_out += len;
    }
  } while (last === 0);
  used -= s.strm.avail_in;
  if (used) {
    if (used >= s.w_size) {
      s.matches = 2;
      s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
      s.strstart = s.w_size;
      s.insert = s.strstart;
    } else {
      if (s.window_size - s.strstart <= used) {
        s.strstart -= s.w_size;
        s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
        if (s.matches < 2) {
          s.matches++;
        }
        if (s.insert > s.strstart) {
          s.insert = s.strstart;
        }
      }
      s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
      s.strstart += used;
      s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
    }
    s.block_start = s.strstart;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  if (last) {
    return BS_FINISH_DONE;
  }
  if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 && s.strm.avail_in === 0 && s.strstart === s.block_start) {
    return BS_BLOCK_DONE;
  }
  have = s.window_size - s.strstart;
  if (s.strm.avail_in > have && s.block_start >= s.w_size) {
    s.block_start -= s.w_size;
    s.strstart -= s.w_size;
    s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
    if (s.matches < 2) {
      s.matches++;
    }
    have += s.w_size;
    if (s.insert > s.strstart) {
      s.insert = s.strstart;
    }
  }
  if (have > s.strm.avail_in) {
    have = s.strm.avail_in;
  }
  if (have) {
    read_buf(s.strm, s.window, s.strstart, have);
    s.strstart += have;
    s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  have = s.bi_valid + 42 >> 3;
  have = s.pending_buf_size - have > 65535 ? 65535 : s.pending_buf_size - have;
  min_block = have > s.w_size ? s.w_size : have;
  left = s.strstart - s.block_start;
  if (left >= min_block || (left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 && s.strm.avail_in === 0 && left <= have) {
    len = left > have ? have : left;
    last = flush === Z_FINISH$3 && s.strm.avail_in === 0 && len === left ? 1 : 0;
    _tr_stored_block(s, s.block_start, len, last);
    s.block_start += len;
    flush_pending(s.strm);
  }
  return last ? BS_FINISH_STARTED : BS_NEED_MORE;
};
var deflate_fast = (s, flush) => {
  let hash_head;
  let bflush;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
        s.match_length--;
        do {
          s.strstart++;
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        } while (--s.match_length !== 0);
        s.strstart++;
      } else {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
      }
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_slow = (s, flush) => {
  let hash_head;
  let bflush;
  let max_insert;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;
    if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
      if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
        s.match_length = MIN_MATCH - 1;
      }
    }
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    } else if (s.match_available) {
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
      if (bflush) {
        flush_block_only(s, false);
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  if (s.match_available) {
    bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_rle = (s, flush) => {
  let bflush;
  let prev;
  let scan, strend;
  const _win = s.window;
  for (; ; ) {
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
        } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_huff = (s, flush) => {
  let bflush;
  for (; ; ) {
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        break;
      }
    }
    s.match_length = 0;
    bflush = _tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}
var configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),
  /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),
  /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),
  /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),
  /* 3 */
  new Config(4, 4, 16, 16, deflate_slow),
  /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),
  /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),
  /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),
  /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),
  /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)
  /* 9 max compression */
];
var lm_init = (s) => {
  s.window_size = 2 * s.w_size;
  zero(s.head);
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;
  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
};
function DeflateState() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = Z_DEFLATED$2;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
  this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
  this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = new Uint16Array(MAX_BITS + 1);
  this.heap = new Uint16Array(2 * L_CODES + 1);
  zero(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = new Uint16Array(2 * L_CODES + 1);
  zero(this.depth);
  this.sym_buf = 0;
  this.lit_bufsize = 0;
  this.sym_next = 0;
  this.sym_end = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
var deflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const s = strm.state;
  if (!s || s.strm !== strm || s.status !== INIT_STATE && //#ifdef GZIP
  s.status !== GZIP_STATE && //#endif
  s.status !== EXTRA_STATE && s.status !== NAME_STATE && s.status !== COMMENT_STATE && s.status !== HCRC_STATE && s.status !== BUSY_STATE && s.status !== FINISH_STATE) {
    return 1;
  }
  return 0;
};
var deflateResetKeep = (strm) => {
  if (deflateStateCheck(strm)) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;
  const s = strm.state;
  s.pending = 0;
  s.pending_out = 0;
  if (s.wrap < 0) {
    s.wrap = -s.wrap;
  }
  s.status = //#ifdef GZIP
  s.wrap === 2 ? GZIP_STATE : (
    //#endif
    s.wrap ? INIT_STATE : BUSY_STATE
  );
  strm.adler = s.wrap === 2 ? 0 : 1;
  s.last_flush = -2;
  _tr_init(s);
  return Z_OK$3;
};
var deflateReset = (strm) => {
  const ret = deflateResetKeep(strm);
  if (ret === Z_OK$3) {
    lm_init(strm.state);
  }
  return ret;
};
var deflateSetHeader = (strm, head) => {
  if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
    return Z_STREAM_ERROR$2;
  }
  strm.state.gzhead = head;
  return Z_OK$3;
};
var deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
  if (!strm) {
    return Z_STREAM_ERROR$2;
  }
  let wrap = 1;
  if (level === Z_DEFAULT_COMPRESSION$1) {
    level = 6;
  }
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else if (windowBits > 15) {
    wrap = 2;
    windowBits -= 16;
  }
  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED || windowBits === 8 && wrap !== 1) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  if (windowBits === 8) {
    windowBits = 9;
  }
  const s = new DeflateState();
  strm.state = s;
  s.strm = strm;
  s.status = INIT_STATE;
  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;
  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
  s.window = new Uint8Array(s.w_size * 2);
  s.head = new Uint16Array(s.hash_size);
  s.prev = new Uint16Array(s.w_size);
  s.lit_bufsize = 1 << memLevel + 6;
  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new Uint8Array(s.pending_buf_size);
  s.sym_buf = s.lit_bufsize;
  s.sym_end = (s.lit_bufsize - 1) * 3;
  s.level = level;
  s.strategy = strategy;
  s.method = method;
  return deflateReset(strm);
};
var deflateInit = (strm, level) => {
  return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
};
var deflate$2 = (strm, flush) => {
  if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  if (!strm.output || strm.avail_in !== 0 && !strm.input || s.status === FINISH_STATE && flush !== Z_FINISH$3) {
    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
  }
  const old_flush = s.last_flush;
  s.last_flush = flush;
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s.status === INIT_STATE && s.wrap === 0) {
    s.status = BUSY_STATE;
  }
  if (s.status === INIT_STATE) {
    let header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
    let level_flags = -1;
    if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
      level_flags = 0;
    } else if (s.level < 6) {
      level_flags = 1;
    } else if (s.level === 6) {
      level_flags = 2;
    } else {
      level_flags = 3;
    }
    header |= level_flags << 6;
    if (s.strstart !== 0) {
      header |= PRESET_DICT;
    }
    header += 31 - header % 31;
    putShortMSB(s, header);
    if (s.strstart !== 0) {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    strm.adler = 1;
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (s.status === GZIP_STATE) {
    strm.adler = 0;
    put_byte(s, 31);
    put_byte(s, 139);
    put_byte(s, 8);
    if (!s.gzhead) {
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, OS_CODE);
      s.status = BUSY_STATE;
      flush_pending(strm);
      if (s.pending !== 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    } else {
      put_byte(
        s,
        (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
      );
      put_byte(s, s.gzhead.time & 255);
      put_byte(s, s.gzhead.time >> 8 & 255);
      put_byte(s, s.gzhead.time >> 16 & 255);
      put_byte(s, s.gzhead.time >> 24 & 255);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, s.gzhead.os & 255);
      if (s.gzhead.extra && s.gzhead.extra.length) {
        put_byte(s, s.gzhead.extra.length & 255);
        put_byte(s, s.gzhead.extra.length >> 8 & 255);
      }
      if (s.gzhead.hcrc) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
      }
      s.gzindex = 0;
      s.status = EXTRA_STATE;
    }
  }
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra) {
      let beg = s.pending;
      let left = (s.gzhead.extra.length & 65535) - s.gzindex;
      while (s.pending + left > s.pending_buf_size) {
        let copy = s.pending_buf_size - s.pending;
        s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
        s.pending = s.pending_buf_size;
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        s.gzindex += copy;
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
        beg = 0;
        left -= copy;
      }
      let gzhead_extra = new Uint8Array(s.gzhead.extra);
      s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
      s.pending += left;
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = NAME_STATE;
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = COMMENT_STATE;
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
    }
    s.status = HCRC_STATE;
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      strm.adler = 0;
    }
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE) {
    let bstate = s.level === 0 ? deflate_stored(s, flush) : s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
      }
      return Z_OK$3;
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        _tr_align(s);
      } else if (flush !== Z_BLOCK$1) {
        _tr_stored_block(s, 0, 0, false);
        if (flush === Z_FULL_FLUSH$1) {
          zero(s.head);
          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    }
  }
  if (flush !== Z_FINISH$3) {
    return Z_OK$3;
  }
  if (s.wrap <= 0) {
    return Z_STREAM_END$3;
  }
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 255);
    put_byte(s, strm.adler >> 8 & 255);
    put_byte(s, strm.adler >> 16 & 255);
    put_byte(s, strm.adler >> 24 & 255);
    put_byte(s, strm.total_in & 255);
    put_byte(s, strm.total_in >> 8 & 255);
    put_byte(s, strm.total_in >> 16 & 255);
    put_byte(s, strm.total_in >> 24 & 255);
  } else {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 65535);
  }
  flush_pending(strm);
  if (s.wrap > 0) {
    s.wrap = -s.wrap;
  }
  return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
};
var deflateEnd = (strm) => {
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const status = strm.state.status;
  strm.state = null;
  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
};
var deflateSetDictionary = (strm, dictionary) => {
  let dictLength = dictionary.length;
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  const wrap = s.wrap;
  if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
    return Z_STREAM_ERROR$2;
  }
  if (wrap === 1) {
    strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
  }
  s.wrap = 0;
  if (dictLength >= s.w_size) {
    if (wrap === 0) {
      zero(s.head);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    let tmpDict = new Uint8Array(s.w_size);
    tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  const avail = strm.avail_in;
  const next = strm.next_in;
  const input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    let str2 = s.strstart;
    let n = s.lookahead - (MIN_MATCH - 1);
    do {
      s.ins_h = HASH(s, s.ins_h, s.window[str2 + MIN_MATCH - 1]);
      s.prev[str2 & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = str2;
      str2++;
    } while (--n);
    s.strstart = str2;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK$3;
};
var deflateInit_1 = deflateInit;
var deflateInit2_1 = deflateInit2;
var deflateReset_1 = deflateReset;
var deflateResetKeep_1 = deflateResetKeep;
var deflateSetHeader_1 = deflateSetHeader;
var deflate_2$1 = deflate$2;
var deflateEnd_1 = deflateEnd;
var deflateSetDictionary_1 = deflateSetDictionary;
var deflateInfo = "pako deflate (from Nodeca project)";
var deflate_1$2 = {
  deflateInit: deflateInit_1,
  deflateInit2: deflateInit2_1,
  deflateReset: deflateReset_1,
  deflateResetKeep: deflateResetKeep_1,
  deflateSetHeader: deflateSetHeader_1,
  deflate: deflate_2$1,
  deflateEnd: deflateEnd_1,
  deflateSetDictionary: deflateSetDictionary_1,
  deflateInfo
};
var _has = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
var assign = function(obj) {
  const sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    const source = sources.shift();
    if (!source) {
      continue;
    }
    if (typeof source !== "object") {
      throw new TypeError(source + "must be non-object");
    }
    for (const p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }
  return obj;
};
var flattenChunks = (chunks2) => {
  let len = 0;
  for (let i = 0, l = chunks2.length; i < l; i++) {
    len += chunks2[i].length;
  }
  const result = new Uint8Array(len);
  for (let i = 0, pos = 0, l = chunks2.length; i < l; i++) {
    let chunk = chunks2[i];
    result.set(chunk, pos);
    pos += chunk.length;
  }
  return result;
};
var common = {
  assign,
  flattenChunks
};
var STR_APPLY_UIA_OK = true;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch (__) {
  STR_APPLY_UIA_OK = false;
}
var _utf8len = new Uint8Array(256);
for (let q = 0; q < 256; q++) {
  _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
}
_utf8len[254] = _utf8len[254] = 1;
var string2buf = (str2) => {
  if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
    return new TextEncoder().encode(str2);
  }
  let buf, c, c2, m_pos, i, str_len = str2.length, buf_len = 0;
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str2.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str2.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
  }
  buf = new Uint8Array(buf_len);
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str2.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str2.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    if (c < 128) {
      buf[i++] = c;
    } else if (c < 2048) {
      buf[i++] = 192 | c >>> 6;
      buf[i++] = 128 | c & 63;
    } else if (c < 65536) {
      buf[i++] = 224 | c >>> 12;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    } else {
      buf[i++] = 240 | c >>> 18;
      buf[i++] = 128 | c >>> 12 & 63;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    }
  }
  return buf;
};
var buf2binstring = (buf, len) => {
  if (len < 65534) {
    if (buf.subarray && STR_APPLY_UIA_OK) {
      return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
    }
  }
  let result = "";
  for (let i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
};
var buf2string = (buf, max) => {
  const len = max || buf.length;
  if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
    return new TextDecoder().decode(buf.subarray(0, max));
  }
  let i, out;
  const utf16buf = new Array(len * 2);
  for (out = 0, i = 0; i < len; ) {
    let c = buf[i++];
    if (c < 128) {
      utf16buf[out++] = c;
      continue;
    }
    let c_len = _utf8len[c];
    if (c_len > 4) {
      utf16buf[out++] = 65533;
      i += c_len - 1;
      continue;
    }
    c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
    while (c_len > 1 && i < len) {
      c = c << 6 | buf[i++] & 63;
      c_len--;
    }
    if (c_len > 1) {
      utf16buf[out++] = 65533;
      continue;
    }
    if (c < 65536) {
      utf16buf[out++] = c;
    } else {
      c -= 65536;
      utf16buf[out++] = 55296 | c >> 10 & 1023;
      utf16buf[out++] = 56320 | c & 1023;
    }
  }
  return buf2binstring(utf16buf, out);
};
var utf8border = (buf, max) => {
  max = max || buf.length;
  if (max > buf.length) {
    max = buf.length;
  }
  let pos = max - 1;
  while (pos >= 0 && (buf[pos] & 192) === 128) {
    pos--;
  }
  if (pos < 0) {
    return max;
  }
  if (pos === 0) {
    return max;
  }
  return pos + _utf8len[buf[pos]] > max ? pos : max;
};
var strings = {
  string2buf,
  buf2string,
  utf8border
};
function ZStream() {
  this.input = null;
  this.next_in = 0;
  this.avail_in = 0;
  this.total_in = 0;
  this.output = null;
  this.next_out = 0;
  this.avail_out = 0;
  this.total_out = 0;
  this.msg = "";
  this.state = null;
  this.data_type = 2;
  this.adler = 0;
}
var zstream = ZStream;
var toString$1 = Object.prototype.toString;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$1,
  Z_SYNC_FLUSH,
  Z_FULL_FLUSH,
  Z_FINISH: Z_FINISH$2,
  Z_OK: Z_OK$2,
  Z_STREAM_END: Z_STREAM_END$2,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY,
  Z_DEFLATED: Z_DEFLATED$1
} = constants$2;
function Deflate$1(options) {
  this.options = common.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED$1,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY
  }, options || {});
  let opt = this.options;
  if (opt.raw && opt.windowBits > 0) {
    opt.windowBits = -opt.windowBits;
  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
    opt.windowBits += 16;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = deflate_1$2.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );
  if (status !== Z_OK$2) {
    throw new Error(messages[status]);
  }
  if (opt.header) {
    deflate_1$2.deflateSetHeader(this.strm, opt.header);
  }
  if (opt.dictionary) {
    let dict;
    if (typeof opt.dictionary === "string") {
      dict = strings.string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }
    status = deflate_1$2.deflateSetDictionary(this.strm, dict);
    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }
    this._dict_set = true;
  }
}
Deflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  let status, _flush_mode;
  if (this.ended) {
    return false;
  }
  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;
  if (typeof data === "string") {
    strm.input = strings.string2buf(data);
  } else if (toString$1.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (; ; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    status = deflate_1$2.deflate(strm, _flush_mode);
    if (status === Z_STREAM_END$2) {
      if (strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
      }
      status = deflate_1$2.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK$2;
    }
    if (strm.avail_out === 0) {
      this.onData(strm.output);
      continue;
    }
    if (_flush_mode > 0 && strm.next_out > 0) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    if (strm.avail_in === 0) break;
  }
  return true;
};
Deflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Deflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK$2) {
    this.result = common.flattenChunks(this.chunks);
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function deflate$1(input, options) {
  const deflator = new Deflate$1(options);
  deflator.push(input, true);
  if (deflator.err) {
    throw deflator.msg || messages[deflator.err];
  }
  return deflator.result;
}
function deflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return deflate$1(input, options);
}
function gzip$1(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate$1(input, options);
}
var Deflate_1$1 = Deflate$1;
var deflate_2 = deflate$1;
var deflateRaw_1$1 = deflateRaw$1;
var gzip_1$1 = gzip$1;
var constants$1 = constants$2;
var deflate_1$1 = {
  Deflate: Deflate_1$1,
  deflate: deflate_2,
  deflateRaw: deflateRaw_1$1,
  gzip: gzip_1$1,
  constants: constants$1
};
var BAD$1 = 16209;
var TYPE$1 = 16191;
var inffast = function inflate_fast(strm, start) {
  let _in;
  let last;
  let _out;
  let beg;
  let end;
  let dmax;
  let wsize;
  let whave;
  let wnext;
  let s_window;
  let hold;
  let bits;
  let lcode;
  let dcode;
  let lmask;
  let dmask;
  let here;
  let op;
  let len;
  let dist2;
  let from;
  let from_source;
  let input, output;
  const state = strm.state;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
  dmax = state.dmax;
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;
  top:
    do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }
      here = lcode[hold & lmask];
      dolen:
        for (; ; ) {
          op = here >>> 24;
          hold >>>= op;
          bits -= op;
          op = here >>> 16 & 255;
          if (op === 0) {
            output[_out++] = here & 65535;
          } else if (op & 16) {
            len = here & 65535;
            op &= 15;
            if (op) {
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
              len += hold & (1 << op) - 1;
              hold >>>= op;
              bits -= op;
            }
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = dcode[hold & dmask];
            dodist:
              for (; ; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op & 16) {
                  dist2 = here & 65535;
                  op &= 15;
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                  }
                  dist2 += hold & (1 << op) - 1;
                  if (dist2 > dmax) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD$1;
                    break top;
                  }
                  hold >>>= op;
                  bits -= op;
                  op = _out - beg;
                  if (dist2 > op) {
                    op = dist2 - op;
                    if (op > whave) {
                      if (state.sane) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD$1;
                        break top;
                      }
                    }
                    from = 0;
                    from_source = s_window;
                    if (wnext === 0) {
                      from += wsize - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist2;
                        from_source = output;
                      }
                    } else if (wnext < op) {
                      from += wsize + wnext - op;
                      op -= wnext;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = 0;
                        if (wnext < len) {
                          op = wnext;
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist2;
                          from_source = output;
                        }
                      }
                    } else {
                      from += wnext - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist2;
                        from_source = output;
                      }
                    }
                    while (len > 2) {
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      len -= 3;
                    }
                    if (len) {
                      output[_out++] = from_source[from++];
                      if (len > 1) {
                        output[_out++] = from_source[from++];
                      }
                    }
                  } else {
                    from = _out - dist2;
                    do {
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      len -= 3;
                    } while (len > 2);
                    if (len) {
                      output[_out++] = output[from++];
                      if (len > 1) {
                        output[_out++] = output[from++];
                      }
                    }
                  }
                } else if ((op & 64) === 0) {
                  here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dodist;
                } else {
                  strm.msg = "invalid distance code";
                  state.mode = BAD$1;
                  break top;
                }
                break;
              }
          } else if ((op & 64) === 0) {
            here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
            continue dolen;
          } else if (op & 32) {
            state.mode = TYPE$1;
            break top;
          } else {
            strm.msg = "invalid literal/length code";
            state.mode = BAD$1;
            break top;
          }
          break;
        }
    } while (_in < last && _out < end);
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
  strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
  state.hold = hold;
  state.bits = bits;
  return;
};
var MAXBITS = 15;
var ENOUGH_LENS$1 = 852;
var ENOUGH_DISTS$1 = 592;
var CODES$1 = 0;
var LENS$1 = 1;
var DISTS$1 = 2;
var lbase = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]);
var lext = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]);
var dbase = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]);
var dext = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]);
var inflate_table = (type2, lens, lens_index, codes, table, table_index, work, opts) => {
  const bits = opts.bits;
  let len = 0;
  let sym = 0;
  let min = 0, max = 0;
  let root = 0;
  let curr = 0;
  let drop = 0;
  let left = 0;
  let used = 0;
  let huff = 0;
  let incr;
  let fill;
  let low;
  let mask2;
  let next;
  let base = null;
  let match;
  const count = new Uint16Array(MAXBITS + 1);
  const offs = new Uint16Array(MAXBITS + 1);
  let extra = null;
  let here_bits, here_op, here_val;
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) {
      break;
    }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    opts.bits = 1;
    return 0;
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) {
      break;
    }
  }
  if (root < min) {
    root = min;
  }
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }
  }
  if (left > 0 && (type2 === CODES$1 || max !== 1)) {
    return -1;
  }
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }
  if (type2 === CODES$1) {
    base = extra = work;
    match = 20;
  } else if (type2 === LENS$1) {
    base = lbase;
    extra = lext;
    match = 257;
  } else {
    base = dbase;
    extra = dext;
    match = 0;
  }
  huff = 0;
  sym = 0;
  len = min;
  next = table_index;
  curr = root;
  drop = 0;
  low = -1;
  used = 1 << root;
  mask2 = used - 1;
  if (type2 === LENS$1 && used > ENOUGH_LENS$1 || type2 === DISTS$1 && used > ENOUGH_DISTS$1) {
    return 1;
  }
  for (; ; ) {
    here_bits = len - drop;
    if (work[sym] + 1 < match) {
      here_op = 0;
      here_val = work[sym];
    } else if (work[sym] >= match) {
      here_op = extra[work[sym] - match];
      here_val = base[work[sym] - match];
    } else {
      here_op = 32 + 64;
      here_val = 0;
    }
    incr = 1 << len - drop;
    fill = 1 << curr;
    min = fill;
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
    } while (fill !== 0);
    incr = 1 << len - 1;
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }
    sym++;
    if (--count[len] === 0) {
      if (len === max) {
        break;
      }
      len = lens[lens_index + work[sym]];
    }
    if (len > root && (huff & mask2) !== low) {
      if (drop === 0) {
        drop = root;
      }
      next += min;
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) {
          break;
        }
        curr++;
        left <<= 1;
      }
      used += 1 << curr;
      if (type2 === LENS$1 && used > ENOUGH_LENS$1 || type2 === DISTS$1 && used > ENOUGH_DISTS$1) {
        return 1;
      }
      low = huff & mask2;
      table[low] = root << 24 | curr << 16 | next - table_index | 0;
    }
  }
  if (huff !== 0) {
    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
  }
  opts.bits = root;
  return 0;
};
var inftrees = inflate_table;
var CODES = 0;
var LENS = 1;
var DISTS = 2;
var {
  Z_FINISH: Z_FINISH$1,
  Z_BLOCK,
  Z_TREES,
  Z_OK: Z_OK$1,
  Z_STREAM_END: Z_STREAM_END$1,
  Z_NEED_DICT: Z_NEED_DICT$1,
  Z_STREAM_ERROR: Z_STREAM_ERROR$1,
  Z_DATA_ERROR: Z_DATA_ERROR$1,
  Z_MEM_ERROR: Z_MEM_ERROR$1,
  Z_BUF_ERROR,
  Z_DEFLATED
} = constants$2;
var HEAD = 16180;
var FLAGS = 16181;
var TIME = 16182;
var OS = 16183;
var EXLEN = 16184;
var EXTRA = 16185;
var NAME = 16186;
var COMMENT = 16187;
var HCRC = 16188;
var DICTID = 16189;
var DICT = 16190;
var TYPE = 16191;
var TYPEDO = 16192;
var STORED = 16193;
var COPY_ = 16194;
var COPY = 16195;
var TABLE = 16196;
var LENLENS = 16197;
var CODELENS = 16198;
var LEN_ = 16199;
var LEN = 16200;
var LENEXT = 16201;
var DIST = 16202;
var DISTEXT = 16203;
var MATCH = 16204;
var LIT = 16205;
var CHECK = 16206;
var LENGTH = 16207;
var DONE = 16208;
var BAD = 16209;
var MEM = 16210;
var SYNC = 16211;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
var MAX_WBITS = 15;
var DEF_WBITS = MAX_WBITS;
var zswap32 = (q) => {
  return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
};
function InflateState() {
  this.strm = null;
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = new Uint16Array(320);
  this.work = new Uint16Array(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
var inflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const state = strm.state;
  if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
    return 1;
  }
  return 0;
};
var inflateResetKeep = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = "";
  if (state.wrap) {
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.flags = -1;
  state.dmax = 32768;
  state.head = null;
  state.hold = 0;
  state.bits = 0;
  state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
  state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
  state.sane = 1;
  state.back = -1;
  return Z_OK$1;
};
var inflateReset = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);
};
var inflateReset2 = (strm, windowBits) => {
  let wrap;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else {
    wrap = (windowBits >> 4) + 5;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR$1;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
};
var inflateInit2 = (strm, windowBits) => {
  if (!strm) {
    return Z_STREAM_ERROR$1;
  }
  const state = new InflateState();
  strm.state = state;
  state.strm = strm;
  state.window = null;
  state.mode = HEAD;
  const ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK$1) {
    strm.state = null;
  }
  return ret;
};
var inflateInit = (strm) => {
  return inflateInit2(strm, DEF_WBITS);
};
var virgin = true;
var lenfix;
var distfix;
var fixedtables = (state) => {
  if (virgin) {
    lenfix = new Int32Array(512);
    distfix = new Int32Array(32);
    let sym = 0;
    while (sym < 144) {
      state.lens[sym++] = 8;
    }
    while (sym < 256) {
      state.lens[sym++] = 9;
    }
    while (sym < 280) {
      state.lens[sym++] = 7;
    }
    while (sym < 288) {
      state.lens[sym++] = 8;
    }
    inftrees(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
    sym = 0;
    while (sym < 32) {
      state.lens[sym++] = 5;
    }
    inftrees(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
    virgin = false;
  }
  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
};
var updatewindow = (strm, src, end, copy) => {
  let dist2;
  const state = strm.state;
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
    state.window = new Uint8Array(state.wsize);
  }
  if (copy >= state.wsize) {
    state.window.set(src.subarray(end - state.wsize, end), 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist2 = state.wsize - state.wnext;
    if (dist2 > copy) {
      dist2 = copy;
    }
    state.window.set(src.subarray(end - copy, end - copy + dist2), state.wnext);
    copy -= dist2;
    if (copy) {
      state.window.set(src.subarray(end - copy, end), 0);
      state.wnext = copy;
      state.whave = state.wsize;
    } else {
      state.wnext += dist2;
      if (state.wnext === state.wsize) {
        state.wnext = 0;
      }
      if (state.whave < state.wsize) {
        state.whave += dist2;
      }
    }
  }
  return 0;
};
var inflate$2 = (strm, flush) => {
  let state;
  let input, output;
  let next;
  let put;
  let have, left;
  let hold;
  let bits;
  let _in, _out;
  let copy;
  let from;
  let from_source;
  let here = 0;
  let here_bits, here_op, here_val;
  let last_bits, last_op, last_val;
  let len;
  let ret;
  const hbuf = new Uint8Array(4);
  let opts;
  let n;
  const order = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (inflateStateCheck(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.mode === TYPE) {
    state.mode = TYPEDO;
  }
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  _in = have;
  _out = left;
  ret = Z_OK$1;
  inf_leave:
    for (; ; ) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.wrap & 2 && hold === 35615) {
            if (state.wbits === 0) {
              state.wbits = 15;
            }
            state.check = 0;
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
            hold = 0;
            bits = 0;
            state.mode = FLAGS;
            break;
          }
          if (state.head) {
            state.head.done = false;
          }
          if (!(state.wrap & 1) || /* check if zlib header allowed */
          (((hold & 255) << 8) + (hold >> 8)) % 31) {
            strm.msg = "incorrect header check";
            state.mode = BAD;
            break;
          }
          if ((hold & 15) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          hold >>>= 4;
          bits -= 4;
          len = (hold & 15) + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          }
          if (len > 15 || len > state.wbits) {
            strm.msg = "invalid window size";
            state.mode = BAD;
            break;
          }
          state.dmax = 1 << state.wbits;
          state.flags = 0;
          strm.adler = state.check = 1;
          state.mode = hold & 512 ? DICTID : TYPE;
          hold = 0;
          bits = 0;
          break;
        case FLAGS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.flags = hold;
          if ((state.flags & 255) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          if (state.flags & 57344) {
            strm.msg = "unknown header flags set";
            state.mode = BAD;
            break;
          }
          if (state.head) {
            state.head.text = hold >> 8 & 1;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = TIME;
        /* falls through */
        case TIME:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            hbuf[2] = hold >>> 16 & 255;
            hbuf[3] = hold >>> 24 & 255;
            state.check = crc32_1(state.check, hbuf, 4, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = OS;
        /* falls through */
        case OS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.xflags = hold & 255;
            state.head.os = hold >> 8;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = EXLEN;
        /* falls through */
        case EXLEN:
          if (state.flags & 1024) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
          } else if (state.head) {
            state.head.extra = null;
          }
          state.mode = EXTRA;
        /* falls through */
        case EXTRA:
          if (state.flags & 1024) {
            copy = state.length;
            if (copy > have) {
              copy = have;
            }
            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  state.head.extra = new Uint8Array(state.head.extra_len);
                }
                state.head.extra.set(
                  input.subarray(
                    next,
                    // extra field is limited to 65536 bytes
                    // - no need for additional size check
                    next + copy
                  ),
                  /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                  len
                );
              }
              if (state.flags & 512 && state.wrap & 4) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              state.length -= copy;
            }
            if (state.length) {
              break inf_leave;
            }
          }
          state.length = 0;
          state.mode = NAME;
        /* falls through */
        case NAME:
          if (state.flags & 2048) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
        /* falls through */
        case COMMENT:
          if (state.flags & 4096) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
        /* falls through */
        case HCRC:
          if (state.flags & 512) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.check & 65535)) {
              strm.msg = "header crc mismatch";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          if (state.head) {
            state.head.hcrc = state.flags >> 9 & 1;
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE;
          break;
        case DICTID:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          strm.adler = state.check = zswap32(hold);
          hold = 0;
          bits = 0;
          state.mode = DICT;
        /* falls through */
        case DICT:
          if (state.havedict === 0) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            return Z_NEED_DICT$1;
          }
          strm.adler = state.check = 1;
          state.mode = TYPE;
        /* falls through */
        case TYPE:
          if (flush === Z_BLOCK || flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case TYPEDO:
          if (state.last) {
            hold >>>= bits & 7;
            bits -= bits & 7;
            state.mode = CHECK;
            break;
          }
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.last = hold & 1;
          hold >>>= 1;
          bits -= 1;
          switch (hold & 3) {
            case 0:
              state.mode = STORED;
              break;
            case 1:
              fixedtables(state);
              state.mode = LEN_;
              if (flush === Z_TREES) {
                hold >>>= 2;
                bits -= 2;
                break inf_leave;
              }
              break;
            case 2:
              state.mode = TABLE;
              break;
            case 3:
              strm.msg = "invalid block type";
              state.mode = BAD;
          }
          hold >>>= 2;
          bits -= 2;
          break;
        case STORED:
          hold >>>= bits & 7;
          bits -= bits & 7;
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
            strm.msg = "invalid stored block lengths";
            state.mode = BAD;
            break;
          }
          state.length = hold & 65535;
          hold = 0;
          bits = 0;
          state.mode = COPY_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case COPY_:
          state.mode = COPY;
        /* falls through */
        case COPY:
          copy = state.length;
          if (copy) {
            if (copy > have) {
              copy = have;
            }
            if (copy > left) {
              copy = left;
            }
            if (copy === 0) {
              break inf_leave;
            }
            output.set(input.subarray(next, next + copy), put);
            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          }
          state.mode = TYPE;
          break;
        case TABLE:
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.nlen = (hold & 31) + 257;
          hold >>>= 5;
          bits -= 5;
          state.ndist = (hold & 31) + 1;
          hold >>>= 5;
          bits -= 5;
          state.ncode = (hold & 15) + 4;
          hold >>>= 4;
          bits -= 4;
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = "too many length or distance symbols";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = LENLENS;
        /* falls through */
        case LENLENS:
          while (state.have < state.ncode) {
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.lens[order[state.have++]] = hold & 7;
            hold >>>= 3;
            bits -= 3;
          }
          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          }
          state.lencode = state.lendyn;
          state.lenbits = 7;
          opts = { bits: state.lenbits };
          ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid code lengths set";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = CODELENS;
        /* falls through */
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (; ; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_val < 16) {
              hold >>>= here_bits;
              bits -= here_bits;
              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                n = here_bits + 2;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                if (state.have === 0) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                len = state.lens[state.have - 1];
                copy = 3 + (hold & 3);
                hold >>>= 2;
                bits -= 2;
              } else if (here_val === 17) {
                n = here_bits + 3;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 3 + (hold & 7);
                hold >>>= 3;
                bits -= 3;
              } else {
                n = here_bits + 7;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 11 + (hold & 127);
                hold >>>= 7;
                bits -= 7;
              }
              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = "invalid bit length repeat";
                state.mode = BAD;
                break;
              }
              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }
          if (state.mode === BAD) {
            break;
          }
          if (state.lens[256] === 0) {
            strm.msg = "invalid code -- missing end-of-block";
            state.mode = BAD;
            break;
          }
          state.lenbits = 9;
          opts = { bits: state.lenbits };
          ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid literal/lengths set";
            state.mode = BAD;
            break;
          }
          state.distbits = 6;
          state.distcode = state.distdyn;
          opts = { bits: state.distbits };
          ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
          state.distbits = opts.bits;
          if (ret) {
            strm.msg = "invalid distances set";
            state.mode = BAD;
            break;
          }
          state.mode = LEN_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case LEN_:
          state.mode = LEN;
        /* falls through */
        case LEN:
          if (have >= 6 && left >= 258) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            inffast(strm, _out);
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            if (state.mode === TYPE) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (; ; ) {
            here = state.lencode[hold & (1 << state.lenbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (here_op && (here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            state.back = -1;
            state.mode = TYPE;
            break;
          }
          if (here_op & 64) {
            strm.msg = "invalid literal/length code";
            state.mode = BAD;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
        /* falls through */
        case LENEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          state.was = state.length;
          state.mode = DIST;
        /* falls through */
        case DIST:
          for (; ; ) {
            here = state.distcode[hold & (1 << state.distbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = "invalid distance code";
            state.mode = BAD;
            break;
          }
          state.offset = here_val;
          state.extra = here_op & 15;
          state.mode = DISTEXT;
        /* falls through */
        case DISTEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.offset += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          if (state.offset > state.dmax) {
            strm.msg = "invalid distance too far back";
            state.mode = BAD;
            break;
          }
          state.mode = MATCH;
        /* falls through */
        case MATCH:
          if (left === 0) {
            break inf_leave;
          }
          copy = _out - left;
          if (state.offset > copy) {
            copy = state.offset - copy;
            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD;
                break;
              }
            }
            if (copy > state.wnext) {
              copy -= state.wnext;
              from = state.wsize - copy;
            } else {
              from = state.wnext - copy;
            }
            if (copy > state.length) {
              copy = state.length;
            }
            from_source = state.window;
          } else {
            from_source = output;
            from = put - state.offset;
            copy = state.length;
          }
          if (copy > left) {
            copy = left;
          }
          left -= copy;
          state.length -= copy;
          do {
            output[put++] = from_source[from++];
          } while (--copy);
          if (state.length === 0) {
            state.mode = LEN;
          }
          break;
        case LIT:
          if (left === 0) {
            break inf_leave;
          }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold |= input[next++] << bits;
              bits += 8;
            }
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (state.wrap & 4 && _out) {
              strm.adler = state.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
              state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
            }
            _out = left;
            if (state.wrap & 4 && (state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = "incorrect data check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = LENGTH;
        /* falls through */
        case LENGTH:
          if (state.wrap && state.flags) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
              strm.msg = "incorrect length check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = DONE;
        /* falls through */
        case DONE:
          ret = Z_STREAM_END$1;
          break inf_leave;
        case BAD:
          ret = Z_DATA_ERROR$1;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR$1;
        case SYNC:
        /* falls through */
        default:
          return Z_STREAM_ERROR$1;
      }
    }
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH$1)) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap & 4 && _out) {
    strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
    state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
    ret = Z_BUF_ERROR;
  }
  return ret;
};
var inflateEnd = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  let state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK$1;
};
var inflateGetHeader = (strm, head) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if ((state.wrap & 2) === 0) {
    return Z_STREAM_ERROR$1;
  }
  state.head = head;
  head.done = false;
  return Z_OK$1;
};
var inflateSetDictionary = (strm, dictionary) => {
  const dictLength = dictionary.length;
  let state;
  let dictid;
  let ret;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR$1;
  }
  if (state.mode === DICT) {
    dictid = 1;
    dictid = adler32_1(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR$1;
    }
  }
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR$1;
  }
  state.havedict = 1;
  return Z_OK$1;
};
var inflateReset_1 = inflateReset;
var inflateReset2_1 = inflateReset2;
var inflateResetKeep_1 = inflateResetKeep;
var inflateInit_1 = inflateInit;
var inflateInit2_1 = inflateInit2;
var inflate_2$1 = inflate$2;
var inflateEnd_1 = inflateEnd;
var inflateGetHeader_1 = inflateGetHeader;
var inflateSetDictionary_1 = inflateSetDictionary;
var inflateInfo = "pako inflate (from Nodeca project)";
var inflate_1$2 = {
  inflateReset: inflateReset_1,
  inflateReset2: inflateReset2_1,
  inflateResetKeep: inflateResetKeep_1,
  inflateInit: inflateInit_1,
  inflateInit2: inflateInit2_1,
  inflate: inflate_2$1,
  inflateEnd: inflateEnd_1,
  inflateGetHeader: inflateGetHeader_1,
  inflateSetDictionary: inflateSetDictionary_1,
  inflateInfo
};
function GZheader() {
  this.text = 0;
  this.time = 0;
  this.xflags = 0;
  this.os = 0;
  this.extra = null;
  this.extra_len = 0;
  this.name = "";
  this.comment = "";
  this.hcrc = 0;
  this.done = false;
}
var gzheader = GZheader;
var toString = Object.prototype.toString;
var {
  Z_NO_FLUSH,
  Z_FINISH,
  Z_OK,
  Z_STREAM_END,
  Z_NEED_DICT,
  Z_STREAM_ERROR,
  Z_DATA_ERROR,
  Z_MEM_ERROR
} = constants$2;
function Inflate$1(options) {
  this.options = common.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, options || {});
  const opt = this.options;
  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) {
      opt.windowBits = -15;
    }
  }
  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
    opt.windowBits += 32;
  }
  if (opt.windowBits > 15 && opt.windowBits < 48) {
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = inflate_1$2.inflateInit2(
    this.strm,
    opt.windowBits
  );
  if (status !== Z_OK) {
    throw new Error(messages[status]);
  }
  this.header = new gzheader();
  inflate_1$2.inflateGetHeader(this.strm, this.header);
  if (opt.dictionary) {
    if (typeof opt.dictionary === "string") {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) {
      status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== Z_OK) {
        throw new Error(messages[status]);
      }
    }
  }
}
Inflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  const dictionary = this.options.dictionary;
  let status, _flush_mode, last_avail_out;
  if (this.ended) return false;
  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
  if (toString.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (; ; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = inflate_1$2.inflate(strm, _flush_mode);
    if (status === Z_NEED_DICT && dictionary) {
      status = inflate_1$2.inflateSetDictionary(strm, dictionary);
      if (status === Z_OK) {
        status = inflate_1$2.inflate(strm, _flush_mode);
      } else if (status === Z_DATA_ERROR) {
        status = Z_NEED_DICT;
      }
    }
    while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
      inflate_1$2.inflateReset(strm);
      status = inflate_1$2.inflate(strm, _flush_mode);
    }
    switch (status) {
      case Z_STREAM_ERROR:
      case Z_DATA_ERROR:
      case Z_NEED_DICT:
      case Z_MEM_ERROR:
        this.onEnd(status);
        this.ended = true;
        return false;
    }
    last_avail_out = strm.avail_out;
    if (strm.next_out) {
      if (strm.avail_out === 0 || status === Z_STREAM_END) {
        if (this.options.to === "string") {
          let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
          let tail = strm.next_out - next_out_utf8;
          let utf8str = strings.buf2string(strm.output, next_out_utf8);
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
          this.onData(utf8str);
        } else {
          this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
        }
      }
    }
    if (status === Z_OK && last_avail_out === 0) continue;
    if (status === Z_STREAM_END) {
      status = inflate_1$2.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return true;
    }
    if (strm.avail_in === 0) break;
  }
  return true;
};
Inflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Inflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = common.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function inflate$1(input, options) {
  const inflator = new Inflate$1(options);
  inflator.push(input);
  if (inflator.err) throw inflator.msg || messages[inflator.err];
  return inflator.result;
}
function inflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return inflate$1(input, options);
}
var Inflate_1$1 = Inflate$1;
var inflate_2 = inflate$1;
var inflateRaw_1$1 = inflateRaw$1;
var ungzip$1 = inflate$1;
var constants = constants$2;
var inflate_1$1 = {
  Inflate: Inflate_1$1,
  inflate: inflate_2,
  inflateRaw: inflateRaw_1$1,
  ungzip: ungzip$1,
  constants
};
var { Deflate, deflate, deflateRaw, gzip } = deflate_1$1;
var { Inflate, inflate, inflateRaw, ungzip } = inflate_1$1;
var inflate_1 = inflate;

// node_modules/.pnpm/@coral-xyz+anchor@0.31.1_bufferutil@4.0.9_typescript@5.8.3_utf-8-validate@5.0.10/node_modules/@coral-xyz/anchor/dist/browser/index.js
var import_eventemitter3 = __toESM(require_eventemitter3());
function chunks(array3, size) {
  return Array.apply(0, new Array(Math.ceil(array3.length / size))).map((_, index) => array3.slice(index * size, (index + 1) * size));
}
var isVersionedTransaction = (tx) => {
  return "version" in tx;
};
function decode$2(array3) {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(array3);
}
function encode$1(data) {
  return import_bs58.default.encode(data);
}
function decode(data) {
  return import_buffer.Buffer.from(data, "base64");
}
function isCompositeAccounts(accountItem) {
  return "accounts" in accountItem;
}
async function idlAddress(programId) {
  const base = (await import_web33.PublicKey.findProgramAddress([], programId))[0];
  return await import_web33.PublicKey.createWithSeed(base, seed(), programId);
}
function seed() {
  return "anchor:idl";
}
var IDL_ACCOUNT_LAYOUT = borsh.struct([
  borsh.publicKey("authority"),
  borsh.vecU8("data")
]);
function decodeIdlAccount(data) {
  return IDL_ACCOUNT_LAYOUT.decode(data);
}
function convertIdlToCamelCase(idl) {
  const KEYS_TO_CONVERT = ["name", "path", "account", "relations", "generic"];
  const toCamelCase = (s) => s.split(".").map(import_camelcase.default).join(".");
  const recursivelyConvertNamesToCamelCase = (obj) => {
    for (const key in obj) {
      const val = obj[key];
      if (KEYS_TO_CONVERT.includes(key)) {
        obj[key] = Array.isArray(val) ? val.map(toCamelCase) : toCamelCase(val);
      } else if (typeof val === "object") {
        recursivelyConvertNamesToCamelCase(val);
      }
    }
  };
  const camelCasedIdl = structuredClone(idl);
  recursivelyConvertNamesToCamelCase(camelCasedIdl);
  return camelCasedIdl;
}
function handleDefinedFields(fields, unitCb, namedCb, tupleCb) {
  if (!(fields === null || fields === void 0 ? void 0 : fields.length))
    return unitCb();
  if (fields[0].name) {
    return namedCb(fields);
  }
  return tupleCb(fields);
}
function parseIdlErrors(idl) {
  const errors = /* @__PURE__ */ new Map();
  if (idl.errors) {
    idl.errors.forEach((e) => {
      var _a;
      let msg = (_a = e.msg) !== null && _a !== void 0 ? _a : e.name;
      errors.set(e.code, msg);
    });
  }
  return errors;
}
function toInstruction(idlIx, ...args) {
  if (idlIx.args.length != args.length) {
    throw new Error("Invalid argument length");
  }
  const ix = {};
  let idx = 0;
  idlIx.args.forEach((ixArg) => {
    ix[ixArg.name] = args[idx];
    idx += 1;
  });
  return ix;
}
function validateAccounts(ixAccounts, accounts = {}) {
  ixAccounts.forEach((acc) => {
    if (isCompositeAccounts(acc)) {
      validateAccounts(acc.accounts, accounts[acc.name]);
    } else {
      if (!accounts[acc.name]) {
        throw new Error(`Account \`${acc.name}\` not provided.`);
      }
    }
  });
}
function translateAddress(address) {
  return address instanceof import_web33.PublicKey ? address : new import_web33.PublicKey(address);
}
var StructError = class extends TypeError {
  constructor(failure, failures) {
    let cached;
    const {
      message,
      ...rest
    } = failure;
    const {
      path
    } = failure;
    const msg = path.length === 0 ? message : "At path: " + path.join(".") + " -- " + message;
    super(msg);
    this.value = void 0;
    this.key = void 0;
    this.type = void 0;
    this.refinement = void 0;
    this.path = void 0;
    this.branch = void 0;
    this.failures = void 0;
    Object.assign(this, rest);
    this.name = this.constructor.name;
    this.failures = () => {
      var _cached;
      return (_cached = cached) != null ? _cached : cached = [failure, ...failures()];
    };
  }
};
function isIterable(x) {
  return isObject(x) && typeof x[Symbol.iterator] === "function";
}
function isObject(x) {
  return typeof x === "object" && x != null;
}
function print(value) {
  return typeof value === "string" ? JSON.stringify(value) : "" + value;
}
function shiftIterator(input) {
  const {
    done,
    value
  } = input.next();
  return done ? void 0 : value;
}
function toFailure(result, context, struct3, value) {
  if (result === true) {
    return;
  } else if (result === false) {
    result = {};
  } else if (typeof result === "string") {
    result = {
      message: result
    };
  }
  const {
    path,
    branch
  } = context;
  const {
    type: type2
  } = struct3;
  const {
    refinement,
    message = "Expected a value of type `" + type2 + "`" + (refinement ? " with refinement `" + refinement + "`" : "") + ", but received: `" + print(value) + "`"
  } = result;
  return {
    value,
    type: type2,
    refinement,
    key: path[path.length - 1],
    path,
    branch,
    ...result,
    message
  };
}
function* toFailures(result, context, struct3, value) {
  if (!isIterable(result)) {
    result = [result];
  }
  for (const r of result) {
    const failure = toFailure(r, context, struct3, value);
    if (failure) {
      yield failure;
    }
  }
}
function* run(value, struct3, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    path = [],
    branch = [value],
    coerce: coerce2 = false,
    mask: mask2 = false
  } = options;
  const ctx = {
    path,
    branch
  };
  if (coerce2) {
    value = struct3.coercer(value, ctx);
    if (mask2 && struct3.type !== "type" && isObject(struct3.schema) && isObject(value) && !Array.isArray(value)) {
      for (const key in value) {
        if (struct3.schema[key] === void 0) {
          delete value[key];
        }
      }
    }
  }
  let valid = true;
  for (const failure of struct3.validator(value, ctx)) {
    valid = false;
    yield [failure, void 0];
  }
  for (let [k, v, s] of struct3.entries(value, ctx)) {
    const ts = run(v, s, {
      path: k === void 0 ? path : [...path, k],
      branch: k === void 0 ? branch : [...branch, v],
      coerce: coerce2,
      mask: mask2
    });
    for (const t of ts) {
      if (t[0]) {
        valid = false;
        yield [t[0], void 0];
      } else if (coerce2) {
        v = t[1];
        if (k === void 0) {
          value = v;
        } else if (value instanceof Map) {
          value.set(k, v);
        } else if (value instanceof Set) {
          value.add(v);
        } else if (isObject(value)) {
          value[k] = v;
        }
      }
    }
  }
  if (valid) {
    for (const failure of struct3.refiner(value, ctx)) {
      valid = false;
      yield [failure, void 0];
    }
  }
  if (valid) {
    yield [void 0, value];
  }
}
var Struct = class {
  constructor(props) {
    this.TYPE = void 0;
    this.type = void 0;
    this.schema = void 0;
    this.coercer = void 0;
    this.validator = void 0;
    this.refiner = void 0;
    this.entries = void 0;
    const {
      type: type2,
      schema,
      validator,
      refiner,
      coercer = (value) => value,
      entries = function* () {
      }
    } = props;
    this.type = type2;
    this.schema = schema;
    this.entries = entries;
    this.coercer = coercer;
    if (validator) {
      this.validator = (value, context) => {
        const result = validator(value, context);
        return toFailures(result, context, this, value);
      };
    } else {
      this.validator = () => [];
    }
    if (refiner) {
      this.refiner = (value, context) => {
        const result = refiner(value, context);
        return toFailures(result, context, this, value);
      };
    } else {
      this.refiner = () => [];
    }
  }
  /**
   * Assert that a value passes the struct's validation, throwing if it doesn't.
   */
  assert(value) {
    return assert(value, this);
  }
  /**
   * Create a value with the struct's coercion logic, then validate it.
   */
  create(value) {
    return create(value, this);
  }
  /**
   * Check if a value passes the struct's validation.
   */
  is(value) {
    return is(value, this);
  }
  /**
   * Mask a value, coercing and validating it, but returning only the subset of
   * properties defined by the struct's schema.
   */
  mask(value) {
    return mask(value, this);
  }
  /**
   * Validate a value with the struct's validation logic, returning a tuple
   * representing the result.
   *
   * You may optionally pass `true` for the `withCoercion` argument to coerce
   * the value before attempting to validate it. If you do, the result will
   * contain the coerced result when successful.
   */
  validate(value, options) {
    if (options === void 0) {
      options = {};
    }
    return validate(value, this, options);
  }
};
function assert(value, struct3) {
  const result = validate(value, struct3);
  if (result[0]) {
    throw result[0];
  }
}
function create(value, struct3) {
  const result = validate(value, struct3, {
    coerce: true
  });
  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
function mask(value, struct3) {
  const result = validate(value, struct3, {
    coerce: true,
    mask: true
  });
  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
function is(value, struct3) {
  const result = validate(value, struct3);
  return !result[0];
}
function validate(value, struct3, options) {
  if (options === void 0) {
    options = {};
  }
  const tuples = run(value, struct3, options);
  const tuple = shiftIterator(tuples);
  if (tuple[0]) {
    const error = new StructError(tuple[0], function* () {
      for (const t of tuples) {
        if (t[0]) {
          yield t[0];
        }
      }
    });
    return [error, void 0];
  } else {
    const v = tuple[1];
    return [void 0, v];
  }
}
function define(name, validator) {
  return new Struct({
    type: name,
    schema: null,
    validator
  });
}
function any() {
  return define("any", () => true);
}
function array2(Element) {
  return new Struct({
    type: "array",
    schema: Element,
    *entries(value) {
      if (Element && Array.isArray(value)) {
        for (const [i, v] of value.entries()) {
          yield [i, v, Element];
        }
      }
    },
    coercer(value) {
      return Array.isArray(value) ? value.slice() : value;
    },
    validator(value) {
      return Array.isArray(value) || "Expected an array value, but received: " + print(value);
    }
  });
}
function boolean() {
  return define("boolean", (value) => {
    return typeof value === "boolean";
  });
}
function literal(constant) {
  const description = print(constant);
  const t = typeof constant;
  return new Struct({
    type: "literal",
    schema: t === "string" || t === "number" || t === "boolean" ? constant : null,
    validator(value) {
      return value === constant || "Expected the literal `" + description + "`, but received: " + print(value);
    }
  });
}
function nullable(struct3) {
  return new Struct({
    ...struct3,
    validator: (value, ctx) => value === null || struct3.validator(value, ctx),
    refiner: (value, ctx) => value === null || struct3.refiner(value, ctx)
  });
}
function number() {
  return define("number", (value) => {
    return typeof value === "number" && !isNaN(value) || "Expected a number, but received: " + print(value);
  });
}
function optional(struct3) {
  return new Struct({
    ...struct3,
    validator: (value, ctx) => value === void 0 || struct3.validator(value, ctx),
    refiner: (value, ctx) => value === void 0 || struct3.refiner(value, ctx)
  });
}
function string() {
  return define("string", (value) => {
    return typeof value === "string" || "Expected a string, but received: " + print(value);
  });
}
function type(schema) {
  const keys = Object.keys(schema);
  return new Struct({
    type: "type",
    schema,
    *entries(value) {
      if (isObject(value)) {
        for (const k of keys) {
          yield [k, value[k], schema[k]];
        }
      }
    },
    validator(value) {
      return isObject(value) || "Expected an object, but received: " + print(value);
    }
  });
}
function union$1(Structs) {
  const description = Structs.map((s) => s.type).join(" | ");
  return new Struct({
    type: "union",
    schema: null,
    coercer(value, ctx) {
      const firstMatch = Structs.find((s) => {
        const [e] = s.validate(value, {
          coerce: true
        });
        return !e;
      }) || unknown();
      return firstMatch.coercer(value, ctx);
    },
    validator(value, ctx) {
      const failures = [];
      for (const S of Structs) {
        const [...tuples] = run(value, S, ctx);
        const [first] = tuples;
        if (!first[0]) {
          return [];
        } else {
          for (const [failure] of tuples) {
            if (failure) {
              failures.push(failure);
            }
          }
        }
      }
      return ["Expected the value to satisfy a union of `" + description + "`, but received: " + print(value), ...failures];
    }
  });
}
function unknown() {
  return define("unknown", () => true);
}
function coerce(struct3, condition, coercer) {
  return new Struct({
    ...struct3,
    coercer: (value, ctx) => {
      return is(value, condition) ? struct3.coercer(coercer(value, ctx), ctx) : struct3.coercer(value, ctx);
    }
  });
}
var GET_MULTIPLE_ACCOUNTS_LIMIT = 99;
async function getMultipleAccountsAndContext(connection, publicKeys, commitment) {
  if (publicKeys.length <= GET_MULTIPLE_ACCOUNTS_LIMIT) {
    return await getMultipleAccountsAndContextCore(connection, publicKeys, commitment);
  } else {
    const batches = chunks(publicKeys, GET_MULTIPLE_ACCOUNTS_LIMIT);
    const results = await Promise.all(batches.map((batch) => getMultipleAccountsAndContextCore(connection, batch, commitment)));
    return results.flat();
  }
}
async function getMultipleAccountsAndContextCore(connection, publicKeys, commitmentOverride) {
  const commitment = commitmentOverride !== null && commitmentOverride !== void 0 ? commitmentOverride : connection.commitment;
  const { value: accountInfos, context } = await connection.getMultipleAccountsInfoAndContext(publicKeys, commitment);
  const accounts = accountInfos.map((account, idx) => {
    if (account === null) {
      return null;
    }
    return {
      publicKey: publicKeys[idx],
      account,
      context
    };
  });
  return accounts;
}
async function simulateTransaction(connection, transaction, signers, commitment, includeAccounts) {
  var _a;
  if (signers && signers.length > 0) {
    transaction.sign(...signers);
  }
  const message = transaction._compile();
  const signData = message.serialize();
  const wireTransaction = transaction._serialize(signData);
  const encodedTransaction = wireTransaction.toString("base64");
  const config = {
    encoding: "base64",
    commitment: commitment !== null && commitment !== void 0 ? commitment : connection.commitment
  };
  if (includeAccounts) {
    const addresses = (Array.isArray(includeAccounts) ? includeAccounts : message.nonProgramIds()).map((key) => key.toBase58());
    config["accounts"] = {
      encoding: "base64",
      addresses
    };
  }
  if (signers && signers.length > 0) {
    config.sigVerify = true;
  }
  const args = [encodedTransaction, config];
  const unsafeRes = await connection._rpcRequest("simulateTransaction", args);
  const res = create(unsafeRes, SimulatedTransactionResponseStruct);
  if ("error" in res) {
    let logs;
    if ("data" in res.error) {
      logs = (_a = res.error.data) === null || _a === void 0 ? void 0 : _a.logs;
      if (logs && Array.isArray(logs)) {
        const traceIndent = "\n    ";
        const logTrace = traceIndent + logs.join(traceIndent);
        console.error(res.error.message, logTrace);
      }
    }
    throw new import_web33.SendTransactionError("failed to simulate transaction: " + res.error.message, logs);
  }
  return res.result;
}
function jsonRpcResult(schema) {
  return coerce(createRpcResult(schema), UnknownRpcResult, (value) => {
    if ("error" in value) {
      return value;
    } else {
      return {
        ...value,
        result: create(value.result, schema)
      };
    }
  });
}
var UnknownRpcResult = createRpcResult(unknown());
function createRpcResult(result) {
  return union$1([
    type({
      jsonrpc: literal("2.0"),
      id: string(),
      result
    }),
    type({
      jsonrpc: literal("2.0"),
      id: string(),
      error: type({
        code: unknown(),
        message: string(),
        data: optional(any())
      })
    })
  ]);
}
function jsonRpcResultAndContext(value) {
  return jsonRpcResult(type({
    context: type({
      slot: number()
    }),
    value
  }));
}
var SimulatedTransactionResponseStruct = jsonRpcResultAndContext(type({
  err: nullable(union$1([type({}), string()])),
  logs: nullable(array2(string())),
  accounts: optional(nullable(array2(nullable(type({
    executable: boolean(),
    owner: string(),
    lamports: number(),
    data: array2(string()),
    rentEpoch: optional(number())
  }))))),
  unitsConsumed: optional(number())
}));
var AnchorProvider = class _AnchorProvider {
  /**
   * @param connection The cluster connection where the program is deployed.
   * @param wallet     The wallet used to pay for and sign all transactions.
   * @param opts       Transaction confirmation options to use by default.
   */
  constructor(connection, wallet, opts = _AnchorProvider.defaultOptions()) {
    this.connection = connection;
    this.wallet = wallet;
    this.opts = opts;
    this.publicKey = wallet === null || wallet === void 0 ? void 0 : wallet.publicKey;
  }
  static defaultOptions() {
    return {
      preflightCommitment: "processed",
      commitment: "processed"
    };
  }
  /**
   * Returns a `Provider` with a wallet read from the local filesystem.
   *
   * @param url  The network cluster url.
   * @param opts The default transaction confirmation options.
   *
   * (This api is for Node only.)
   */
  static local(url, opts = _AnchorProvider.defaultOptions()) {
    {
      throw new Error(`Provider local is not available on browser.`);
    }
  }
  /**
   * Returns a `Provider` read from the `ANCHOR_PROVIDER_URL` environment
   * variable
   *
   * (This api is for Node only.)
   */
  static env() {
    {
      throw new Error(`Provider env is not available on browser.`);
    }
  }
  /**
   * Sends the given transaction, paid for and signed by the provider's wallet.
   *
   * @param tx      The transaction to send.
   * @param signers The signers of the transaction.
   * @param opts    Transaction confirmation options.
   */
  async sendAndConfirm(tx, signers, opts) {
    var _a, _b, _c, _d;
    if (opts === void 0) {
      opts = this.opts;
    }
    if (isVersionedTransaction(tx)) {
      if (signers) {
        tx.sign(signers);
      }
    } else {
      tx.feePayer = (_a = tx.feePayer) !== null && _a !== void 0 ? _a : this.wallet.publicKey;
      tx.recentBlockhash = (await this.connection.getLatestBlockhash(opts.preflightCommitment)).blockhash;
      if (signers) {
        for (const signer of signers) {
          tx.partialSign(signer);
        }
      }
    }
    tx = await this.wallet.signTransaction(tx);
    const rawTx = tx.serialize();
    try {
      return await sendAndConfirmRawTransaction(this.connection, rawTx, opts);
    } catch (err2) {
      if (err2 instanceof ConfirmError) {
        const txSig = encode$1(isVersionedTransaction(tx) ? ((_b = tx.signatures) === null || _b === void 0 ? void 0 : _b[0]) || new Uint8Array() : (_c = tx.signature) !== null && _c !== void 0 ? _c : new Uint8Array());
        const maxVer = isVersionedTransaction(tx) ? 0 : void 0;
        const failedTx = await this.connection.getTransaction(txSig, {
          commitment: "confirmed",
          maxSupportedTransactionVersion: maxVer
        });
        if (!failedTx) {
          throw err2;
        } else {
          const logs = (_d = failedTx.meta) === null || _d === void 0 ? void 0 : _d.logMessages;
          throw !logs ? err2 : new import_web33.SendTransactionError(err2.message, logs);
        }
      } else {
        throw err2;
      }
    }
  }
  /**
   * Similar to `send`, but for an array of transactions and signers.
   * All transactions need to be of the same type, it doesn't support a mix of `VersionedTransaction`s and `Transaction`s.
   *
   * @param txWithSigners Array of transactions and signers.
   * @param opts          Transaction confirmation options.
   */
  async sendAll(txWithSigners, opts) {
    var _a, _b, _c;
    if (opts === void 0) {
      opts = this.opts;
    }
    const recentBlockhash = (await this.connection.getLatestBlockhash(opts.preflightCommitment)).blockhash;
    let txs = txWithSigners.map((r) => {
      var _a2, _b2;
      if (isVersionedTransaction(r.tx)) {
        let tx = r.tx;
        if (r.signers) {
          tx.sign(r.signers);
        }
        return tx;
      } else {
        let tx = r.tx;
        let signers = (_a2 = r.signers) !== null && _a2 !== void 0 ? _a2 : [];
        tx.feePayer = (_b2 = tx.feePayer) !== null && _b2 !== void 0 ? _b2 : this.wallet.publicKey;
        tx.recentBlockhash = recentBlockhash;
        signers.forEach((kp) => {
          tx.partialSign(kp);
        });
        return tx;
      }
    });
    const signedTxs = await this.wallet.signAllTransactions(txs);
    const sigs = [];
    for (let k = 0; k < txs.length; k += 1) {
      const tx = signedTxs[k];
      const rawTx = tx.serialize();
      try {
        sigs.push(await sendAndConfirmRawTransaction(this.connection, rawTx, opts));
      } catch (err2) {
        if (err2 instanceof ConfirmError) {
          const txSig = encode$1(isVersionedTransaction(tx) ? ((_a = tx.signatures) === null || _a === void 0 ? void 0 : _a[0]) || new Uint8Array() : (_b = tx.signature) !== null && _b !== void 0 ? _b : new Uint8Array());
          const maxVer = isVersionedTransaction(tx) ? 0 : void 0;
          const failedTx = await this.connection.getTransaction(txSig, {
            commitment: "confirmed",
            maxSupportedTransactionVersion: maxVer
          });
          if (!failedTx) {
            throw err2;
          } else {
            const logs = (_c = failedTx.meta) === null || _c === void 0 ? void 0 : _c.logMessages;
            throw !logs ? err2 : new import_web33.SendTransactionError(err2.message, logs);
          }
        } else {
          throw err2;
        }
      }
    }
    return sigs;
  }
  /**
   * Simulates the given transaction, returning emitted logs from execution.
   *
   * @param tx      The transaction to send.
   * @param signers The signers of the transaction. If unset, the transaction
   *                will be simulated with the "sigVerify: false" option. This
   *                allows for simulation of transactions without asking the
   *                wallet for a signature.
   * @param opts    Transaction confirmation options.
   */
  async simulate(tx, signers, commitment, includeAccounts) {
    let recentBlockhash = (await this.connection.getLatestBlockhash(commitment !== null && commitment !== void 0 ? commitment : this.connection.commitment)).blockhash;
    let result;
    if (isVersionedTransaction(tx)) {
      if (signers && signers.length > 0) {
        tx.sign(signers);
        tx = await this.wallet.signTransaction(tx);
      }
      result = await this.connection.simulateTransaction(tx, { commitment });
    } else {
      tx.feePayer = tx.feePayer || this.wallet.publicKey;
      tx.recentBlockhash = recentBlockhash;
      if (signers && signers.length > 0) {
        tx = await this.wallet.signTransaction(tx);
      }
      result = await simulateTransaction(this.connection, tx, signers, commitment, includeAccounts);
    }
    if (result.value.err) {
      throw new SimulateError(result.value);
    }
    return result.value;
  }
};
var SimulateError = class extends Error {
  constructor(simulationResponse, message) {
    super(message);
    this.simulationResponse = simulationResponse;
  }
};
async function sendAndConfirmRawTransaction(connection, rawTransaction, options) {
  const sendOptions = options ? {
    skipPreflight: options.skipPreflight,
    preflightCommitment: options.preflightCommitment || options.commitment,
    maxRetries: options.maxRetries,
    minContextSlot: options.minContextSlot
  } : {};
  let status;
  const startTime = Date.now();
  while (Date.now() - startTime < 6e4) {
    try {
      const signature = await connection.sendRawTransaction(rawTransaction, sendOptions);
      if (options === null || options === void 0 ? void 0 : options.blockhash) {
        if (sendOptions.maxRetries === 0) {
          const abortSignal = AbortSignal.timeout(15e3);
          status = (await connection.confirmTransaction({ abortSignal, signature, ...options.blockhash }, options && options.commitment)).value;
        } else {
          status = (await connection.confirmTransaction({ signature, ...options.blockhash }, options && options.commitment)).value;
        }
      } else {
        status = (await connection.confirmTransaction(signature, options && options.commitment)).value;
      }
      if (status.err) {
        throw new ConfirmError(`Raw transaction ${signature} failed (${JSON.stringify(status)})`);
      }
      return signature;
    } catch (err2) {
      if (err2.name === "TimeoutError") {
        continue;
      }
      throw err2;
    }
  }
  throw Error("Transaction failed to confirm in 60s");
}
var ConfirmError = class extends Error {
  constructor(message) {
    super(message);
  }
};
function getProvider() {
  if (_provider === null) {
    return AnchorProvider.local();
  }
  return _provider;
}
var _provider = null;
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var dist = {};
Object.defineProperty(dist, "__esModule", { value: true });
var ANCHOR_ERROR__REQUIRE_EQ_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_EQ_VIOLATED = ANCHOR_ERROR__REQUIRE_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_VIOLATED = ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION_PROGRAM_ID = dist.ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION_PROGRAM_ID = ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION_AUTHORITY = ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION = dist.ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION = ANCHOR_ERROR__CONSTRAINT_MINT_PERMANENT_DELEGATE_EXTENSION_DELEGATE = dist.ANCHOR_ERROR__CONSTRAINT_MINT_PERMANENT_DELEGATE_EXTENSION_DELEGATE = ANCHOR_ERROR__CONSTRAINT_MINT_PERMANENT_DELEGATE_EXTENSION = dist.ANCHOR_ERROR__CONSTRAINT_MINT_PERMANENT_DELEGATE_EXTENSION = ANCHOR_ERROR__CONSTRAINT_MINT_CLOSE_AUTHORITY_EXTENSION_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_CLOSE_AUTHORITY_EXTENSION_AUTHORITY = ANCHOR_ERROR__CONSTRAINT_MINT_CLOSE_AUTHORITY_EXTENSION = dist.ANCHOR_ERROR__CONSTRAINT_MINT_CLOSE_AUTHORITY_EXTENSION = ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION_METADATA_ADDRESS = dist.ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION_METADATA_ADDRESS = ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION_AUTHORITY = ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION = dist.ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION = ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION_MEMBER_ADDRESS = dist.ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION_MEMBER_ADDRESS = ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION_AUTHORITY = ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION = dist.ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION = ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION_GROUP_ADDRESS = dist.ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION_GROUP_ADDRESS = ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION_AUTHORITY = ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION = dist.ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION = ANCHOR_ERROR__CONSTRAINT_ASSOCIATED_TOKEN_TOKEN_PROGRAM = dist.ANCHOR_ERROR__CONSTRAINT_ASSOCIATED_TOKEN_TOKEN_PROGRAM = ANCHOR_ERROR__CONSTRAINT_MINT_TOKEN_PROGRAM = dist.ANCHOR_ERROR__CONSTRAINT_MINT_TOKEN_PROGRAM = ANCHOR_ERROR__CONSTRAINT_TOKEN_TOKEN_PROGRAM = dist.ANCHOR_ERROR__CONSTRAINT_TOKEN_TOKEN_PROGRAM = ANCHOR_ERROR__CONSTRAINT_ACCOUNT_IS_NONE = dist.ANCHOR_ERROR__CONSTRAINT_ACCOUNT_IS_NONE = ANCHOR_ERROR__CONSTRAINT_SPACE = dist.ANCHOR_ERROR__CONSTRAINT_SPACE = ANCHOR_ERROR__CONSTRAINT_MINT_DECIMALS = dist.ANCHOR_ERROR__CONSTRAINT_MINT_DECIMALS = ANCHOR_ERROR__CONSTRAINT_MINT_FREEZE_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_FREEZE_AUTHORITY = ANCHOR_ERROR__CONSTRAINT_MINT_MINT_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_MINT_AUTHORITY = ANCHOR_ERROR__CONSTRAINT_TOKEN_OWNER = dist.ANCHOR_ERROR__CONSTRAINT_TOKEN_OWNER = ANCHOR_ERROR__CONSTRAINT_TOKEN_MINT = dist.ANCHOR_ERROR__CONSTRAINT_TOKEN_MINT = ANCHOR_ERROR__CONSTRAINT_ZERO = dist.ANCHOR_ERROR__CONSTRAINT_ZERO = ANCHOR_ERROR__CONSTRAINT_ADDRESS = dist.ANCHOR_ERROR__CONSTRAINT_ADDRESS = ANCHOR_ERROR__CONSTRAINT_CLOSE = dist.ANCHOR_ERROR__CONSTRAINT_CLOSE = ANCHOR_ERROR__CONSTRAINT_ASSOCIATED_INIT = dist.ANCHOR_ERROR__CONSTRAINT_ASSOCIATED_INIT = ANCHOR_ERROR__CONSTRAINT_ASSOCIATED = dist.ANCHOR_ERROR__CONSTRAINT_ASSOCIATED = ANCHOR_ERROR__CONSTRAINT_STATE = dist.ANCHOR_ERROR__CONSTRAINT_STATE = ANCHOR_ERROR__CONSTRAINT_EXECUTABLE = dist.ANCHOR_ERROR__CONSTRAINT_EXECUTABLE = ANCHOR_ERROR__CONSTRAINT_SEEDS = dist.ANCHOR_ERROR__CONSTRAINT_SEEDS = ANCHOR_ERROR__CONSTRAINT_RENT_EXEMPT = dist.ANCHOR_ERROR__CONSTRAINT_RENT_EXEMPT = ANCHOR_ERROR__CONSTRAINT_OWNER = dist.ANCHOR_ERROR__CONSTRAINT_OWNER = ANCHOR_ERROR__CONSTRAINT_RAW = dist.ANCHOR_ERROR__CONSTRAINT_RAW = ANCHOR_ERROR__CONSTRAINT_SIGNER = dist.ANCHOR_ERROR__CONSTRAINT_SIGNER = ANCHOR_ERROR__CONSTRAINT_HAS_ONE = dist.ANCHOR_ERROR__CONSTRAINT_HAS_ONE = ANCHOR_ERROR__CONSTRAINT_MUT = dist.ANCHOR_ERROR__CONSTRAINT_MUT = ANCHOR_ERROR__EVENT_INSTRUCTION_STUB = dist.ANCHOR_ERROR__EVENT_INSTRUCTION_STUB = ANCHOR_ERROR__IDL_ACCOUNT_NOT_EMPTY = dist.ANCHOR_ERROR__IDL_ACCOUNT_NOT_EMPTY = ANCHOR_ERROR__IDL_INSTRUCTION_INVALID_PROGRAM = dist.ANCHOR_ERROR__IDL_INSTRUCTION_INVALID_PROGRAM = ANCHOR_ERROR__IDL_INSTRUCTION_STUB = dist.ANCHOR_ERROR__IDL_INSTRUCTION_STUB = ANCHOR_ERROR__INSTRUCTION_DID_NOT_SERIALIZE = dist.ANCHOR_ERROR__INSTRUCTION_DID_NOT_SERIALIZE = ANCHOR_ERROR__INSTRUCTION_DID_NOT_DESERIALIZE = dist.ANCHOR_ERROR__INSTRUCTION_DID_NOT_DESERIALIZE = ANCHOR_ERROR__INSTRUCTION_FALLBACK_NOT_FOUND = dist.ANCHOR_ERROR__INSTRUCTION_FALLBACK_NOT_FOUND = ANCHOR_ERROR__INSTRUCTION_MISSING = dist.ANCHOR_ERROR__INSTRUCTION_MISSING = void 0;
var ANCHOR_ERROR__DEPRECATED = dist.ANCHOR_ERROR__DEPRECATED = ANCHOR_ERROR__INVALID_NUMERIC_CONVERSION = dist.ANCHOR_ERROR__INVALID_NUMERIC_CONVERSION = ANCHOR_ERROR__TRYING_TO_INIT_PAYER_AS_PROGRAM_ACCOUNT = dist.ANCHOR_ERROR__TRYING_TO_INIT_PAYER_AS_PROGRAM_ACCOUNT = ANCHOR_ERROR__DECLARED_PROGRAM_ID_MISMATCH = dist.ANCHOR_ERROR__DECLARED_PROGRAM_ID_MISMATCH = ANCHOR_ERROR__ACCOUNT_DUPLICATE_REALLOCS = dist.ANCHOR_ERROR__ACCOUNT_DUPLICATE_REALLOCS = ANCHOR_ERROR__ACCOUNT_REALLOC_EXCEEDS_LIMIT = dist.ANCHOR_ERROR__ACCOUNT_REALLOC_EXCEEDS_LIMIT = ANCHOR_ERROR__ACCOUNT_SYSVAR_MISMATCH = dist.ANCHOR_ERROR__ACCOUNT_SYSVAR_MISMATCH = ANCHOR_ERROR__ACCOUNT_NOT_ASSOCIATED_TOKEN_ACCOUNT = dist.ANCHOR_ERROR__ACCOUNT_NOT_ASSOCIATED_TOKEN_ACCOUNT = ANCHOR_ERROR__ACCOUNT_NOT_PROGRAM_DATA = dist.ANCHOR_ERROR__ACCOUNT_NOT_PROGRAM_DATA = ANCHOR_ERROR__ACCOUNT_NOT_INITIALIZED = dist.ANCHOR_ERROR__ACCOUNT_NOT_INITIALIZED = ANCHOR_ERROR__ACCOUNT_NOT_SYSTEM_OWNED = dist.ANCHOR_ERROR__ACCOUNT_NOT_SYSTEM_OWNED = ANCHOR_ERROR__ACCOUNT_NOT_SIGNER = dist.ANCHOR_ERROR__ACCOUNT_NOT_SIGNER = ANCHOR_ERROR__INVALID_PROGRAM_EXECUTABLE = dist.ANCHOR_ERROR__INVALID_PROGRAM_EXECUTABLE = ANCHOR_ERROR__INVALID_PROGRAM_ID = dist.ANCHOR_ERROR__INVALID_PROGRAM_ID = ANCHOR_ERROR__ACCOUNT_OWNED_BY_WRONG_PROGRAM = dist.ANCHOR_ERROR__ACCOUNT_OWNED_BY_WRONG_PROGRAM = ANCHOR_ERROR__ACCOUNT_NOT_MUTABLE = dist.ANCHOR_ERROR__ACCOUNT_NOT_MUTABLE = ANCHOR_ERROR__ACCOUNT_NOT_ENOUGH_KEYS = dist.ANCHOR_ERROR__ACCOUNT_NOT_ENOUGH_KEYS = ANCHOR_ERROR__ACCOUNT_DID_NOT_SERIALIZE = dist.ANCHOR_ERROR__ACCOUNT_DID_NOT_SERIALIZE = ANCHOR_ERROR__ACCOUNT_DID_NOT_DESERIALIZE = dist.ANCHOR_ERROR__ACCOUNT_DID_NOT_DESERIALIZE = ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_MISMATCH = dist.ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_MISMATCH = ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_NOT_FOUND = dist.ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_NOT_FOUND = ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_ALREADY_SET = dist.ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_ALREADY_SET = ANCHOR_ERROR__REQUIRE_GTE_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_GTE_VIOLATED = ANCHOR_ERROR__REQUIRE_GT_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_GT_VIOLATED = ANCHOR_ERROR__REQUIRE_KEYS_NEQ_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_KEYS_NEQ_VIOLATED = ANCHOR_ERROR__REQUIRE_NEQ_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_NEQ_VIOLATED = ANCHOR_ERROR__REQUIRE_KEYS_EQ_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_KEYS_EQ_VIOLATED = void 0;
var ANCHOR_ERROR__INSTRUCTION_MISSING = dist.ANCHOR_ERROR__INSTRUCTION_MISSING = 100;
var ANCHOR_ERROR__INSTRUCTION_FALLBACK_NOT_FOUND = dist.ANCHOR_ERROR__INSTRUCTION_FALLBACK_NOT_FOUND = 101;
var ANCHOR_ERROR__INSTRUCTION_DID_NOT_DESERIALIZE = dist.ANCHOR_ERROR__INSTRUCTION_DID_NOT_DESERIALIZE = 102;
var ANCHOR_ERROR__INSTRUCTION_DID_NOT_SERIALIZE = dist.ANCHOR_ERROR__INSTRUCTION_DID_NOT_SERIALIZE = 103;
var ANCHOR_ERROR__IDL_INSTRUCTION_STUB = dist.ANCHOR_ERROR__IDL_INSTRUCTION_STUB = 1e3;
var ANCHOR_ERROR__IDL_INSTRUCTION_INVALID_PROGRAM = dist.ANCHOR_ERROR__IDL_INSTRUCTION_INVALID_PROGRAM = 1001;
var ANCHOR_ERROR__IDL_ACCOUNT_NOT_EMPTY = dist.ANCHOR_ERROR__IDL_ACCOUNT_NOT_EMPTY = 1002;
var ANCHOR_ERROR__EVENT_INSTRUCTION_STUB = dist.ANCHOR_ERROR__EVENT_INSTRUCTION_STUB = 1500;
var ANCHOR_ERROR__CONSTRAINT_MUT = dist.ANCHOR_ERROR__CONSTRAINT_MUT = 2e3;
var ANCHOR_ERROR__CONSTRAINT_HAS_ONE = dist.ANCHOR_ERROR__CONSTRAINT_HAS_ONE = 2001;
var ANCHOR_ERROR__CONSTRAINT_SIGNER = dist.ANCHOR_ERROR__CONSTRAINT_SIGNER = 2002;
var ANCHOR_ERROR__CONSTRAINT_RAW = dist.ANCHOR_ERROR__CONSTRAINT_RAW = 2003;
var ANCHOR_ERROR__CONSTRAINT_OWNER = dist.ANCHOR_ERROR__CONSTRAINT_OWNER = 2004;
var ANCHOR_ERROR__CONSTRAINT_RENT_EXEMPT = dist.ANCHOR_ERROR__CONSTRAINT_RENT_EXEMPT = 2005;
var ANCHOR_ERROR__CONSTRAINT_SEEDS = dist.ANCHOR_ERROR__CONSTRAINT_SEEDS = 2006;
var ANCHOR_ERROR__CONSTRAINT_EXECUTABLE = dist.ANCHOR_ERROR__CONSTRAINT_EXECUTABLE = 2007;
var ANCHOR_ERROR__CONSTRAINT_STATE = dist.ANCHOR_ERROR__CONSTRAINT_STATE = 2008;
var ANCHOR_ERROR__CONSTRAINT_ASSOCIATED = dist.ANCHOR_ERROR__CONSTRAINT_ASSOCIATED = 2009;
var ANCHOR_ERROR__CONSTRAINT_ASSOCIATED_INIT = dist.ANCHOR_ERROR__CONSTRAINT_ASSOCIATED_INIT = 2010;
var ANCHOR_ERROR__CONSTRAINT_CLOSE = dist.ANCHOR_ERROR__CONSTRAINT_CLOSE = 2011;
var ANCHOR_ERROR__CONSTRAINT_ADDRESS = dist.ANCHOR_ERROR__CONSTRAINT_ADDRESS = 2012;
var ANCHOR_ERROR__CONSTRAINT_ZERO = dist.ANCHOR_ERROR__CONSTRAINT_ZERO = 2013;
var ANCHOR_ERROR__CONSTRAINT_TOKEN_MINT = dist.ANCHOR_ERROR__CONSTRAINT_TOKEN_MINT = 2014;
var ANCHOR_ERROR__CONSTRAINT_TOKEN_OWNER = dist.ANCHOR_ERROR__CONSTRAINT_TOKEN_OWNER = 2015;
var ANCHOR_ERROR__CONSTRAINT_MINT_MINT_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_MINT_AUTHORITY = 2016;
var ANCHOR_ERROR__CONSTRAINT_MINT_FREEZE_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_FREEZE_AUTHORITY = 2017;
var ANCHOR_ERROR__CONSTRAINT_MINT_DECIMALS = dist.ANCHOR_ERROR__CONSTRAINT_MINT_DECIMALS = 2018;
var ANCHOR_ERROR__CONSTRAINT_SPACE = dist.ANCHOR_ERROR__CONSTRAINT_SPACE = 2019;
var ANCHOR_ERROR__CONSTRAINT_ACCOUNT_IS_NONE = dist.ANCHOR_ERROR__CONSTRAINT_ACCOUNT_IS_NONE = 2020;
var ANCHOR_ERROR__CONSTRAINT_TOKEN_TOKEN_PROGRAM = dist.ANCHOR_ERROR__CONSTRAINT_TOKEN_TOKEN_PROGRAM = 2021;
var ANCHOR_ERROR__CONSTRAINT_MINT_TOKEN_PROGRAM = dist.ANCHOR_ERROR__CONSTRAINT_MINT_TOKEN_PROGRAM = 2022;
var ANCHOR_ERROR__CONSTRAINT_ASSOCIATED_TOKEN_TOKEN_PROGRAM = dist.ANCHOR_ERROR__CONSTRAINT_ASSOCIATED_TOKEN_TOKEN_PROGRAM = 2023;
var ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION = dist.ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION = 2024;
var ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION_AUTHORITY = 2025;
var ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION_GROUP_ADDRESS = dist.ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION_GROUP_ADDRESS = 2026;
var ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION = dist.ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION = 2027;
var ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION_AUTHORITY = 2028;
var ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION_MEMBER_ADDRESS = dist.ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION_MEMBER_ADDRESS = 2029;
var ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION = dist.ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION = 2030;
var ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION_AUTHORITY = 2031;
var ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION_METADATA_ADDRESS = dist.ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION_METADATA_ADDRESS = 2032;
var ANCHOR_ERROR__CONSTRAINT_MINT_CLOSE_AUTHORITY_EXTENSION = dist.ANCHOR_ERROR__CONSTRAINT_MINT_CLOSE_AUTHORITY_EXTENSION = 2033;
var ANCHOR_ERROR__CONSTRAINT_MINT_CLOSE_AUTHORITY_EXTENSION_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_CLOSE_AUTHORITY_EXTENSION_AUTHORITY = 2034;
var ANCHOR_ERROR__CONSTRAINT_MINT_PERMANENT_DELEGATE_EXTENSION = dist.ANCHOR_ERROR__CONSTRAINT_MINT_PERMANENT_DELEGATE_EXTENSION = 2035;
var ANCHOR_ERROR__CONSTRAINT_MINT_PERMANENT_DELEGATE_EXTENSION_DELEGATE = dist.ANCHOR_ERROR__CONSTRAINT_MINT_PERMANENT_DELEGATE_EXTENSION_DELEGATE = 2036;
var ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION = dist.ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION = 2037;
var ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION_AUTHORITY = dist.ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION_AUTHORITY = 2038;
var ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION_PROGRAM_ID = dist.ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION_PROGRAM_ID = 2039;
var ANCHOR_ERROR__REQUIRE_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_VIOLATED = 2500;
ANCHOR_ERROR__REQUIRE_EQ_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_EQ_VIOLATED = 2501;
var ANCHOR_ERROR__REQUIRE_KEYS_EQ_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_KEYS_EQ_VIOLATED = 2502;
var ANCHOR_ERROR__REQUIRE_NEQ_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_NEQ_VIOLATED = 2503;
var ANCHOR_ERROR__REQUIRE_KEYS_NEQ_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_KEYS_NEQ_VIOLATED = 2504;
var ANCHOR_ERROR__REQUIRE_GT_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_GT_VIOLATED = 2505;
var ANCHOR_ERROR__REQUIRE_GTE_VIOLATED = dist.ANCHOR_ERROR__REQUIRE_GTE_VIOLATED = 2506;
var ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_ALREADY_SET = dist.ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_ALREADY_SET = 3e3;
var ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_NOT_FOUND = dist.ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_NOT_FOUND = 3001;
var ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_MISMATCH = dist.ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_MISMATCH = 3002;
var ANCHOR_ERROR__ACCOUNT_DID_NOT_DESERIALIZE = dist.ANCHOR_ERROR__ACCOUNT_DID_NOT_DESERIALIZE = 3003;
var ANCHOR_ERROR__ACCOUNT_DID_NOT_SERIALIZE = dist.ANCHOR_ERROR__ACCOUNT_DID_NOT_SERIALIZE = 3004;
var ANCHOR_ERROR__ACCOUNT_NOT_ENOUGH_KEYS = dist.ANCHOR_ERROR__ACCOUNT_NOT_ENOUGH_KEYS = 3005;
var ANCHOR_ERROR__ACCOUNT_NOT_MUTABLE = dist.ANCHOR_ERROR__ACCOUNT_NOT_MUTABLE = 3006;
var ANCHOR_ERROR__ACCOUNT_OWNED_BY_WRONG_PROGRAM = dist.ANCHOR_ERROR__ACCOUNT_OWNED_BY_WRONG_PROGRAM = 3007;
var ANCHOR_ERROR__INVALID_PROGRAM_ID = dist.ANCHOR_ERROR__INVALID_PROGRAM_ID = 3008;
var ANCHOR_ERROR__INVALID_PROGRAM_EXECUTABLE = dist.ANCHOR_ERROR__INVALID_PROGRAM_EXECUTABLE = 3009;
var ANCHOR_ERROR__ACCOUNT_NOT_SIGNER = dist.ANCHOR_ERROR__ACCOUNT_NOT_SIGNER = 3010;
var ANCHOR_ERROR__ACCOUNT_NOT_SYSTEM_OWNED = dist.ANCHOR_ERROR__ACCOUNT_NOT_SYSTEM_OWNED = 3011;
var ANCHOR_ERROR__ACCOUNT_NOT_INITIALIZED = dist.ANCHOR_ERROR__ACCOUNT_NOT_INITIALIZED = 3012;
var ANCHOR_ERROR__ACCOUNT_NOT_PROGRAM_DATA = dist.ANCHOR_ERROR__ACCOUNT_NOT_PROGRAM_DATA = 3013;
var ANCHOR_ERROR__ACCOUNT_NOT_ASSOCIATED_TOKEN_ACCOUNT = dist.ANCHOR_ERROR__ACCOUNT_NOT_ASSOCIATED_TOKEN_ACCOUNT = 3014;
var ANCHOR_ERROR__ACCOUNT_SYSVAR_MISMATCH = dist.ANCHOR_ERROR__ACCOUNT_SYSVAR_MISMATCH = 3015;
var ANCHOR_ERROR__ACCOUNT_REALLOC_EXCEEDS_LIMIT = dist.ANCHOR_ERROR__ACCOUNT_REALLOC_EXCEEDS_LIMIT = 3016;
var ANCHOR_ERROR__ACCOUNT_DUPLICATE_REALLOCS = dist.ANCHOR_ERROR__ACCOUNT_DUPLICATE_REALLOCS = 3017;
var ANCHOR_ERROR__DECLARED_PROGRAM_ID_MISMATCH = dist.ANCHOR_ERROR__DECLARED_PROGRAM_ID_MISMATCH = 4100;
var ANCHOR_ERROR__TRYING_TO_INIT_PAYER_AS_PROGRAM_ACCOUNT = dist.ANCHOR_ERROR__TRYING_TO_INIT_PAYER_AS_PROGRAM_ACCOUNT = 4101;
var ANCHOR_ERROR__INVALID_NUMERIC_CONVERSION = dist.ANCHOR_ERROR__INVALID_NUMERIC_CONVERSION = 4102;
ANCHOR_ERROR__DEPRECATED = dist.ANCHOR_ERROR__DEPRECATED = 5e3;
var _FEATURES = /* @__PURE__ */ new Map();
function isSet(key) {
  return _FEATURES.get(key) !== void 0;
}
var IdlError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "IdlError";
  }
};
var ProgramErrorStack = class _ProgramErrorStack {
  constructor(stack) {
    this.stack = stack;
  }
  static parse(logs) {
    var _a;
    const programKeyRegex = /^Program (\w*) invoke/;
    const successRegex = /^Program \w* success/;
    const programStack = [];
    for (let i = 0; i < logs.length; i++) {
      if (successRegex.exec(logs[i])) {
        programStack.pop();
        continue;
      }
      const programKey = (_a = programKeyRegex.exec(logs[i])) === null || _a === void 0 ? void 0 : _a[1];
      if (!programKey) {
        continue;
      }
      programStack.push(new import_web33.PublicKey(programKey));
    }
    return new _ProgramErrorStack(programStack);
  }
};
var AnchorError = class _AnchorError extends Error {
  constructor(errorCode, errorMessage, errorLogs, logs, origin, comparedValues) {
    super(errorLogs.join("\n").replace("Program log: ", ""));
    this.errorLogs = errorLogs;
    this.logs = logs;
    this.error = { errorCode, errorMessage, comparedValues, origin };
    this._programErrorStack = ProgramErrorStack.parse(logs);
  }
  static parse(logs) {
    if (!logs) {
      return null;
    }
    const anchorErrorLogIndex = logs.findIndex((log) => log.startsWith("Program log: AnchorError"));
    if (anchorErrorLogIndex === -1) {
      return null;
    }
    const anchorErrorLog = logs[anchorErrorLogIndex];
    const errorLogs = [anchorErrorLog];
    let comparedValues;
    if (anchorErrorLogIndex + 1 < logs.length) {
      if (logs[anchorErrorLogIndex + 1] === "Program log: Left:") {
        const pubkeyRegex = /^Program log: (.*)$/;
        const leftPubkey = pubkeyRegex.exec(logs[anchorErrorLogIndex + 2])[1];
        const rightPubkey = pubkeyRegex.exec(logs[anchorErrorLogIndex + 4])[1];
        comparedValues = [
          new import_web33.PublicKey(leftPubkey),
          new import_web33.PublicKey(rightPubkey)
        ];
        errorLogs.push(...logs.slice(anchorErrorLogIndex + 1, anchorErrorLogIndex + 5));
      } else if (logs[anchorErrorLogIndex + 1].startsWith("Program log: Left:")) {
        const valueRegex = /^Program log: (Left|Right): (.*)$/;
        const leftValue = valueRegex.exec(logs[anchorErrorLogIndex + 1])[2];
        const rightValue = valueRegex.exec(logs[anchorErrorLogIndex + 2])[2];
        errorLogs.push(...logs.slice(anchorErrorLogIndex + 1, anchorErrorLogIndex + 3));
        comparedValues = [leftValue, rightValue];
      }
    }
    const regexNoInfo = /^Program log: AnchorError occurred\. Error Code: (.*)\. Error Number: (\d*)\. Error Message: (.*)\./;
    const noInfoAnchorErrorLog = regexNoInfo.exec(anchorErrorLog);
    const regexFileLine = /^Program log: AnchorError thrown in (.*):(\d*)\. Error Code: (.*)\. Error Number: (\d*)\. Error Message: (.*)\./;
    const fileLineAnchorErrorLog = regexFileLine.exec(anchorErrorLog);
    const regexAccountName = /^Program log: AnchorError caused by account: (.*)\. Error Code: (.*)\. Error Number: (\d*)\. Error Message: (.*)\./;
    const accountNameAnchorErrorLog = regexAccountName.exec(anchorErrorLog);
    if (noInfoAnchorErrorLog) {
      const [errorCodeString, errorNumber, errorMessage] = noInfoAnchorErrorLog.slice(1, 4);
      const errorCode = {
        code: errorCodeString,
        number: parseInt(errorNumber)
      };
      return new _AnchorError(errorCode, errorMessage, errorLogs, logs, void 0, comparedValues);
    } else if (fileLineAnchorErrorLog) {
      const [file, line, errorCodeString, errorNumber, errorMessage] = fileLineAnchorErrorLog.slice(1, 6);
      const errorCode = {
        code: errorCodeString,
        number: parseInt(errorNumber)
      };
      const fileLine = { file, line: parseInt(line) };
      return new _AnchorError(errorCode, errorMessage, errorLogs, logs, fileLine, comparedValues);
    } else if (accountNameAnchorErrorLog) {
      const [accountName, errorCodeString, errorNumber, errorMessage] = accountNameAnchorErrorLog.slice(1, 5);
      const origin = accountName;
      const errorCode = {
        code: errorCodeString,
        number: parseInt(errorNumber)
      };
      return new _AnchorError(errorCode, errorMessage, errorLogs, logs, origin, comparedValues);
    } else {
      return null;
    }
  }
  get program() {
    return this._programErrorStack.stack[this._programErrorStack.stack.length - 1];
  }
  get programErrorStack() {
    return this._programErrorStack.stack;
  }
  toString() {
    return this.message;
  }
};
var ProgramError = class _ProgramError extends Error {
  constructor(code, msg, logs) {
    super();
    this.code = code;
    this.msg = msg;
    this.logs = logs;
    if (logs) {
      this._programErrorStack = ProgramErrorStack.parse(logs);
    }
  }
  static parse(err2, idlErrors) {
    const errString = err2.toString();
    let unparsedErrorCode;
    if (errString.includes("custom program error:")) {
      let components = errString.split("custom program error: ");
      if (components.length !== 2) {
        return null;
      } else {
        unparsedErrorCode = components[1];
      }
    } else {
      const matches = errString.match(/"Custom":([0-9]+)}/g);
      if (!matches || matches.length > 1) {
        return null;
      }
      unparsedErrorCode = matches[0].match(/([0-9]+)/g)[0];
    }
    let errorCode;
    try {
      errorCode = parseInt(unparsedErrorCode);
    } catch (parseErr) {
      return null;
    }
    let errorMsg = idlErrors.get(errorCode);
    if (errorMsg !== void 0) {
      return new _ProgramError(errorCode, errorMsg, err2.logs);
    }
    errorMsg = LangErrorMessage.get(errorCode);
    if (errorMsg !== void 0) {
      return new _ProgramError(errorCode, errorMsg, err2.logs);
    }
    return null;
  }
  get program() {
    var _a;
    return (_a = this._programErrorStack) === null || _a === void 0 ? void 0 : _a.stack[this._programErrorStack.stack.length - 1];
  }
  get programErrorStack() {
    var _a;
    return (_a = this._programErrorStack) === null || _a === void 0 ? void 0 : _a.stack;
  }
  toString() {
    return this.msg;
  }
};
function translateError(err2, idlErrors) {
  if (isSet("debug-logs")) {
    console.log("Translating error:", err2);
  }
  const anchorError = AnchorError.parse(err2.logs);
  if (anchorError) {
    return anchorError;
  }
  const programError = ProgramError.parse(err2, idlErrors);
  if (programError) {
    return programError;
  }
  if (err2.logs) {
    const handler = {
      get: function(target, prop) {
        if (prop === "programErrorStack") {
          return target.programErrorStack.stack;
        } else if (prop === "program") {
          return target.programErrorStack.stack[err2.programErrorStack.stack.length - 1];
        } else {
          return Reflect.get(...arguments);
        }
      }
    };
    err2.programErrorStack = ProgramErrorStack.parse(err2.logs);
    return new Proxy(err2, handler);
  }
  return err2;
}
var LangErrorCode = {
  // Instructions.
  InstructionMissing: ANCHOR_ERROR__INSTRUCTION_MISSING,
  InstructionFallbackNotFound: ANCHOR_ERROR__INSTRUCTION_FALLBACK_NOT_FOUND,
  InstructionDidNotDeserialize: ANCHOR_ERROR__INSTRUCTION_DID_NOT_DESERIALIZE,
  InstructionDidNotSerialize: ANCHOR_ERROR__INSTRUCTION_DID_NOT_SERIALIZE,
  // IDL instructions.
  IdlInstructionStub: ANCHOR_ERROR__IDL_INSTRUCTION_STUB,
  IdlInstructionInvalidProgram: ANCHOR_ERROR__IDL_INSTRUCTION_INVALID_PROGRAM,
  IdlAccountNotEmpty: ANCHOR_ERROR__IDL_ACCOUNT_NOT_EMPTY,
  // Event instructions.
  EventInstructionStub: ANCHOR_ERROR__EVENT_INSTRUCTION_STUB,
  // Constraints.
  ConstraintMut: ANCHOR_ERROR__CONSTRAINT_MUT,
  ConstraintHasOne: ANCHOR_ERROR__CONSTRAINT_HAS_ONE,
  ConstraintSigner: ANCHOR_ERROR__CONSTRAINT_SIGNER,
  ConstraintRaw: ANCHOR_ERROR__CONSTRAINT_RAW,
  ConstraintOwner: ANCHOR_ERROR__CONSTRAINT_OWNER,
  ConstraintRentExempt: ANCHOR_ERROR__CONSTRAINT_RENT_EXEMPT,
  ConstraintSeeds: ANCHOR_ERROR__CONSTRAINT_SEEDS,
  ConstraintExecutable: ANCHOR_ERROR__CONSTRAINT_EXECUTABLE,
  ConstraintState: ANCHOR_ERROR__CONSTRAINT_STATE,
  ConstraintAssociated: ANCHOR_ERROR__CONSTRAINT_ASSOCIATED,
  ConstraintAssociatedInit: ANCHOR_ERROR__CONSTRAINT_ASSOCIATED_INIT,
  ConstraintClose: ANCHOR_ERROR__CONSTRAINT_CLOSE,
  ConstraintAddress: ANCHOR_ERROR__CONSTRAINT_ADDRESS,
  ConstraintZero: ANCHOR_ERROR__CONSTRAINT_ZERO,
  ConstraintTokenMint: ANCHOR_ERROR__CONSTRAINT_TOKEN_MINT,
  ConstraintTokenOwner: ANCHOR_ERROR__CONSTRAINT_TOKEN_OWNER,
  ConstraintMintMintAuthority: ANCHOR_ERROR__CONSTRAINT_MINT_MINT_AUTHORITY,
  ConstraintMintFreezeAuthority: ANCHOR_ERROR__CONSTRAINT_MINT_FREEZE_AUTHORITY,
  ConstraintMintDecimals: ANCHOR_ERROR__CONSTRAINT_MINT_DECIMALS,
  ConstraintSpace: ANCHOR_ERROR__CONSTRAINT_SPACE,
  ConstraintAccountIsNone: ANCHOR_ERROR__CONSTRAINT_ACCOUNT_IS_NONE,
  ConstraintTokenTokenProgram: ANCHOR_ERROR__CONSTRAINT_TOKEN_TOKEN_PROGRAM,
  ConstraintMintTokenProgram: ANCHOR_ERROR__CONSTRAINT_MINT_TOKEN_PROGRAM,
  ConstraintAssociatedTokenTokenProgram: ANCHOR_ERROR__CONSTRAINT_ASSOCIATED_TOKEN_TOKEN_PROGRAM,
  ConstraintMintGroupPointerExtension: ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION,
  ConstraintMintGroupPointerExtensionAuthority: ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION_AUTHORITY,
  ConstraintMintGroupPointerExtensionGroupAddress: ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_POINTER_EXTENSION_GROUP_ADDRESS,
  ConstraintMintGroupMemberPointerExtension: ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION,
  ConstraintMintGroupMemberPointerExtensionAuthority: ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION_AUTHORITY,
  ConstraintMintGroupMemberPointerExtensionMemberAddress: ANCHOR_ERROR__CONSTRAINT_MINT_GROUP_MEMBER_POINTER_EXTENSION_MEMBER_ADDRESS,
  ConstraintMintMetadataPointerExtension: ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION,
  ConstraintMintMetadataPointerExtensionAuthority: ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION_AUTHORITY,
  ConstraintMintMetadataPointerExtensionMetadataAddress: ANCHOR_ERROR__CONSTRAINT_MINT_METADATA_POINTER_EXTENSION_METADATA_ADDRESS,
  ConstraintMintCloseAuthorityExtension: ANCHOR_ERROR__CONSTRAINT_MINT_CLOSE_AUTHORITY_EXTENSION,
  ConstraintMintCloseAuthorityExtensionAuthority: ANCHOR_ERROR__CONSTRAINT_MINT_CLOSE_AUTHORITY_EXTENSION_AUTHORITY,
  ConstraintMintPermanentDelegateExtension: ANCHOR_ERROR__CONSTRAINT_MINT_PERMANENT_DELEGATE_EXTENSION,
  ConstraintMintPermanentDelegateExtensionDelegate: ANCHOR_ERROR__CONSTRAINT_MINT_PERMANENT_DELEGATE_EXTENSION_DELEGATE,
  ConstraintMintTransferHookExtension: ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION,
  ConstraintMintTransferHookExtensionAuthority: ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION_AUTHORITY,
  ConstraintMintTransferHookExtensionProgramId: ANCHOR_ERROR__CONSTRAINT_MINT_TRANSFER_HOOK_EXTENSION_PROGRAM_ID,
  // Require.
  RequireViolated: ANCHOR_ERROR__REQUIRE_VIOLATED,
  RequireEqViolated: ANCHOR_ERROR__REQUIRE_EQ_VIOLATED,
  RequireKeysEqViolated: ANCHOR_ERROR__REQUIRE_KEYS_EQ_VIOLATED,
  RequireNeqViolated: ANCHOR_ERROR__REQUIRE_NEQ_VIOLATED,
  RequireKeysNeqViolated: ANCHOR_ERROR__REQUIRE_KEYS_NEQ_VIOLATED,
  RequireGtViolated: ANCHOR_ERROR__REQUIRE_GT_VIOLATED,
  RequireGteViolated: ANCHOR_ERROR__REQUIRE_GTE_VIOLATED,
  // Accounts.
  AccountDiscriminatorAlreadySet: ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_ALREADY_SET,
  AccountDiscriminatorNotFound: ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_NOT_FOUND,
  AccountDiscriminatorMismatch: ANCHOR_ERROR__ACCOUNT_DISCRIMINATOR_MISMATCH,
  AccountDidNotDeserialize: ANCHOR_ERROR__ACCOUNT_DID_NOT_DESERIALIZE,
  AccountDidNotSerialize: ANCHOR_ERROR__ACCOUNT_DID_NOT_SERIALIZE,
  AccountNotEnoughKeys: ANCHOR_ERROR__ACCOUNT_NOT_ENOUGH_KEYS,
  AccountNotMutable: ANCHOR_ERROR__ACCOUNT_NOT_MUTABLE,
  AccountOwnedByWrongProgram: ANCHOR_ERROR__ACCOUNT_OWNED_BY_WRONG_PROGRAM,
  InvalidProgramId: ANCHOR_ERROR__INVALID_PROGRAM_ID,
  InvalidProgramExecutable: ANCHOR_ERROR__INVALID_PROGRAM_EXECUTABLE,
  AccountNotSigner: ANCHOR_ERROR__ACCOUNT_NOT_SIGNER,
  AccountNotSystemOwned: ANCHOR_ERROR__ACCOUNT_NOT_SYSTEM_OWNED,
  AccountNotInitialized: ANCHOR_ERROR__ACCOUNT_NOT_INITIALIZED,
  AccountNotProgramData: ANCHOR_ERROR__ACCOUNT_NOT_PROGRAM_DATA,
  AccountNotAssociatedTokenAccount: ANCHOR_ERROR__ACCOUNT_NOT_ASSOCIATED_TOKEN_ACCOUNT,
  AccountSysvarMismatch: ANCHOR_ERROR__ACCOUNT_SYSVAR_MISMATCH,
  AccountReallocExceedsLimit: ANCHOR_ERROR__ACCOUNT_REALLOC_EXCEEDS_LIMIT,
  AccountDuplicateReallocs: ANCHOR_ERROR__ACCOUNT_DUPLICATE_REALLOCS,
  // Miscellaneous
  DeclaredProgramIdMismatch: ANCHOR_ERROR__DECLARED_PROGRAM_ID_MISMATCH,
  TryingToInitPayerAsProgramAccount: ANCHOR_ERROR__TRYING_TO_INIT_PAYER_AS_PROGRAM_ACCOUNT,
  InvalidNumericConversion: ANCHOR_ERROR__INVALID_NUMERIC_CONVERSION,
  // Used for APIs that shouldn't be used anymore.
  Deprecated: ANCHOR_ERROR__DEPRECATED
};
var LangErrorMessage = /* @__PURE__ */ new Map([
  // Instructions.
  [LangErrorCode.InstructionMissing, "Instruction discriminator not provided"],
  [
    LangErrorCode.InstructionFallbackNotFound,
    "Fallback functions are not supported"
  ],
  [
    LangErrorCode.InstructionDidNotDeserialize,
    "The program could not deserialize the given instruction"
  ],
  [
    LangErrorCode.InstructionDidNotSerialize,
    "The program could not serialize the given instruction"
  ],
  // Idl instructions.
  [
    LangErrorCode.IdlInstructionStub,
    "The program was compiled without idl instructions"
  ],
  [
    LangErrorCode.IdlInstructionInvalidProgram,
    "The transaction was given an invalid program for the IDL instruction"
  ],
  [
    LangErrorCode.IdlAccountNotEmpty,
    "IDL account must be empty in order to resize, try closing first"
  ],
  // Event instructions.
  [
    LangErrorCode.EventInstructionStub,
    "The program was compiled without `event-cpi` feature"
  ],
  // Constraints.
  [LangErrorCode.ConstraintMut, "A mut constraint was violated"],
  [LangErrorCode.ConstraintHasOne, "A has one constraint was violated"],
  [LangErrorCode.ConstraintSigner, "A signer constraint was violated"],
  [LangErrorCode.ConstraintRaw, "A raw constraint was violated"],
  [LangErrorCode.ConstraintOwner, "An owner constraint was violated"],
  [
    LangErrorCode.ConstraintRentExempt,
    "A rent exemption constraint was violated"
  ],
  [LangErrorCode.ConstraintSeeds, "A seeds constraint was violated"],
  [LangErrorCode.ConstraintExecutable, "An executable constraint was violated"],
  [
    LangErrorCode.ConstraintState,
    "Deprecated Error, feel free to replace with something else"
  ],
  [LangErrorCode.ConstraintAssociated, "An associated constraint was violated"],
  [
    LangErrorCode.ConstraintAssociatedInit,
    "An associated init constraint was violated"
  ],
  [LangErrorCode.ConstraintClose, "A close constraint was violated"],
  [LangErrorCode.ConstraintAddress, "An address constraint was violated"],
  [LangErrorCode.ConstraintZero, "Expected zero account discriminant"],
  [LangErrorCode.ConstraintTokenMint, "A token mint constraint was violated"],
  [LangErrorCode.ConstraintTokenOwner, "A token owner constraint was violated"],
  [
    LangErrorCode.ConstraintMintMintAuthority,
    "A mint mint authority constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintFreezeAuthority,
    "A mint freeze authority constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintDecimals,
    "A mint decimals constraint was violated"
  ],
  [LangErrorCode.ConstraintSpace, "A space constraint was violated"],
  [
    LangErrorCode.ConstraintAccountIsNone,
    "A required account for the constraint is None"
  ],
  [
    LangErrorCode.ConstraintTokenTokenProgram,
    "A token account token program constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintTokenProgram,
    "A mint token program constraint was violated"
  ],
  [
    LangErrorCode.ConstraintAssociatedTokenTokenProgram,
    "An associated token account token program constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintGroupPointerExtension,
    "A group pointer extension constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintGroupPointerExtensionAuthority,
    "A group pointer extension authority constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintGroupPointerExtensionGroupAddress,
    "A group pointer extension group address constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintGroupMemberPointerExtension,
    "A group member pointer extension constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintGroupMemberPointerExtensionAuthority,
    "A group member pointer extension authority constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintGroupMemberPointerExtensionMemberAddress,
    "A group member pointer extension group address constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintMetadataPointerExtension,
    "A metadata pointer extension constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintMetadataPointerExtensionAuthority,
    "A metadata pointer extension authority constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintMetadataPointerExtensionMetadataAddress,
    "A metadata pointer extension metadata address constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintCloseAuthorityExtension,
    "A close authority constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintCloseAuthorityExtensionAuthority,
    "A close authority extension authority constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintPermanentDelegateExtension,
    "A permanent delegate extension constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintPermanentDelegateExtensionDelegate,
    "A permanent delegate extension delegate constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintTransferHookExtension,
    "A transfer hook extension constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintTransferHookExtensionAuthority,
    "A transfer hook extension authority constraint was violated"
  ],
  [
    LangErrorCode.ConstraintMintTransferHookExtensionProgramId,
    "A transfer hook extension transfer hook program id constraint was violated"
  ],
  // Require.
  [LangErrorCode.RequireViolated, "A require expression was violated"],
  [LangErrorCode.RequireEqViolated, "A require_eq expression was violated"],
  [
    LangErrorCode.RequireKeysEqViolated,
    "A require_keys_eq expression was violated"
  ],
  [LangErrorCode.RequireNeqViolated, "A require_neq expression was violated"],
  [
    LangErrorCode.RequireKeysNeqViolated,
    "A require_keys_neq expression was violated"
  ],
  [LangErrorCode.RequireGtViolated, "A require_gt expression was violated"],
  [LangErrorCode.RequireGteViolated, "A require_gte expression was violated"],
  // Accounts.
  [
    LangErrorCode.AccountDiscriminatorAlreadySet,
    "The account discriminator was already set on this account"
  ],
  [
    LangErrorCode.AccountDiscriminatorNotFound,
    "No discriminator was found on the account"
  ],
  [
    LangErrorCode.AccountDiscriminatorMismatch,
    "Account discriminator did not match what was expected"
  ],
  [LangErrorCode.AccountDidNotDeserialize, "Failed to deserialize the account"],
  [LangErrorCode.AccountDidNotSerialize, "Failed to serialize the account"],
  [
    LangErrorCode.AccountNotEnoughKeys,
    "Not enough account keys given to the instruction"
  ],
  [LangErrorCode.AccountNotMutable, "The given account is not mutable"],
  [
    LangErrorCode.AccountOwnedByWrongProgram,
    "The given account is owned by a different program than expected"
  ],
  [LangErrorCode.InvalidProgramId, "Program ID was not as expected"],
  [LangErrorCode.InvalidProgramExecutable, "Program account is not executable"],
  [LangErrorCode.AccountNotSigner, "The given account did not sign"],
  [
    LangErrorCode.AccountNotSystemOwned,
    "The given account is not owned by the system program"
  ],
  [
    LangErrorCode.AccountNotInitialized,
    "The program expected this account to be already initialized"
  ],
  [
    LangErrorCode.AccountNotProgramData,
    "The given account is not a program data account"
  ],
  [
    LangErrorCode.AccountNotAssociatedTokenAccount,
    "The given account is not the associated token account"
  ],
  [
    LangErrorCode.AccountSysvarMismatch,
    "The given public key does not match the required sysvar"
  ],
  [
    LangErrorCode.AccountReallocExceedsLimit,
    "The account reallocation exceeds the MAX_PERMITTED_DATA_INCREASE limit"
  ],
  [
    LangErrorCode.AccountDuplicateReallocs,
    "The account was duplicated for more than one reallocation"
  ],
  // Miscellaneous
  [
    LangErrorCode.DeclaredProgramIdMismatch,
    "The declared program id does not match the actual program id"
  ],
  [
    LangErrorCode.TryingToInitPayerAsProgramAccount,
    "You cannot/should not initialize the payer account as a program account"
  ],
  [
    LangErrorCode.InvalidNumericConversion,
    "The program could not perform the numeric conversion, out of range integral type conversion attempted"
  ],
  // Deprecated
  [
    LangErrorCode.Deprecated,
    "The API being used is deprecated and should no longer be used"
  ]
]);
var IdlCoder = class _IdlCoder {
  static fieldLayout(field, types = [], genericArgs) {
    const fieldName = field.name;
    switch (field.type) {
      case "bool": {
        return borsh.bool(fieldName);
      }
      case "u8": {
        return borsh.u8(fieldName);
      }
      case "i8": {
        return borsh.i8(fieldName);
      }
      case "u16": {
        return borsh.u16(fieldName);
      }
      case "i16": {
        return borsh.i16(fieldName);
      }
      case "u32": {
        return borsh.u32(fieldName);
      }
      case "i32": {
        return borsh.i32(fieldName);
      }
      case "f32": {
        return borsh.f32(fieldName);
      }
      case "u64": {
        return borsh.u64(fieldName);
      }
      case "i64": {
        return borsh.i64(fieldName);
      }
      case "f64": {
        return borsh.f64(fieldName);
      }
      case "u128": {
        return borsh.u128(fieldName);
      }
      case "i128": {
        return borsh.i128(fieldName);
      }
      case "u256": {
        return borsh.u256(fieldName);
      }
      case "i256": {
        return borsh.i256(fieldName);
      }
      case "bytes": {
        return borsh.vecU8(fieldName);
      }
      case "string": {
        return borsh.str(fieldName);
      }
      case "pubkey": {
        return borsh.publicKey(fieldName);
      }
      default: {
        if ("option" in field.type) {
          return borsh.option(_IdlCoder.fieldLayout({ type: field.type.option }, types, genericArgs), fieldName);
        }
        if ("vec" in field.type) {
          return borsh.vec(_IdlCoder.fieldLayout({ type: field.type.vec }, types, genericArgs), fieldName);
        }
        if ("array" in field.type) {
          let [type2, len] = field.type.array;
          len = _IdlCoder.resolveArrayLen(len, genericArgs);
          return borsh.array(_IdlCoder.fieldLayout({ type: type2 }, types, genericArgs), len, fieldName);
        }
        if ("defined" in field.type) {
          if (!types) {
            throw new IdlError("User defined types not provided");
          }
          const definedName = field.type.defined.name;
          const typeDef = types.find((t) => t.name === definedName);
          if (!typeDef) {
            throw new IdlError(`Type not found: ${field.name}`);
          }
          return _IdlCoder.typeDefLayout({
            typeDef,
            types,
            genericArgs: genericArgs !== null && genericArgs !== void 0 ? genericArgs : field.type.defined.generics,
            name: fieldName
          });
        }
        if ("generic" in field.type) {
          const genericArg = genericArgs === null || genericArgs === void 0 ? void 0 : genericArgs.at(0);
          if ((genericArg === null || genericArg === void 0 ? void 0 : genericArg.kind) !== "type") {
            throw new IdlError(`Invalid generic field: ${field.name}`);
          }
          return _IdlCoder.fieldLayout({ ...field, type: genericArg.type }, types);
        }
        throw new IdlError(`Not yet implemented: ${JSON.stringify(field.type)}`);
      }
    }
  }
  /**
   * Get the type layout of the given defined type(struct or enum).
   */
  static typeDefLayout({ typeDef, types, name, genericArgs }) {
    switch (typeDef.type.kind) {
      case "struct": {
        const fieldLayouts = handleDefinedFields(typeDef.type.fields, () => [], (fields) => fields.map((f) => {
          const genArgs = genericArgs ? _IdlCoder.resolveGenericArgs({
            type: f.type,
            typeDef,
            genericArgs
          }) : genericArgs;
          return _IdlCoder.fieldLayout(f, types, genArgs);
        }), (fields) => fields.map((f, i) => {
          const genArgs = genericArgs ? _IdlCoder.resolveGenericArgs({
            type: f,
            typeDef,
            genericArgs
          }) : genericArgs;
          return _IdlCoder.fieldLayout({ name: i.toString(), type: f }, types, genArgs);
        }));
        return borsh.struct(fieldLayouts, name);
      }
      case "enum": {
        const variants = typeDef.type.variants.map((variant) => {
          const fieldLayouts = handleDefinedFields(variant.fields, () => [], (fields) => fields.map((f) => {
            const genArgs = genericArgs ? _IdlCoder.resolveGenericArgs({
              type: f.type,
              typeDef,
              genericArgs
            }) : genericArgs;
            return _IdlCoder.fieldLayout(f, types, genArgs);
          }), (fields) => fields.map((f, i) => {
            const genArgs = genericArgs ? _IdlCoder.resolveGenericArgs({
              type: f,
              typeDef,
              genericArgs
            }) : genericArgs;
            return _IdlCoder.fieldLayout({ name: i.toString(), type: f }, types, genArgs);
          }));
          return borsh.struct(fieldLayouts, variant.name);
        });
        if (name !== void 0) {
          return borsh.rustEnum(variants).replicate(name);
        }
        return borsh.rustEnum(variants, name);
      }
      case "type": {
        return _IdlCoder.fieldLayout({ type: typeDef.type.alias, name }, types);
      }
    }
  }
  /**
   * Get the type of the size in bytes. Returns `1` for variable length types.
   */
  static typeSize(ty, idl, genericArgs) {
    var _a;
    switch (ty) {
      case "bool":
        return 1;
      case "u8":
        return 1;
      case "i8":
        return 1;
      case "i16":
        return 2;
      case "u16":
        return 2;
      case "u32":
        return 4;
      case "i32":
        return 4;
      case "f32":
        return 4;
      case "u64":
        return 8;
      case "i64":
        return 8;
      case "f64":
        return 8;
      case "u128":
        return 16;
      case "i128":
        return 16;
      case "u256":
        return 32;
      case "i256":
        return 32;
      case "bytes":
        return 1;
      case "string":
        return 1;
      case "pubkey":
        return 32;
      default:
        if ("option" in ty) {
          return 1 + _IdlCoder.typeSize(ty.option, idl, genericArgs);
        }
        if ("coption" in ty) {
          return 4 + _IdlCoder.typeSize(ty.coption, idl, genericArgs);
        }
        if ("vec" in ty) {
          return 1;
        }
        if ("array" in ty) {
          let [type2, len] = ty.array;
          len = _IdlCoder.resolveArrayLen(len, genericArgs);
          return _IdlCoder.typeSize(type2, idl, genericArgs) * len;
        }
        if ("defined" in ty) {
          const typeDef = (_a = idl.types) === null || _a === void 0 ? void 0 : _a.find((t) => t.name === ty.defined.name);
          if (!typeDef) {
            throw new IdlError(`Type not found: ${JSON.stringify(ty)}`);
          }
          const typeSize = (type2) => {
            const genArgs = genericArgs !== null && genericArgs !== void 0 ? genericArgs : ty.defined.generics;
            const args = genArgs ? _IdlCoder.resolveGenericArgs({
              type: type2,
              typeDef,
              genericArgs: genArgs
            }) : genArgs;
            return _IdlCoder.typeSize(type2, idl, args);
          };
          switch (typeDef.type.kind) {
            case "struct": {
              return handleDefinedFields(typeDef.type.fields, () => [0], (fields) => fields.map((f) => typeSize(f.type)), (fields) => fields.map((f) => typeSize(f))).reduce((acc, size) => acc + size, 0);
            }
            case "enum": {
              const variantSizes = typeDef.type.variants.map((variant) => {
                return handleDefinedFields(variant.fields, () => [0], (fields) => fields.map((f) => typeSize(f.type)), (fields) => fields.map((f) => typeSize(f))).reduce((acc, size) => acc + size, 0);
              });
              return Math.max(...variantSizes) + 1;
            }
            case "type": {
              return _IdlCoder.typeSize(typeDef.type.alias, idl, genericArgs);
            }
          }
        }
        if ("generic" in ty) {
          const genericArg = genericArgs === null || genericArgs === void 0 ? void 0 : genericArgs.at(0);
          if ((genericArg === null || genericArg === void 0 ? void 0 : genericArg.kind) !== "type") {
            throw new IdlError(`Invalid generic: ${ty.generic}`);
          }
          return _IdlCoder.typeSize(genericArg.type, idl, genericArgs);
        }
        throw new Error(`Invalid type ${JSON.stringify(ty)}`);
    }
  }
  /**
   * Resolve the generic array length or return the constant-sized array length.
   */
  static resolveArrayLen(len, genericArgs) {
    if (typeof len === "number")
      return len;
    if (genericArgs) {
      const genericLen = genericArgs.find((g) => g.kind === "const");
      if ((genericLen === null || genericLen === void 0 ? void 0 : genericLen.kind) === "const") {
        len = +genericLen.value;
      }
    }
    if (typeof len !== "number") {
      throw new IdlError("Generic array length did not resolve");
    }
    return len;
  }
  /**
   * Recursively resolve generic arguments i.e. replace all generics with the
   * actual type that they hold based on the initial `genericArgs` given.
   */
  static resolveGenericArgs({ type: type2, typeDef, genericArgs, isDefined }) {
    if (typeof type2 !== "object")
      return null;
    for (const index in typeDef.generics) {
      const defGeneric = typeDef.generics[index];
      if ("generic" in type2 && defGeneric.name === type2.generic) {
        return [genericArgs[index]];
      }
      if ("option" in type2) {
        const args = _IdlCoder.resolveGenericArgs({
          type: type2.option,
          typeDef,
          genericArgs,
          isDefined
        });
        if (!args || !isDefined)
          return args;
        if (args[0].kind === "type") {
          return [
            {
              kind: "type",
              type: { option: args[0].type }
            }
          ];
        }
      }
      if ("vec" in type2) {
        const args = _IdlCoder.resolveGenericArgs({
          type: type2.vec,
          typeDef,
          genericArgs,
          isDefined
        });
        if (!args || !isDefined)
          return args;
        if (args[0].kind === "type") {
          return [
            {
              kind: "type",
              type: { vec: args[0].type }
            }
          ];
        }
      }
      if ("array" in type2) {
        const [elTy, len] = type2.array;
        const isGenericLen = typeof len === "object";
        const args = _IdlCoder.resolveGenericArgs({
          type: elTy,
          typeDef,
          genericArgs,
          isDefined
        }) || [];
        if (isGenericLen) {
          const matchingGeneric = typeDef.generics.findIndex((g) => g.name === len.generic);
          if (matchingGeneric !== -1) {
            args.push(genericArgs[matchingGeneric]);
          }
        }
        if (args.length > 0) {
          if (!isDefined)
            return args;
          if (args[0].kind === "type" && args[1].kind === "const") {
            return [
              {
                kind: "type",
                type: { array: [args[0].type, +args[1].value] }
              }
            ];
          }
        }
        if (isGenericLen && defGeneric.name === len.generic) {
          const arg = genericArgs[index];
          if (!isDefined)
            return [arg];
          return [
            {
              kind: "type",
              type: { array: [elTy, +arg.value] }
            }
          ];
        }
        return null;
      }
      if ("defined" in type2) {
        if (!type2.defined.generics)
          return null;
        return type2.defined.generics.flatMap((g) => {
          switch (g.kind) {
            case "type":
              return _IdlCoder.resolveGenericArgs({
                type: g.type,
                typeDef,
                genericArgs,
                isDefined: true
              });
            case "const":
              return [g];
          }
        }).filter((g) => g !== null);
      }
    }
    return null;
  }
};
var BorshInstructionCoder = class {
  constructor(idl) {
    this.idl = idl;
    const ixLayouts = idl.instructions.map((ix) => {
      const name = ix.name;
      const fieldLayouts = ix.args.map((arg) => IdlCoder.fieldLayout(arg, idl.types));
      const layout = borsh.struct(fieldLayouts, name);
      return [name, { discriminator: ix.discriminator, layout }];
    });
    this.ixLayouts = new Map(ixLayouts);
  }
  /**
   * Encodes a program instruction.
   */
  encode(ixName, ix) {
    const buffer = import_buffer.Buffer.alloc(1e3);
    const encoder = this.ixLayouts.get(ixName);
    if (!encoder) {
      throw new Error(`Unknown method: ${ixName}`);
    }
    const len = encoder.layout.encode(ix, buffer);
    const data = buffer.slice(0, len);
    return import_buffer.Buffer.concat([import_buffer.Buffer.from(encoder.discriminator), data]);
  }
  /**
   * Decodes a program instruction.
   */
  decode(ix, encoding = "hex") {
    if (typeof ix === "string") {
      ix = encoding === "hex" ? import_buffer.Buffer.from(ix, "hex") : import_bs58.default.decode(ix);
    }
    for (const [name, layout] of this.ixLayouts) {
      const givenDisc = ix.subarray(0, layout.discriminator.length);
      const matches = givenDisc.equals(import_buffer.Buffer.from(layout.discriminator));
      if (matches) {
        return {
          name,
          data: layout.layout.decode(ix.subarray(givenDisc.length))
        };
      }
    }
    return null;
  }
  /**
   * Returns a formatted table of all the fields in the given instruction data.
   */
  format(ix, accountMetas) {
    return InstructionFormatter.format(ix, accountMetas, this.idl);
  }
};
var InstructionFormatter = class _InstructionFormatter {
  static format(ix, accountMetas, idl) {
    const idlIx = idl.instructions.find((i) => ix.name === i.name);
    if (!idlIx) {
      console.error("Invalid instruction given");
      return null;
    }
    const args = idlIx.args.map((idlField) => {
      return {
        name: idlField.name,
        type: _InstructionFormatter.formatIdlType(idlField.type),
        data: _InstructionFormatter.formatIdlData(idlField, ix.data[idlField.name], idl.types)
      };
    });
    const flatIdlAccounts = _InstructionFormatter.flattenIdlAccounts(idlIx.accounts);
    const accounts = accountMetas.map((meta, idx) => {
      if (idx < flatIdlAccounts.length) {
        return {
          name: flatIdlAccounts[idx].name,
          ...meta
        };
      } else {
        return {
          name: void 0,
          ...meta
        };
      }
    });
    return {
      args,
      accounts
    };
  }
  static formatIdlType(idlType) {
    if (typeof idlType === "string") {
      return idlType;
    }
    if ("option" in idlType) {
      return `Option<${this.formatIdlType(idlType.option)}>`;
    }
    if ("coption" in idlType) {
      return `COption<${this.formatIdlType(idlType.coption)}>`;
    }
    if ("vec" in idlType) {
      return `Vec<${this.formatIdlType(idlType.vec)}>`;
    }
    if ("array" in idlType) {
      return `Array<${idlType.array[0]}; ${idlType.array[1]}>`;
    }
    if ("defined" in idlType) {
      const name = idlType.defined.name;
      if (idlType.defined.generics) {
        const generics = idlType.defined.generics.map((g) => {
          switch (g.kind) {
            case "type":
              return _InstructionFormatter.formatIdlType(g.type);
            case "const":
              return g.value;
          }
        }).join(", ");
        return `${name}<${generics}>`;
      }
      return name;
    }
    throw new Error(`Unknown IDL type: ${idlType}`);
  }
  static formatIdlData(idlField, data, types) {
    if (typeof idlField.type === "string") {
      return data.toString();
    }
    if ("vec" in idlField.type) {
      return "[" + data.map((d) => this.formatIdlData({ name: "", type: idlField.type.vec }, d, types)).join(", ") + "]";
    }
    if ("option" in idlField.type) {
      return data === null ? "null" : this.formatIdlData({ name: "", type: idlField.type.option }, data, types);
    }
    if ("defined" in idlField.type) {
      if (!types) {
        throw new Error("User defined types not provided");
      }
      const definedName = idlField.type.defined.name;
      const typeDef = types.find((t) => t.name === definedName);
      if (!typeDef) {
        throw new Error(`Type not found: ${definedName}`);
      }
      return _InstructionFormatter.formatIdlDataDefined(typeDef, data, types);
    }
    return "unknown";
  }
  static formatIdlDataDefined(typeDef, data, types) {
    switch (typeDef.type.kind) {
      case "struct": {
        return "{ " + handleDefinedFields(typeDef.type.fields, () => "", (fields) => {
          return Object.entries(data).map(([key, val]) => {
            const field = fields.find((f) => f.name === key);
            if (!field) {
              throw new Error(`Field not found: ${key}`);
            }
            return key + ": " + _InstructionFormatter.formatIdlData(field, val, types);
          }).join(", ");
        }, (fields) => {
          return Object.entries(data).map(([key, val]) => {
            return key + ": " + _InstructionFormatter.formatIdlData({ name: "", type: fields[key] }, val, types);
          }).join(", ");
        }) + " }";
      }
      case "enum": {
        const variantName = Object.keys(data)[0];
        const variant = typeDef.type.variants.find((v) => v.name === variantName);
        if (!variant) {
          throw new Error(`Unable to find variant: ${variantName}`);
        }
        const enumValue = data[variantName];
        return handleDefinedFields(variant.fields, () => variantName, (fields) => {
          const namedFields = Object.keys(enumValue).map((f) => {
            const fieldData = enumValue[f];
            const idlField = fields.find((v) => v.name === f);
            if (!idlField) {
              throw new Error(`Field not found: ${f}`);
            }
            return f + ": " + _InstructionFormatter.formatIdlData(idlField, fieldData, types);
          }).join(", ");
          return `${variantName} { ${namedFields} }`;
        }, (fields) => {
          const tupleFields = Object.entries(enumValue).map(([key, val]) => {
            return key + ": " + _InstructionFormatter.formatIdlData({ name: "", type: fields[key] }, val, types);
          }).join(", ");
          return `${variantName} { ${tupleFields} }`;
        });
      }
      case "type": {
        return _InstructionFormatter.formatIdlType(typeDef.type.alias);
      }
    }
  }
  static flattenIdlAccounts(accounts, prefix) {
    return accounts.map((account) => {
      const accName = sentenceCase(account.name);
      if (account.hasOwnProperty("accounts")) {
        const newPrefix = prefix ? `${prefix} > ${accName}` : accName;
        return _InstructionFormatter.flattenIdlAccounts(account.accounts, newPrefix);
      } else {
        return {
          ...account,
          name: prefix ? `${prefix} > ${accName}` : accName
        };
      }
    }).flat();
  }
};
function sentenceCase(field) {
  const result = field.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
var BorshAccountsCoder = class {
  constructor(idl) {
    this.idl = idl;
    if (!idl.accounts) {
      this.accountLayouts = /* @__PURE__ */ new Map();
      return;
    }
    const types = idl.types;
    if (!types) {
      throw new Error("Accounts require `idl.types`");
    }
    const layouts = idl.accounts.map((acc) => {
      const typeDef = types.find((ty) => ty.name === acc.name);
      if (!typeDef) {
        throw new Error(`Account not found: ${acc.name}`);
      }
      return [
        acc.name,
        {
          discriminator: acc.discriminator,
          layout: IdlCoder.typeDefLayout({ typeDef, types })
        }
      ];
    });
    this.accountLayouts = new Map(layouts);
  }
  async encode(accountName, account) {
    const buffer = import_buffer.Buffer.alloc(1e3);
    const layout = this.accountLayouts.get(accountName);
    if (!layout) {
      throw new Error(`Unknown account: ${accountName}`);
    }
    const len = layout.layout.encode(account, buffer);
    const accountData = buffer.slice(0, len);
    const discriminator = this.accountDiscriminator(accountName);
    return import_buffer.Buffer.concat([discriminator, accountData]);
  }
  decode(accountName, data) {
    const discriminator = this.accountDiscriminator(accountName);
    if (discriminator.compare(data.slice(0, discriminator.length))) {
      throw new Error("Invalid account discriminator");
    }
    return this.decodeUnchecked(accountName, data);
  }
  decodeAny(data) {
    for (const [name, layout] of this.accountLayouts) {
      const givenDisc = data.subarray(0, layout.discriminator.length);
      const matches = givenDisc.equals(import_buffer.Buffer.from(layout.discriminator));
      if (matches)
        return this.decodeUnchecked(name, data);
    }
    throw new Error("Account not found");
  }
  decodeUnchecked(accountName, acc) {
    const discriminator = this.accountDiscriminator(accountName);
    const data = acc.subarray(discriminator.length);
    const layout = this.accountLayouts.get(accountName);
    if (!layout) {
      throw new Error(`Unknown account: ${accountName}`);
    }
    return layout.layout.decode(data);
  }
  memcmp(accountName, appendData) {
    const discriminator = this.accountDiscriminator(accountName);
    return {
      offset: 0,
      bytes: import_bs58.default.encode(appendData ? import_buffer.Buffer.concat([discriminator, appendData]) : discriminator)
    };
  }
  size(accountName) {
    return this.accountDiscriminator(accountName).length + IdlCoder.typeSize({ defined: { name: accountName } }, this.idl);
  }
  /**
   * Get the unique discriminator prepended to all anchor accounts.
   *
   * @param name The name of the account to get the discriminator of.
   */
  accountDiscriminator(name) {
    var _a;
    const account = (_a = this.idl.accounts) === null || _a === void 0 ? void 0 : _a.find((acc) => acc.name === name);
    if (!account) {
      throw new Error(`Account not found: ${name}`);
    }
    return import_buffer.Buffer.from(account.discriminator);
  }
};
var BorshEventCoder = class {
  constructor(idl) {
    if (!idl.events) {
      this.layouts = /* @__PURE__ */ new Map();
      return;
    }
    const types = idl.types;
    if (!types) {
      throw new Error("Events require `idl.types`");
    }
    const layouts = idl.events.map((ev) => {
      const typeDef = types.find((ty) => ty.name === ev.name);
      if (!typeDef) {
        throw new Error(`Event not found: ${ev.name}`);
      }
      return [
        ev.name,
        {
          discriminator: ev.discriminator,
          layout: IdlCoder.typeDefLayout({ typeDef, types })
        }
      ];
    });
    this.layouts = new Map(layouts);
  }
  decode(log) {
    let logArr;
    try {
      logArr = decode(log);
    } catch (e) {
      return null;
    }
    for (const [name, layout] of this.layouts) {
      const givenDisc = logArr.subarray(0, layout.discriminator.length);
      const matches = givenDisc.equals(import_buffer.Buffer.from(layout.discriminator));
      if (matches) {
        return {
          name,
          data: layout.layout.decode(logArr.subarray(givenDisc.length))
        };
      }
    }
    return null;
  }
};
var BorshTypesCoder = class {
  constructor(idl) {
    const types = idl.types;
    if (!types) {
      this.typeLayouts = /* @__PURE__ */ new Map();
      return;
    }
    const layouts = types.filter((ty) => !ty.generics).map((ty) => [
      ty.name,
      IdlCoder.typeDefLayout({ typeDef: ty, types })
    ]);
    this.typeLayouts = new Map(layouts);
  }
  encode(name, type2) {
    const buffer = import_buffer.Buffer.alloc(1e3);
    const layout = this.typeLayouts.get(name);
    if (!layout) {
      throw new Error(`Unknown type: ${name}`);
    }
    const len = layout.encode(type2, buffer);
    return buffer.slice(0, len);
  }
  decode(name, data) {
    const layout = this.typeLayouts.get(name);
    if (!layout) {
      throw new Error(`Unknown type: ${name}`);
    }
    return layout.decode(data);
  }
};
var BorshCoder = class {
  constructor(idl) {
    this.instruction = new BorshInstructionCoder(idl);
    this.accounts = new BorshAccountsCoder(idl);
    this.events = new BorshEventCoder(idl);
    this.types = new BorshTypesCoder(idl);
  }
};
var Layout = class {
  constructor(span, property) {
    if (!Number.isInteger(span)) {
      throw new TypeError("span must be an integer");
    }
    this.span = span;
    this.property = property;
  }
  /** Function to create an Object into which decoded properties will
   * be written.
   *
   * Used only for layouts that {@link Layout#decode|decode} to Object
   * instances, which means:
   * * {@link Structure}
   * * {@link Union}
   * * {@link VariantLayout}
   * * {@link BitStructure}
   *
   * If left undefined the JavaScript representation of these layouts
   * will be Object instances.
   *
   * See {@link bindConstructorLayout}.
   */
  makeDestinationObject() {
    return {};
  }
  /**
   * Decode from a Buffer into an JavaScript value.
   *
   * @param {Buffer} b - the buffer from which encoded data is read.
   *
   * @param {Number} [offset] - the offset at which the encoded data
   * starts.  If absent a zero offset is inferred.
   *
   * @returns {(Number|Array|Object)} - the value of the decoded data.
   *
   * @abstract
   */
  decode(b, offset2) {
    throw new Error("Layout is abstract");
  }
  /**
   * Encode a JavaScript value into a Buffer.
   *
   * @param {(Number|Array|Object)} src - the value to be encoded into
   * the buffer.  The type accepted depends on the (sub-)type of {@link
   * Layout}.
   *
   * @param {Buffer} b - the buffer into which encoded data will be
   * written.
   *
   * @param {Number} [offset] - the offset at which the encoded data
   * starts.  If absent a zero offset is inferred.
   *
   * @returns {Number} - the number of bytes encoded, including the
   * space skipped for internal padding, but excluding data such as
   * {@link Sequence#count|lengths} when stored {@link
   * ExternalLayout|externally}.  This is the adjustment to `offset`
   * producing the offset where data for the next layout would be
   * written.
   *
   * @abstract
   */
  encode(src, b, offset2) {
    throw new Error("Layout is abstract");
  }
  /**
   * Calculate the span of a specific instance of a layout.
   *
   * @param {Buffer} b - the buffer that contains an encoded instance.
   *
   * @param {Number} [offset] - the offset at which the encoded instance
   * starts.  If absent a zero offset is inferred.
   *
   * @return {Number} - the number of bytes covered by the layout
   * instance.  If this method is not overridden in a subclass the
   * definition-time constant {@link Layout#span|span} will be
   * returned.
   *
   * @throws {RangeError} - if the length of the value cannot be
   * determined.
   */
  getSpan(b, offset2) {
    if (0 > this.span) {
      throw new RangeError("indeterminate span");
    }
    return this.span;
  }
  /**
   * Replicate the layout using a new property.
   *
   * This function must be used to get a structurally-equivalent layout
   * with a different name since all {@link Layout} instances are
   * immutable.
   *
   * **NOTE** This is a shallow copy.  All fields except {@link
   * Layout#property|property} are strictly equal to the origin layout.
   *
   * @param {String} property - the value for {@link
   * Layout#property|property} in the replica.
   *
   * @returns {Layout} - the copy with {@link Layout#property|property}
   * set to `property`.
   */
  replicate(property) {
    const rv = Object.create(this.constructor.prototype);
    Object.assign(rv, this);
    rv.property = property;
    return rv;
  }
  /**
   * Create an object from layout properties and an array of values.
   *
   * **NOTE** This function returns `undefined` if invoked on a layout
   * that does not return its value as an Object.  Objects are
   * returned for things that are a {@link Structure}, which includes
   * {@link VariantLayout|variant layouts} if they are structures, and
   * excludes {@link Union}s.  If you want this feature for a union
   * you must use {@link Union.getVariant|getVariant} to select the
   * desired layout.
   *
   * @param {Array} values - an array of values that correspond to the
   * default order for properties.  As with {@link Layout#decode|decode}
   * layout elements that have no property name are skipped when
   * iterating over the array values.  Only the top-level properties are
   * assigned; arguments are not assigned to properties of contained
   * layouts.  Any unused values are ignored.
   *
   * @return {(Object|undefined)}
   */
  fromArray(values) {
    return void 0;
  }
};
var Layout_2 = Layout;
function nameWithProperty(name, lo) {
  if (lo.property) {
    return name + "[" + lo.property + "]";
  }
  return name;
}
var ExternalLayout = class extends Layout {
  /**
   * Return `true` iff the external layout decodes to an unsigned
   * integer layout.
   *
   * In that case it can be used as the source of {@link
   * Sequence#count|Sequence counts}, {@link Blob#length|Blob lengths},
   * or as {@link UnionLayoutDiscriminator#layout|external union
   * discriminators}.
   *
   * @abstract
   */
  isCount() {
    throw new Error("ExternalLayout is abstract");
  }
};
var OffsetLayout = class extends ExternalLayout {
  constructor(layout, offset2, property) {
    if (!(layout instanceof Layout)) {
      throw new TypeError("layout must be a Layout");
    }
    if (void 0 === offset2) {
      offset2 = 0;
    } else if (!Number.isInteger(offset2)) {
      throw new TypeError("offset must be integer or undefined");
    }
    super(layout.span, property || layout.property);
    this.layout = layout;
    this.offset = offset2;
  }
  /** @override */
  isCount() {
    return this.layout instanceof UInt || this.layout instanceof UIntBE;
  }
  /** @override */
  decode(b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    return this.layout.decode(b, offset2 + this.offset);
  }
  /** @override */
  encode(src, b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    return this.layout.encode(src, b, offset2 + this.offset);
  }
};
var UInt = class extends Layout {
  constructor(span, property) {
    super(span, property);
    if (6 < this.span) {
      throw new RangeError("span must not exceed 6 bytes");
    }
  }
  /** @override */
  decode(b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    return b.readUIntLE(offset2, this.span);
  }
  /** @override */
  encode(src, b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    b.writeUIntLE(src, offset2, this.span);
    return this.span;
  }
};
var UIntBE = class extends Layout {
  constructor(span, property) {
    super(span, property);
    if (6 < this.span) {
      throw new RangeError("span must not exceed 6 bytes");
    }
  }
  /** @override */
  decode(b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    return b.readUIntBE(offset2, this.span);
  }
  /** @override */
  encode(src, b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    b.writeUIntBE(src, offset2, this.span);
    return this.span;
  }
};
var V2E32 = Math.pow(2, 32);
function divmodInt64(src) {
  const hi32 = Math.floor(src / V2E32);
  const lo32 = src - hi32 * V2E32;
  return { hi32, lo32 };
}
function roundedInt64(hi32, lo32) {
  return hi32 * V2E32 + lo32;
}
var NearUInt64 = class extends Layout {
  constructor(property) {
    super(8, property);
  }
  /** @override */
  decode(b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    const lo32 = b.readUInt32LE(offset2);
    const hi32 = b.readUInt32LE(offset2 + 4);
    return roundedInt64(hi32, lo32);
  }
  /** @override */
  encode(src, b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    const split = divmodInt64(src);
    b.writeUInt32LE(split.lo32, offset2);
    b.writeUInt32LE(split.hi32, offset2 + 4);
    return 8;
  }
};
var NearInt64 = class extends Layout {
  constructor(property) {
    super(8, property);
  }
  /** @override */
  decode(b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    const lo32 = b.readUInt32LE(offset2);
    const hi32 = b.readInt32LE(offset2 + 4);
    return roundedInt64(hi32, lo32);
  }
  /** @override */
  encode(src, b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    const split = divmodInt64(src);
    b.writeUInt32LE(split.lo32, offset2);
    b.writeInt32LE(split.hi32, offset2 + 4);
    return 8;
  }
};
var Structure = class extends Layout {
  constructor(fields, property, decodePrefixes) {
    if (!(Array.isArray(fields) && fields.reduce((acc, v) => acc && v instanceof Layout, true))) {
      throw new TypeError("fields must be array of Layout instances");
    }
    if ("boolean" === typeof property && void 0 === decodePrefixes) {
      decodePrefixes = property;
      property = void 0;
    }
    for (const fd of fields) {
      if (0 > fd.span && void 0 === fd.property) {
        throw new Error("fields cannot contain unnamed variable-length layout");
      }
    }
    let span = -1;
    try {
      span = fields.reduce((span2, fd) => span2 + fd.getSpan(), 0);
    } catch (e) {
    }
    super(span, property);
    this.fields = fields;
    this.decodePrefixes = !!decodePrefixes;
  }
  /** @override */
  getSpan(b, offset2) {
    if (0 <= this.span) {
      return this.span;
    }
    if (void 0 === offset2) {
      offset2 = 0;
    }
    let span = 0;
    try {
      span = this.fields.reduce((span2, fd) => {
        const fsp = fd.getSpan(b, offset2);
        offset2 += fsp;
        return span2 + fsp;
      }, 0);
    } catch (e) {
      throw new RangeError("indeterminate span");
    }
    return span;
  }
  /** @override */
  decode(b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    const dest = this.makeDestinationObject();
    for (const fd of this.fields) {
      if (void 0 !== fd.property) {
        dest[fd.property] = fd.decode(b, offset2);
      }
      offset2 += fd.getSpan(b, offset2);
      if (this.decodePrefixes && b.length === offset2) {
        break;
      }
    }
    return dest;
  }
  /** Implement {@link Layout#encode|encode} for {@link Structure}.
   *
   * If `src` is missing a property for a member with a defined {@link
   * Layout#property|property} the corresponding region of the buffer is
   * left unmodified. */
  encode(src, b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    const firstOffset = offset2;
    let lastOffset = 0;
    let lastWrote = 0;
    for (const fd of this.fields) {
      let span = fd.span;
      lastWrote = 0 < span ? span : 0;
      if (void 0 !== fd.property) {
        const fv = src[fd.property];
        if (void 0 !== fv) {
          lastWrote = fd.encode(fv, b, offset2);
          if (0 > span) {
            span = fd.getSpan(b, offset2);
          }
        }
      }
      lastOffset = offset2;
      offset2 += span;
    }
    return lastOffset + lastWrote - firstOffset;
  }
  /** @override */
  fromArray(values) {
    const dest = this.makeDestinationObject();
    for (const fd of this.fields) {
      if (void 0 !== fd.property && 0 < values.length) {
        dest[fd.property] = values.shift();
      }
    }
    return dest;
  }
  /**
   * Get access to the layout of a given property.
   *
   * @param {String} property - the structure member of interest.
   *
   * @return {Layout} - the layout associated with `property`, or
   * undefined if there is no such property.
   */
  layoutFor(property) {
    if ("string" !== typeof property) {
      throw new TypeError("property must be string");
    }
    for (const fd of this.fields) {
      if (fd.property === property) {
        return fd;
      }
    }
  }
  /**
   * Get the offset of a structure member.
   *
   * @param {String} property - the structure member of interest.
   *
   * @return {Number} - the offset in bytes to the start of `property`
   * within the structure, or undefined if `property` is not a field
   * within the structure.  If the property is a member but follows a
   * variable-length structure member a negative number will be
   * returned.
   */
  offsetOf(property) {
    if ("string" !== typeof property) {
      throw new TypeError("property must be string");
    }
    let offset2 = 0;
    for (const fd of this.fields) {
      if (fd.property === property) {
        return offset2;
      }
      if (0 > fd.span) {
        offset2 = -1;
      } else if (0 <= offset2) {
        offset2 += fd.span;
      }
    }
  }
};
var UnionDiscriminator = class {
  constructor(property) {
    this.property = property;
  }
  /** Analog to {@link Layout#decode|Layout decode} for union discriminators.
   *
   * The implementation of this method need not reference the buffer if
   * variant information is available through other means. */
  decode() {
    throw new Error("UnionDiscriminator is abstract");
  }
  /** Analog to {@link Layout#decode|Layout encode} for union discriminators.
   *
   * The implementation of this method need not store the value if
   * variant information is maintained through other means. */
  encode() {
    throw new Error("UnionDiscriminator is abstract");
  }
};
var UnionLayoutDiscriminator = class extends UnionDiscriminator {
  constructor(layout, property) {
    if (!(layout instanceof ExternalLayout && layout.isCount())) {
      throw new TypeError("layout must be an unsigned integer ExternalLayout");
    }
    super(property || layout.property || "variant");
    this.layout = layout;
  }
  /** Delegate decoding to {@link UnionLayoutDiscriminator#layout|layout}. */
  decode(b, offset2) {
    return this.layout.decode(b, offset2);
  }
  /** Delegate encoding to {@link UnionLayoutDiscriminator#layout|layout}. */
  encode(src, b, offset2) {
    return this.layout.encode(src, b, offset2);
  }
};
var Union = class extends Layout {
  constructor(discr, defaultLayout, property) {
    const upv = discr instanceof UInt || discr instanceof UIntBE;
    if (upv) {
      discr = new UnionLayoutDiscriminator(new OffsetLayout(discr));
    } else if (discr instanceof ExternalLayout && discr.isCount()) {
      discr = new UnionLayoutDiscriminator(discr);
    } else if (!(discr instanceof UnionDiscriminator)) {
      throw new TypeError("discr must be a UnionDiscriminator or an unsigned integer layout");
    }
    if (void 0 === defaultLayout) {
      defaultLayout = null;
    }
    if (!(null === defaultLayout || defaultLayout instanceof Layout)) {
      throw new TypeError("defaultLayout must be null or a Layout");
    }
    if (null !== defaultLayout) {
      if (0 > defaultLayout.span) {
        throw new Error("defaultLayout must have constant span");
      }
      if (void 0 === defaultLayout.property) {
        defaultLayout = defaultLayout.replicate("content");
      }
    }
    let span = -1;
    if (defaultLayout) {
      span = defaultLayout.span;
      if (0 <= span && upv) {
        span += discr.layout.span;
      }
    }
    super(span, property);
    this.discriminator = discr;
    this.usesPrefixDiscriminator = upv;
    this.defaultLayout = defaultLayout;
    this.registry = {};
    let boundGetSourceVariant = this.defaultGetSourceVariant.bind(this);
    this.getSourceVariant = function(src) {
      return boundGetSourceVariant(src);
    };
    this.configGetSourceVariant = function(gsv) {
      boundGetSourceVariant = gsv.bind(this);
    };
  }
  /** @override */
  getSpan(b, offset2) {
    if (0 <= this.span) {
      return this.span;
    }
    if (void 0 === offset2) {
      offset2 = 0;
    }
    const vlo = this.getVariant(b, offset2);
    if (!vlo) {
      throw new Error("unable to determine span for unrecognized variant");
    }
    return vlo.getSpan(b, offset2);
  }
  /**
   * Method to infer a registered Union variant compatible with `src`.
   *
   * The first satisified rule in the following sequence defines the
   * return value:
   * * If `src` has properties matching the Union discriminator and
   *   the default layout, `undefined` is returned regardless of the
   *   value of the discriminator property (this ensures the default
   *   layout will be used);
   * * If `src` has a property matching the Union discriminator, the
   *   value of the discriminator identifies a registered variant, and
   *   either (a) the variant has no layout, or (b) `src` has the
   *   variant's property, then the variant is returned (because the
   *   source satisfies the constraints of the variant it identifies);
   * * If `src` does not have a property matching the Union
   *   discriminator, but does have a property matching a registered
   *   variant, then the variant is returned (because the source
   *   matches a variant without an explicit conflict);
   * * An error is thrown (because we either can't identify a variant,
   *   or we were explicitly told the variant but can't satisfy it).
   *
   * @param {Object} src - an object presumed to be compatible with
   * the content of the Union.
   *
   * @return {(undefined|VariantLayout)} - as described above.
   *
   * @throws {Error} - if `src` cannot be associated with a default or
   * registered variant.
   */
  defaultGetSourceVariant(src) {
    if (src.hasOwnProperty(this.discriminator.property)) {
      if (this.defaultLayout && src.hasOwnProperty(this.defaultLayout.property)) {
        return void 0;
      }
      const vlo = this.registry[src[this.discriminator.property]];
      if (vlo && (!vlo.layout || src.hasOwnProperty(vlo.property))) {
        return vlo;
      }
    } else {
      for (const tag in this.registry) {
        const vlo = this.registry[tag];
        if (src.hasOwnProperty(vlo.property)) {
          return vlo;
        }
      }
    }
    throw new Error("unable to infer src variant");
  }
  /** Implement {@link Layout#decode|decode} for {@link Union}.
   *
   * If the variant is {@link Union#addVariant|registered} the return
   * value is an instance of that variant, with no explicit
   * discriminator.  Otherwise the {@link Union#defaultLayout|default
   * layout} is used to decode the content. */
  decode(b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    let dest;
    const dlo = this.discriminator;
    const discr = dlo.decode(b, offset2);
    let clo = this.registry[discr];
    if (void 0 === clo) {
      let contentOffset = 0;
      clo = this.defaultLayout;
      if (this.usesPrefixDiscriminator) {
        contentOffset = dlo.layout.span;
      }
      dest = this.makeDestinationObject();
      dest[dlo.property] = discr;
      dest[clo.property] = this.defaultLayout.decode(b, offset2 + contentOffset);
    } else {
      dest = clo.decode(b, offset2);
    }
    return dest;
  }
  /** Implement {@link Layout#encode|encode} for {@link Union}.
   *
   * This API assumes the `src` object is consistent with the union's
   * {@link Union#defaultLayout|default layout}.  To encode variants
   * use the appropriate variant-specific {@link VariantLayout#encode}
   * method. */
  encode(src, b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    const vlo = this.getSourceVariant(src);
    if (void 0 === vlo) {
      const dlo = this.discriminator;
      const clo = this.defaultLayout;
      let contentOffset = 0;
      if (this.usesPrefixDiscriminator) {
        contentOffset = dlo.layout.span;
      }
      dlo.encode(src[dlo.property], b, offset2);
      return contentOffset + clo.encode(
        src[clo.property],
        b,
        offset2 + contentOffset
      );
    }
    return vlo.encode(src, b, offset2);
  }
  /** Register a new variant structure within a union.  The newly
   * created variant is returned.
   *
   * @param {Number} variant - initializer for {@link
   * VariantLayout#variant|variant}.
   *
   * @param {Layout} layout - initializer for {@link
   * VariantLayout#layout|layout}.
   *
   * @param {String} property - initializer for {@link
   * Layout#property|property}.
   *
   * @return {VariantLayout} */
  addVariant(variant, layout, property) {
    const rv = new VariantLayout(this, variant, layout, property);
    this.registry[variant] = rv;
    return rv;
  }
  /**
   * Get the layout associated with a registered variant.
   *
   * If `vb` does not produce a registered variant the function returns
   * `undefined`.
   *
   * @param {(Number|Buffer)} vb - either the variant number, or a
   * buffer from which the discriminator is to be read.
   *
   * @param {Number} offset - offset into `vb` for the start of the
   * union.  Used only when `vb` is an instance of {Buffer}.
   *
   * @return {({VariantLayout}|undefined)}
   */
  getVariant(vb, offset2) {
    let variant = vb;
    if (Buffer.isBuffer(vb)) {
      if (void 0 === offset2) {
        offset2 = 0;
      }
      variant = this.discriminator.decode(vb, offset2);
    }
    return this.registry[variant];
  }
};
var VariantLayout = class extends Layout {
  constructor(union2, variant, layout, property) {
    if (!(union2 instanceof Union)) {
      throw new TypeError("union must be a Union");
    }
    if (!Number.isInteger(variant) || 0 > variant) {
      throw new TypeError("variant must be a (non-negative) integer");
    }
    if ("string" === typeof layout && void 0 === property) {
      property = layout;
      layout = null;
    }
    if (layout) {
      if (!(layout instanceof Layout)) {
        throw new TypeError("layout must be a Layout");
      }
      if (null !== union2.defaultLayout && 0 <= layout.span && layout.span > union2.defaultLayout.span) {
        throw new Error("variant span exceeds span of containing union");
      }
      if ("string" !== typeof property) {
        throw new TypeError("variant must have a String property");
      }
    }
    let span = union2.span;
    if (0 > union2.span) {
      span = layout ? layout.span : 0;
      if (0 <= span && union2.usesPrefixDiscriminator) {
        span += union2.discriminator.layout.span;
      }
    }
    super(span, property);
    this.union = union2;
    this.variant = variant;
    this.layout = layout || null;
  }
  /** @override */
  getSpan(b, offset2) {
    if (0 <= this.span) {
      return this.span;
    }
    if (void 0 === offset2) {
      offset2 = 0;
    }
    let contentOffset = 0;
    if (this.union.usesPrefixDiscriminator) {
      contentOffset = this.union.discriminator.layout.span;
    }
    return contentOffset + this.layout.getSpan(b, offset2 + contentOffset);
  }
  /** @override */
  decode(b, offset2) {
    const dest = this.makeDestinationObject();
    if (void 0 === offset2) {
      offset2 = 0;
    }
    if (this !== this.union.getVariant(b, offset2)) {
      throw new Error("variant mismatch");
    }
    let contentOffset = 0;
    if (this.union.usesPrefixDiscriminator) {
      contentOffset = this.union.discriminator.layout.span;
    }
    if (this.layout) {
      dest[this.property] = this.layout.decode(b, offset2 + contentOffset);
    } else if (this.property) {
      dest[this.property] = true;
    } else if (this.union.usesPrefixDiscriminator) {
      dest[this.union.discriminator.property] = this.variant;
    }
    return dest;
  }
  /** @override */
  encode(src, b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    let contentOffset = 0;
    if (this.union.usesPrefixDiscriminator) {
      contentOffset = this.union.discriminator.layout.span;
    }
    if (this.layout && !src.hasOwnProperty(this.property)) {
      throw new TypeError("variant lacks property " + this.property);
    }
    this.union.discriminator.encode(this.variant, b, offset2);
    let span = contentOffset;
    if (this.layout) {
      this.layout.encode(src[this.property], b, offset2 + contentOffset);
      span += this.layout.getSpan(b, offset2 + contentOffset);
      if (0 <= this.union.span && span > this.union.span) {
        throw new Error("encoded variant overruns containing union");
      }
    }
    return span;
  }
  /** Delegate {@link Layout#fromArray|fromArray} to {@link
   * VariantLayout#layout|layout}. */
  fromArray(values) {
    if (this.layout) {
      return this.layout.fromArray(values);
    }
  }
};
var Blob$1 = class extends Layout {
  constructor(length, property) {
    if (!(length instanceof ExternalLayout && length.isCount() || Number.isInteger(length) && 0 <= length)) {
      throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");
    }
    let span = -1;
    if (!(length instanceof ExternalLayout)) {
      span = length;
    }
    super(span, property);
    this.length = length;
  }
  /** @override */
  getSpan(b, offset2) {
    let span = this.span;
    if (0 > span) {
      span = this.length.decode(b, offset2);
    }
    return span;
  }
  /** @override */
  decode(b, offset2) {
    if (void 0 === offset2) {
      offset2 = 0;
    }
    let span = this.span;
    if (0 > span) {
      span = this.length.decode(b, offset2);
    }
    return b.slice(offset2, offset2 + span);
  }
  /** Implement {@link Layout#encode|encode} for {@link Blob}.
   *
   * **NOTE** If {@link Layout#count|count} is an instance of {@link
   * ExternalLayout} then the length of `src` will be encoded as the
   * count after `src` is encoded. */
  encode(src, b, offset2) {
    let span = this.length;
    if (this.length instanceof ExternalLayout) {
      span = src.length;
    }
    if (!(Buffer.isBuffer(src) && span === src.length)) {
      throw new TypeError(nameWithProperty("Blob.encode", this) + " requires (length " + span + ") Buffer as src");
    }
    if (offset2 + span > b.length) {
      throw new RangeError("encoding overruns Buffer");
    }
    b.write(src.toString("hex"), offset2, span, "hex");
    if (this.length instanceof ExternalLayout) {
      this.length.encode(span, b, offset2);
    }
    return span;
  }
};
var offset = (layout, offset2, property) => new OffsetLayout(layout, offset2, property);
var u82 = (property) => new UInt(1, property);
var u322 = (property) => new UInt(4, property);
var nu64 = (property) => new NearUInt64(property);
var ns64 = (property) => new NearInt64(property);
var struct2 = (fields, property, decodePrefixes) => new Structure(fields, property, decodePrefixes);
var union = (discr, defaultLayout, property) => new Union(discr, defaultLayout, property);
var blob = (length, property) => new Blob$1(length, property);
var RustStringLayout = class extends Layout_2 {
  constructor(property) {
    super(-1, property);
    this.property = property;
    this.layout = struct2([
      u322("length"),
      u322("lengthPadding"),
      blob(offset(u322(), -8), "chars")
    ], this.property);
  }
  encode(src, b, offset2 = 0) {
    if (src === null || src === void 0) {
      return this.layout.span;
    }
    const data = {
      chars: Buffer.from(src, "utf8")
    };
    return this.layout.encode(data, b, offset2);
  }
  decode(b, offset2 = 0) {
    const data = this.layout.decode(b, offset2);
    return data["chars"].toString();
  }
  getSpan(b, offset2 = 0) {
    return u322().span + u322().span + new import_bn2.default(new Uint8Array(b).slice(offset2, offset2 + 4), 10, "le").toNumber();
  }
};
function rustStringLayout(property) {
  return new RustStringLayout(property);
}
function publicKey$2(property) {
  return blob(32, property);
}
var LAYOUT = union(u322("instruction"));
LAYOUT.addVariant(0, struct2([
  ns64("lamports"),
  ns64("space"),
  publicKey$2("owner")
]), "createAccount");
LAYOUT.addVariant(1, struct2([publicKey$2("owner")]), "assign");
LAYOUT.addVariant(2, struct2([ns64("lamports")]), "transfer");
LAYOUT.addVariant(3, struct2([
  publicKey$2("base"),
  rustStringLayout("seed"),
  ns64("lamports"),
  ns64("space"),
  publicKey$2("owner")
]), "createAccountWithSeed");
LAYOUT.addVariant(4, struct2([publicKey$2("authorized")]), "advanceNonceAccount");
LAYOUT.addVariant(5, struct2([ns64("lamports")]), "withdrawNonceAccount");
LAYOUT.addVariant(6, struct2([publicKey$2("authorized")]), "initializeNonceAccount");
LAYOUT.addVariant(7, struct2([publicKey$2("authorized")]), "authorizeNonceAccount");
LAYOUT.addVariant(8, struct2([ns64("space")]), "allocate");
LAYOUT.addVariant(9, struct2([
  publicKey$2("base"),
  rustStringLayout("seed"),
  ns64("space"),
  publicKey$2("owner")
]), "allocateWithSeed");
LAYOUT.addVariant(10, struct2([
  publicKey$2("base"),
  rustStringLayout("seed"),
  publicKey$2("owner")
]), "assignWithSeed");
LAYOUT.addVariant(11, struct2([
  ns64("lamports"),
  rustStringLayout("seed"),
  publicKey$2("owner")
]), "transferWithSeed");
var instructionMaxSpan = Math.max(...Object.values(LAYOUT.registry).map((r) => r.span));
var WrappedLayout$1 = class extends Layout_2 {
  constructor(layout, decoder, encoder, property) {
    super(layout.span, property);
    this.layout = layout;
    this.decoder = decoder;
    this.encoder = encoder;
  }
  decode(b, offset2) {
    return this.decoder(this.layout.decode(b, offset2));
  }
  encode(src, b, offset2) {
    return this.layout.encode(this.encoder(src), b, offset2);
  }
  getSpan(b, offset2) {
    return this.layout.getSpan(b, offset2);
  }
};
function publicKey$1(property) {
  return new WrappedLayout$1(blob(32), (b) => new import_web33.PublicKey(b), (key) => key.toBuffer(), property);
}
var NONCE_ACCOUNT_LAYOUT = struct2([
  u322("version"),
  u322("state"),
  publicKey$1("authorizedPubkey"),
  publicKey$1("nonce"),
  struct2([nu64("lamportsPerSignature")], "feeCalculator")
]);
var TOKEN_PROGRAM_ID = new import_web33.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
var ASSOCIATED_PROGRAM_ID = new import_web33.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
var browserPonyfill = { exports: {} };
(function(module2, exports) {
  var global2 = typeof self !== "undefined" ? self : commonjsGlobal;
  var __self__ = function() {
    function F() {
      this.fetch = false;
      this.DOMException = global2.DOMException;
    }
    F.prototype = global2;
    return new F();
  }();
  (function(self2) {
    (function(exports2) {
      var support = {
        searchParams: "URLSearchParams" in self2,
        iterable: "Symbol" in self2 && "iterator" in Symbol,
        blob: "FileReader" in self2 && "Blob" in self2 && function() {
          try {
            new Blob();
            return true;
          } catch (e) {
            return false;
          }
        }(),
        formData: "FormData" in self2,
        arrayBuffer: "ArrayBuffer" in self2
      };
      function isDataView(obj) {
        return obj && DataView.prototype.isPrototypeOf(obj);
      }
      if (support.arrayBuffer) {
        var viewClasses = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ];
        var isArrayBufferView = ArrayBuffer.isView || function(obj) {
          return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
        };
      }
      function normalizeName(name) {
        if (typeof name !== "string") {
          name = String(name);
        }
        if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
          throw new TypeError("Invalid character in header field name");
        }
        return name.toLowerCase();
      }
      function normalizeValue(value) {
        if (typeof value !== "string") {
          value = String(value);
        }
        return value;
      }
      function iteratorFor(items) {
        var iterator = {
          next: function() {
            var value = items.shift();
            return { done: value === void 0, value };
          }
        };
        if (support.iterable) {
          iterator[Symbol.iterator] = function() {
            return iterator;
          };
        }
        return iterator;
      }
      function Headers(headers) {
        this.map = {};
        if (headers instanceof Headers) {
          headers.forEach(function(value, name) {
            this.append(name, value);
          }, this);
        } else if (Array.isArray(headers)) {
          headers.forEach(function(header) {
            this.append(header[0], header[1]);
          }, this);
        } else if (headers) {
          Object.getOwnPropertyNames(headers).forEach(function(name) {
            this.append(name, headers[name]);
          }, this);
        }
      }
      Headers.prototype.append = function(name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var oldValue = this.map[name];
        this.map[name] = oldValue ? oldValue + ", " + value : value;
      };
      Headers.prototype["delete"] = function(name) {
        delete this.map[normalizeName(name)];
      };
      Headers.prototype.get = function(name) {
        name = normalizeName(name);
        return this.has(name) ? this.map[name] : null;
      };
      Headers.prototype.has = function(name) {
        return this.map.hasOwnProperty(normalizeName(name));
      };
      Headers.prototype.set = function(name, value) {
        this.map[normalizeName(name)] = normalizeValue(value);
      };
      Headers.prototype.forEach = function(callback, thisArg) {
        for (var name in this.map) {
          if (this.map.hasOwnProperty(name)) {
            callback.call(thisArg, this.map[name], name, this);
          }
        }
      };
      Headers.prototype.keys = function() {
        var items = [];
        this.forEach(function(value, name) {
          items.push(name);
        });
        return iteratorFor(items);
      };
      Headers.prototype.values = function() {
        var items = [];
        this.forEach(function(value) {
          items.push(value);
        });
        return iteratorFor(items);
      };
      Headers.prototype.entries = function() {
        var items = [];
        this.forEach(function(value, name) {
          items.push([name, value]);
        });
        return iteratorFor(items);
      };
      if (support.iterable) {
        Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
      }
      function consumed(body) {
        if (body.bodyUsed) {
          return Promise.reject(new TypeError("Already read"));
        }
        body.bodyUsed = true;
      }
      function fileReaderReady(reader) {
        return new Promise(function(resolve, reject) {
          reader.onload = function() {
            resolve(reader.result);
          };
          reader.onerror = function() {
            reject(reader.error);
          };
        });
      }
      function readBlobAsArrayBuffer(blob2) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsArrayBuffer(blob2);
        return promise;
      }
      function readBlobAsText(blob2) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsText(blob2);
        return promise;
      }
      function readArrayBufferAsText(buf) {
        var view = new Uint8Array(buf);
        var chars = new Array(view.length);
        for (var i = 0; i < view.length; i++) {
          chars[i] = String.fromCharCode(view[i]);
        }
        return chars.join("");
      }
      function bufferClone(buf) {
        if (buf.slice) {
          return buf.slice(0);
        } else {
          var view = new Uint8Array(buf.byteLength);
          view.set(new Uint8Array(buf));
          return view.buffer;
        }
      }
      function Body() {
        this.bodyUsed = false;
        this._initBody = function(body) {
          this._bodyInit = body;
          if (!body) {
            this._bodyText = "";
          } else if (typeof body === "string") {
            this._bodyText = body;
          } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body;
          } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body;
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this._bodyText = body.toString();
          } else if (support.arrayBuffer && support.blob && isDataView(body)) {
            this._bodyArrayBuffer = bufferClone(body.buffer);
            this._bodyInit = new Blob([this._bodyArrayBuffer]);
          } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
            this._bodyArrayBuffer = bufferClone(body);
          } else {
            this._bodyText = body = Object.prototype.toString.call(body);
          }
          if (!this.headers.get("content-type")) {
            if (typeof body === "string") {
              this.headers.set("content-type", "text/plain;charset=UTF-8");
            } else if (this._bodyBlob && this._bodyBlob.type) {
              this.headers.set("content-type", this._bodyBlob.type);
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
            }
          }
        };
        if (support.blob) {
          this.blob = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return Promise.resolve(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as blob");
            } else {
              return Promise.resolve(new Blob([this._bodyText]));
            }
          };
          this.arrayBuffer = function() {
            if (this._bodyArrayBuffer) {
              return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
            } else {
              return this.blob().then(readBlobAsArrayBuffer);
            }
          };
        }
        this.text = function() {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }
          if (this._bodyBlob) {
            return readBlobAsText(this._bodyBlob);
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
          } else if (this._bodyFormData) {
            throw new Error("could not read FormData body as text");
          } else {
            return Promise.resolve(this._bodyText);
          }
        };
        if (support.formData) {
          this.formData = function() {
            return this.text().then(decode2);
          };
        }
        this.json = function() {
          return this.text().then(JSON.parse);
        };
        return this;
      }
      var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return methods.indexOf(upcased) > -1 ? upcased : method;
      }
      function Request(input, options) {
        options = options || {};
        var body = options.body;
        if (input instanceof Request) {
          if (input.bodyUsed) {
            throw new TypeError("Already read");
          }
          this.url = input.url;
          this.credentials = input.credentials;
          if (!options.headers) {
            this.headers = new Headers(input.headers);
          }
          this.method = input.method;
          this.mode = input.mode;
          this.signal = input.signal;
          if (!body && input._bodyInit != null) {
            body = input._bodyInit;
            input.bodyUsed = true;
          }
        } else {
          this.url = String(input);
        }
        this.credentials = options.credentials || this.credentials || "same-origin";
        if (options.headers || !this.headers) {
          this.headers = new Headers(options.headers);
        }
        this.method = normalizeMethod(options.method || this.method || "GET");
        this.mode = options.mode || this.mode || null;
        this.signal = options.signal || this.signal;
        this.referrer = null;
        if ((this.method === "GET" || this.method === "HEAD") && body) {
          throw new TypeError("Body not allowed for GET or HEAD requests");
        }
        this._initBody(body);
      }
      Request.prototype.clone = function() {
        return new Request(this, { body: this._bodyInit });
      };
      function decode2(body) {
        var form = new FormData();
        body.trim().split("&").forEach(function(bytes) {
          if (bytes) {
            var split = bytes.split("=");
            var name = split.shift().replace(/\+/g, " ");
            var value = split.join("=").replace(/\+/g, " ");
            form.append(decodeURIComponent(name), decodeURIComponent(value));
          }
        });
        return form;
      }
      function parseHeaders(rawHeaders) {
        var headers = new Headers();
        var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
        preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
          var parts = line.split(":");
          var key = parts.shift().trim();
          if (key) {
            var value = parts.join(":").trim();
            headers.append(key, value);
          }
        });
        return headers;
      }
      Body.call(Request.prototype);
      function Response(bodyInit, options) {
        if (!options) {
          options = {};
        }
        this.type = "default";
        this.status = options.status === void 0 ? 200 : options.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = "statusText" in options ? options.statusText : "OK";
        this.headers = new Headers(options.headers);
        this.url = options.url || "";
        this._initBody(bodyInit);
      }
      Body.call(Response.prototype);
      Response.prototype.clone = function() {
        return new Response(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Headers(this.headers),
          url: this.url
        });
      };
      Response.error = function() {
        var response = new Response(null, { status: 0, statusText: "" });
        response.type = "error";
        return response;
      };
      var redirectStatuses = [301, 302, 303, 307, 308];
      Response.redirect = function(url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
          throw new RangeError("Invalid status code");
        }
        return new Response(null, { status, headers: { location: url } });
      };
      exports2.DOMException = self2.DOMException;
      try {
        new exports2.DOMException();
      } catch (err2) {
        exports2.DOMException = function(message, name) {
          this.message = message;
          this.name = name;
          var error = Error(message);
          this.stack = error.stack;
        };
        exports2.DOMException.prototype = Object.create(Error.prototype);
        exports2.DOMException.prototype.constructor = exports2.DOMException;
      }
      function fetch2(input, init) {
        return new Promise(function(resolve, reject) {
          var request = new Request(input, init);
          if (request.signal && request.signal.aborted) {
            return reject(new exports2.DOMException("Aborted", "AbortError"));
          }
          var xhr = new XMLHttpRequest();
          function abortXhr() {
            xhr.abort();
          }
          xhr.onload = function() {
            var options = {
              status: xhr.status,
              statusText: xhr.statusText,
              headers: parseHeaders(xhr.getAllResponseHeaders() || "")
            };
            options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
            var body = "response" in xhr ? xhr.response : xhr.responseText;
            resolve(new Response(body, options));
          };
          xhr.onerror = function() {
            reject(new TypeError("Network request failed"));
          };
          xhr.ontimeout = function() {
            reject(new TypeError("Network request failed"));
          };
          xhr.onabort = function() {
            reject(new exports2.DOMException("Aborted", "AbortError"));
          };
          xhr.open(request.method, request.url, true);
          if (request.credentials === "include") {
            xhr.withCredentials = true;
          } else if (request.credentials === "omit") {
            xhr.withCredentials = false;
          }
          if ("responseType" in xhr && support.blob) {
            xhr.responseType = "blob";
          }
          request.headers.forEach(function(value, name) {
            xhr.setRequestHeader(name, value);
          });
          if (request.signal) {
            request.signal.addEventListener("abort", abortXhr);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                request.signal.removeEventListener("abort", abortXhr);
              }
            };
          }
          xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
        });
      }
      fetch2.polyfill = true;
      if (!self2.fetch) {
        self2.fetch = fetch2;
        self2.Headers = Headers;
        self2.Request = Request;
        self2.Response = Response;
      }
      exports2.Headers = Headers;
      exports2.Request = Request;
      exports2.Response = Response;
      exports2.fetch = fetch2;
      Object.defineProperty(exports2, "__esModule", { value: true });
      return exports2;
    })({});
  })(__self__);
  __self__.fetch.ponyfill = true;
  delete __self__.fetch.polyfill;
  var ctx = __self__;
  exports = ctx.fetch;
  exports.default = ctx.fetch;
  exports.fetch = ctx.fetch;
  exports.Headers = ctx.Headers;
  exports.Request = ctx.Request;
  exports.Response = ctx.Response;
  module2.exports = exports;
})(browserPonyfill, browserPonyfill.exports);
var fetch = /* @__PURE__ */ getDefaultExportFromCjs(browserPonyfill.exports);
var UPGRADEABLE_LOADER_STATE_LAYOUT = borsh.rustEnum([
  borsh.struct([], "uninitialized"),
  borsh.struct([borsh.option(borsh.publicKey(), "authorityAddress")], "buffer"),
  borsh.struct([borsh.publicKey("programdataAddress")], "program"),
  borsh.struct([
    borsh.u64("slot"),
    borsh.option(borsh.publicKey(), "upgradeAuthorityAddress")
  ], "programData")
], void 0, borsh.u32());
var PROGRAM_LOG = "Program log: ";
var PROGRAM_DATA = "Program data: ";
var PROGRAM_LOG_START_INDEX = PROGRAM_LOG.length;
var PROGRAM_DATA_START_INDEX = PROGRAM_DATA.length;
var EventManager = class {
  constructor(programId, provider, coder) {
    this._programId = programId;
    this._provider = provider;
    this._eventParser = new EventParser(programId, coder);
    this._eventCallbacks = /* @__PURE__ */ new Map();
    this._eventListeners = /* @__PURE__ */ new Map();
    this._listenerIdCount = 0;
  }
  addEventListener(eventName, callback, commitment) {
    var _a;
    let listener = this._listenerIdCount;
    this._listenerIdCount += 1;
    if (!this._eventListeners.has(eventName)) {
      this._eventListeners.set(eventName, []);
    }
    this._eventListeners.set(eventName, ((_a = this._eventListeners.get(eventName)) !== null && _a !== void 0 ? _a : []).concat(listener));
    this._eventCallbacks.set(listener, [eventName, callback]);
    if (this._onLogsSubscriptionId !== void 0) {
      return listener;
    }
    this._onLogsSubscriptionId = this._provider.connection.onLogs(this._programId, (logs, ctx) => {
      if (logs.err) {
        return;
      }
      for (const event of this._eventParser.parseLogs(logs.logs)) {
        const allListeners = this._eventListeners.get(event.name);
        if (allListeners) {
          allListeners.forEach((listener2) => {
            const listenerCb = this._eventCallbacks.get(listener2);
            if (listenerCb) {
              const [, callback2] = listenerCb;
              callback2(event.data, ctx.slot, logs.signature);
            }
          });
        }
      }
    }, commitment);
    return listener;
  }
  async removeEventListener(listener) {
    const callback = this._eventCallbacks.get(listener);
    if (!callback) {
      throw new Error(`Event listener ${listener} doesn't exist!`);
    }
    const [eventName] = callback;
    let listeners = this._eventListeners.get(eventName);
    if (!listeners) {
      throw new Error(`Event listeners don't exist for ${eventName}!`);
    }
    this._eventCallbacks.delete(listener);
    listeners = listeners.filter((l) => l !== listener);
    this._eventListeners.set(eventName, listeners);
    if (listeners.length === 0) {
      this._eventListeners.delete(eventName);
    }
    if (this._eventCallbacks.size === 0) {
      if (this._eventListeners.size !== 0) {
        throw new Error(`Expected event listeners size to be 0 but got ${this._eventListeners.size}`);
      }
      if (this._onLogsSubscriptionId !== void 0) {
        await this._provider.connection.removeOnLogsListener(this._onLogsSubscriptionId);
        this._onLogsSubscriptionId = void 0;
      }
    }
  }
};
var EventParser = class {
  constructor(programId, coder) {
    this.coder = coder;
    this.programId = programId;
  }
  // Each log given, represents an array of messages emitted by
  // a single transaction, which can execute many different programs across
  // CPI boundaries. However, the subscription is only interested in the
  // events emitted by *this* program. In achieving this, we keep track of the
  // program execution context by parsing each log and looking for a CPI
  // `invoke` call. If one exists, we know a new program is executing. So we
  // push the programId onto a stack and switch the program context. This
  // allows us to track, for a given log, which program was executing during
  // its emission, thereby allowing us to know if a given log event was
  // emitted by *this* program. If it was, then we parse the raw string and
  // emit the event if the string matches the event being subscribed to.
  *parseLogs(logs, errorOnDecodeFailure = false) {
    const logScanner = new LogScanner(logs);
    const execution = new ExecutionContext();
    let log = logScanner.next();
    while (log !== null) {
      let [event, newProgram, didPop] = this.handleLog(execution, log, errorOnDecodeFailure);
      if (event) {
        yield event;
      }
      if (newProgram) {
        execution.push(newProgram);
      }
      if (didPop) {
        execution.pop();
      }
      log = logScanner.next();
    }
  }
  // Main log handler. Returns a three element array of the event, the
  // next program that was invoked for CPI, and a boolean indicating if
  // a program has completed execution (and thus should be popped off the
  // execution stack).
  handleLog(execution, log, errorOnDecodeFailure) {
    if (execution.stack.length > 0 && execution.program() === this.programId.toString()) {
      return this.handleProgramLog(log, errorOnDecodeFailure);
    } else {
      return [null, ...this.handleSystemLog(log)];
    }
  }
  // Handles logs from *this* program.
  handleProgramLog(log, errorOnDecodeFailure) {
    if (log.startsWith(PROGRAM_LOG) || log.startsWith(PROGRAM_DATA)) {
      const logStr = log.startsWith(PROGRAM_LOG) ? log.slice(PROGRAM_LOG_START_INDEX) : log.slice(PROGRAM_DATA_START_INDEX);
      const event = this.coder.events.decode(logStr);
      if (errorOnDecodeFailure && event === null) {
        throw new Error(`Unable to decode event ${logStr}`);
      }
      return [event, null, false];
    } else {
      return [null, ...this.handleSystemLog(log)];
    }
  }
  // Handles logs when the current program being executing is *not* this.
  handleSystemLog(log) {
    const logStart = log.split(":")[0];
    if (logStart.match(/^Program (.*) success/g) !== null) {
      return [null, true];
    } else if (logStart.startsWith(`Program ${this.programId.toString()} invoke`)) {
      return [this.programId.toString(), false];
    } else if (logStart.includes("invoke")) {
      return ["cpi", false];
    } else {
      return [null, false];
    }
  }
};
var ExecutionContext = class {
  constructor() {
    this.stack = [];
  }
  program() {
    if (!this.stack.length) {
      throw new Error("Expected the stack to have elements");
    }
    return this.stack[this.stack.length - 1];
  }
  push(newProgram) {
    this.stack.push(newProgram);
  }
  pop() {
    if (!this.stack.length) {
      throw new Error("Expected the stack to have elements");
    }
    this.stack.pop();
  }
};
var LogScanner = class {
  constructor(logs) {
    this.logs = logs;
  }
  next() {
    if (this.logs.length === 0) {
      return null;
    }
    let l = this.logs[0];
    this.logs = this.logs.slice(1);
    return l;
  }
};
function splitArgsAndCtx(idlIx, args) {
  var _a, _b;
  let options = {};
  const inputLen = idlIx.args ? idlIx.args.length : 0;
  if (args.length > inputLen) {
    if (args.length !== inputLen + 1) {
      throw new Error(`provided too many arguments ${args} to instruction ${idlIx === null || idlIx === void 0 ? void 0 : idlIx.name} expecting: ${(_b = (_a = idlIx.args) === null || _a === void 0 ? void 0 : _a.map((a) => a.name)) !== null && _b !== void 0 ? _b : []}`);
    }
    options = args.pop();
  }
  return [args, options];
}
var InstructionNamespaceFactory = class _InstructionNamespaceFactory {
  static build(idlIx, encodeFn, programId) {
    if (idlIx.name === "_inner") {
      throw new IdlError("the _inner name is reserved");
    }
    const ix = (...args) => {
      const [ixArgs, ctx] = splitArgsAndCtx(idlIx, [...args]);
      validateAccounts(idlIx.accounts, ctx.accounts);
      validateInstruction(idlIx, ...args);
      const keys = ix.accounts(ctx.accounts);
      if (ctx.remainingAccounts !== void 0) {
        keys.push(...ctx.remainingAccounts);
      }
      if (isSet("debug-logs")) {
        console.log("Outgoing account metas:", keys);
      }
      return new import_web33.TransactionInstruction({
        keys,
        programId,
        data: encodeFn(idlIx.name, toInstruction(idlIx, ...ixArgs))
      });
    };
    ix["accounts"] = (accs) => {
      return _InstructionNamespaceFactory.accountsArray(accs, idlIx.accounts, programId, idlIx.name);
    };
    return ix;
  }
  static accountsArray(ctx, accounts, programId, ixName) {
    if (!ctx) {
      return [];
    }
    return accounts.map((acc) => {
      if (isCompositeAccounts(acc)) {
        const rpcAccs = ctx[acc.name];
        return _InstructionNamespaceFactory.accountsArray(rpcAccs, acc.accounts, programId, ixName).flat();
      }
      let pubkey;
      try {
        pubkey = translateAddress(ctx[acc.name]);
      } catch (err2) {
        throw new Error(`Wrong input type for account "${acc.name}" in the instruction accounts object${ixName !== void 0 ? ' for instruction "' + ixName + '"' : ""}. Expected PublicKey or string.`);
      }
      const isOptional = acc.optional && pubkey.equals(programId);
      const isWritable = Boolean(acc.writable && !isOptional);
      const isSigner = Boolean(acc.signer && !isOptional);
      return {
        pubkey,
        isWritable,
        isSigner
      };
    }).flat();
  }
};
function validateInstruction(ix, ...args) {
}
var TransactionFactory = class {
  static build(idlIx, ixFn) {
    const txFn = (...args) => {
      var _a, _b, _c;
      const [, ctx] = splitArgsAndCtx(idlIx, [...args]);
      const tx = new import_web33.Transaction();
      if (ctx.preInstructions && ctx.instructions) {
        throw new Error("instructions is deprecated, use preInstructions");
      }
      (_a = ctx.preInstructions) === null || _a === void 0 ? void 0 : _a.forEach((ix) => tx.add(ix));
      (_b = ctx.instructions) === null || _b === void 0 ? void 0 : _b.forEach((ix) => tx.add(ix));
      tx.add(ixFn(...args));
      (_c = ctx.postInstructions) === null || _c === void 0 ? void 0 : _c.forEach((ix) => tx.add(ix));
      return tx;
    };
    return txFn;
  }
};
var RpcFactory = class {
  static build(idlIx, txFn, idlErrors, provider) {
    const rpc = async (...args) => {
      var _a;
      const tx = txFn(...args);
      const [, ctx] = splitArgsAndCtx(idlIx, [...args]);
      if (provider.sendAndConfirm === void 0) {
        throw new Error("This function requires 'Provider.sendAndConfirm' to be implemented.");
      }
      try {
        return await provider.sendAndConfirm(tx, (_a = ctx.signers) !== null && _a !== void 0 ? _a : [], ctx.options);
      } catch (err2) {
        throw translateError(err2, idlErrors);
      }
    };
    return rpc;
  }
};
var AccountFactory = class {
  static build(idl, coder, programId, provider) {
    var _a;
    return ((_a = idl.accounts) !== null && _a !== void 0 ? _a : []).reduce((accountFns, acc) => {
      accountFns[acc.name] = new AccountClient(idl, acc, programId, provider, coder);
      return accountFns;
    }, {});
  }
};
var AccountClient = class {
  /**
   * Returns the number of bytes in this account.
   */
  get size() {
    return this._size;
  }
  /**
   * Returns the program ID owning all accounts.
   */
  get programId() {
    return this._programId;
  }
  /**
   * Returns the client's wallet and network provider.
   */
  get provider() {
    return this._provider;
  }
  /**
   * Returns the coder.
   */
  get coder() {
    return this._coder;
  }
  constructor(idl, idlAccount, programId, provider, coder) {
    this._idlAccount = idlAccount;
    this._programId = programId;
    this._provider = provider !== null && provider !== void 0 ? provider : getProvider();
    this._coder = coder !== null && coder !== void 0 ? coder : new BorshCoder(idl);
    this._size = this._coder.accounts.size(idlAccount.name);
  }
  /**
   * Returns a deserialized account, returning null if it doesn't exist.
   *
   * @param address The address of the account to fetch.
   */
  async fetchNullable(address, commitment) {
    const { data } = await this.fetchNullableAndContext(address, commitment);
    return data;
  }
  /**
   * Returns a deserialized account along with the associated rpc response context, returning null if it doesn't exist.
   *
   * @param address The address of the account to fetch.
   */
  async fetchNullableAndContext(address, commitment) {
    const accountInfo = await this.getAccountInfoAndContext(address, commitment);
    const { value, context } = accountInfo;
    return {
      data: value && value.data.length !== 0 ? this._coder.accounts.decode(this._idlAccount.name, value.data) : null,
      context
    };
  }
  /**
   * Returns a deserialized account.
   *
   * @param address The address of the account to fetch.
   */
  async fetch(address, commitment) {
    const { data } = await this.fetchNullableAndContext(address, commitment);
    if (data === null) {
      throw new Error(`Account does not exist or has no data ${address.toString()}`);
    }
    return data;
  }
  /**
   * Returns a deserialized account along with the associated rpc response context.
   *
   * @param address The address of the account to fetch.
   */
  async fetchAndContext(address, commitment) {
    const { data, context } = await this.fetchNullableAndContext(address, commitment);
    if (data === null) {
      throw new Error(`Account does not exist ${address.toString()}`);
    }
    return { data, context };
  }
  /**
   * Returns multiple deserialized accounts.
   * Accounts not found or with wrong discriminator are returned as null.
   *
   * @param addresses The addresses of the accounts to fetch.
   */
  async fetchMultiple(addresses, commitment) {
    const accounts = await this.fetchMultipleAndContext(addresses, commitment);
    return accounts.map((account) => account ? account.data : null);
  }
  /**
   * Returns multiple deserialized accounts.
   * Accounts not found or with wrong discriminator are returned as null.
   *
   * @param addresses The addresses of the accounts to fetch.
   */
  async fetchMultipleAndContext(addresses, commitment) {
    const accounts = await getMultipleAccountsAndContext(this._provider.connection, addresses.map((address) => translateAddress(address)), commitment);
    return accounts.map((result) => {
      if (result == null) {
        return null;
      }
      const { account, context } = result;
      return {
        data: this._coder.accounts.decode(this._idlAccount.name, account.data),
        context
      };
    });
  }
  /**
   * Returns all instances of this account type for the program.
   *
   * @param filters User-provided filters to narrow the results from `connection.getProgramAccounts`.
   *
   *                When filters are not defined this method returns all
   *                the account instances.
   *
   *                When filters are of type `Buffer`, the filters are appended
   *                after the discriminator.
   *
   *                When filters are of type `GetProgramAccountsFilter[]`,
   *                filters are appended after the discriminator filter.
   */
  async all(filters) {
    const filter = this.coder.accounts.memcmp(this._idlAccount.name, filters instanceof Buffer ? filters : void 0);
    const coderFilters = [];
    if ((filter === null || filter === void 0 ? void 0 : filter.offset) != void 0 && (filter === null || filter === void 0 ? void 0 : filter.bytes) != void 0) {
      coderFilters.push({
        memcmp: { offset: filter.offset, bytes: filter.bytes }
      });
    }
    if ((filter === null || filter === void 0 ? void 0 : filter.dataSize) != void 0) {
      coderFilters.push({ dataSize: filter.dataSize });
    }
    let resp = await this._provider.connection.getProgramAccounts(this._programId, {
      commitment: this._provider.connection.commitment,
      filters: [...coderFilters, ...Array.isArray(filters) ? filters : []]
    });
    return resp.map(({ pubkey, account }) => {
      return {
        publicKey: pubkey,
        account: this._coder.accounts.decode(this._idlAccount.name, account.data)
      };
    });
  }
  /**
   * Returns an `EventEmitter` emitting a "change" event whenever the account
   * changes.
   */
  subscribe(address, commitment) {
    const sub = subscriptions.get(address.toString());
    if (sub) {
      return sub.ee;
    }
    const ee = new import_eventemitter3.default();
    address = translateAddress(address);
    const listener = this._provider.connection.onAccountChange(address, (acc) => {
      const account = this._coder.accounts.decode(this._idlAccount.name, acc.data);
      ee.emit("change", account);
    }, commitment);
    subscriptions.set(address.toString(), {
      ee,
      listener
    });
    return ee;
  }
  /**
   * Unsubscribes from the account at the given address.
   */
  async unsubscribe(address) {
    let sub = subscriptions.get(address.toString());
    if (!sub) {
      console.warn("Address is not subscribed");
      return;
    }
    if (subscriptions) {
      await this._provider.connection.removeAccountChangeListener(sub.listener).then(() => {
        subscriptions.delete(address.toString());
      }).catch(console.error);
    }
  }
  /**
   * Returns an instruction for creating this account.
   */
  async createInstruction(signer, sizeOverride) {
    const size = this.size;
    if (this._provider.publicKey === void 0) {
      throw new Error("This function requires the Provider interface implementor to have a 'publicKey' field.");
    }
    return import_web33.SystemProgram.createAccount({
      fromPubkey: this._provider.publicKey,
      newAccountPubkey: signer.publicKey,
      space: sizeOverride !== null && sizeOverride !== void 0 ? sizeOverride : size,
      lamports: await this._provider.connection.getMinimumBalanceForRentExemption(sizeOverride !== null && sizeOverride !== void 0 ? sizeOverride : size),
      programId: this._programId
    });
  }
  async getAccountInfo(address, commitment) {
    return await this._provider.connection.getAccountInfo(translateAddress(address), commitment);
  }
  async getAccountInfoAndContext(address, commitment) {
    return await this._provider.connection.getAccountInfoAndContext(translateAddress(address), commitment);
  }
};
var subscriptions = /* @__PURE__ */ new Map();
var SimulateFactory = class {
  static build(idlIx, txFn, idlErrors, provider, coder, programId, idl) {
    const simulate = async (...args) => {
      var _a;
      const tx = txFn(...args);
      const [, ctx] = splitArgsAndCtx(idlIx, [...args]);
      let resp = void 0;
      if (provider.simulate === void 0) {
        throw new Error("This function requires 'Provider.simulate' to be implemented.");
      }
      try {
        resp = await provider.simulate(tx, ctx.signers, (_a = ctx.options) === null || _a === void 0 ? void 0 : _a.commitment);
      } catch (err2) {
        throw translateError(err2, idlErrors);
      }
      if (resp === void 0) {
        throw new Error("Unable to simulate transaction");
      }
      const logs = resp.logs;
      if (!logs) {
        throw new Error("Simulated logs not found");
      }
      const events = [];
      if (idl.events) {
        let parser = new EventParser(programId, coder);
        for (const event of parser.parseLogs(logs)) {
          events.push(event);
        }
      }
      return { events, raw: logs };
    };
    return simulate;
  }
};
function uint64(property) {
  return new WrappedLayout(blob(8), (b) => u642.fromBuffer(b), (n) => n.toBuffer(), property);
}
function publicKey2(property) {
  return new WrappedLayout(blob(32), (b) => new import_web33.PublicKey(b), (key) => key.toBuffer(), property);
}
function coption(layout, property) {
  return new COptionLayout(layout, property);
}
var WrappedLayout = class extends Layout_2 {
  constructor(layout, decoder, encoder, property) {
    super(layout.span, property);
    this.layout = layout;
    this.decoder = decoder;
    this.encoder = encoder;
  }
  decode(b, offset2) {
    return this.decoder(this.layout.decode(b, offset2));
  }
  encode(src, b, offset2) {
    return this.layout.encode(this.encoder(src), b, offset2);
  }
  getSpan(b, offset2) {
    return this.layout.getSpan(b, offset2);
  }
};
var COptionLayout = class extends Layout_2 {
  constructor(layout, property) {
    super(-1, property);
    this.layout = layout;
    this.discriminator = u322();
  }
  encode(src, b, offset2 = 0) {
    if (src === null || src === void 0) {
      return this.layout.span + this.discriminator.encode(0, b, offset2);
    }
    this.discriminator.encode(1, b, offset2);
    return this.layout.encode(src, b, offset2 + 4) + 4;
  }
  decode(b, offset2 = 0) {
    const discriminator = this.discriminator.decode(b, offset2);
    if (discriminator === 0) {
      return null;
    } else if (discriminator === 1) {
      return this.layout.decode(b, offset2 + 4);
    }
    throw new Error("Invalid coption " + this.layout.property);
  }
  getSpan(b, offset2 = 0) {
    return this.layout.getSpan(b, offset2 + 4) + 4;
  }
};
var u642 = class _u64 extends import_bn2.default {
  /**
   * Convert to Buffer representation
   */
  toBuffer() {
    const a = super.toArray().reverse();
    const b = Buffer.from(a);
    if (b.length === 8) {
      return b;
    }
    if (b.length >= 8) {
      throw new Error("u64 too large");
    }
    const zeroPad = Buffer.alloc(8);
    b.copy(zeroPad);
    return zeroPad;
  }
  /**
   * Construct a u64 from Buffer representation
   */
  static fromBuffer(buffer) {
    if (buffer.length !== 8) {
      throw new Error(`Invalid buffer length: ${buffer.length}`);
    }
    return new _u64([...buffer].reverse().map((i) => `00${i.toString(16)}`.slice(-2)).join(""), 16);
  }
};
var TOKEN_ACCOUNT_LAYOUT = struct2([
  publicKey2("mint"),
  publicKey2("owner"),
  uint64("amount"),
  coption(publicKey2(), "delegate"),
  ((p) => {
    const U = union(u82("discriminator"), null, p);
    U.addVariant(0, struct2([]), "uninitialized");
    U.addVariant(1, struct2([]), "initialized");
    U.addVariant(2, struct2([]), "frozen");
    return U;
  })("state"),
  coption(uint64(), "isNative"),
  uint64("delegatedAmount"),
  coption(publicKey2(), "closeAuthority")
]);
function decodeTokenAccount(b) {
  return TOKEN_ACCOUNT_LAYOUT.decode(b);
}
var AccountsResolver = class {
  constructor(_args, _accounts, _provider2, _programId, _idlIx, accountNamespace, _idlTypes, _customResolver) {
    this._args = _args;
    this._accounts = _accounts;
    this._provider = _provider2;
    this._programId = _programId;
    this._idlIx = _idlIx;
    this._idlTypes = _idlTypes;
    this._customResolver = _customResolver;
    this._accountStore = new AccountStore(_provider2, accountNamespace, _programId);
  }
  args(args) {
    this._args = args;
  }
  // Note: We serially resolve PDAs one by one rather than doing them
  //       in parallel because there can be dependencies between
  //       addresses. That is, one PDA can be used as a seed in another.
  async resolve() {
    this.resolveEventCpi(this._idlIx.accounts);
    this.resolveConst(this._idlIx.accounts);
    let depth = 0;
    while (await this.resolvePdasAndRelations(this._idlIx.accounts) + await this.resolveCustom() > 0) {
      depth++;
      if (depth === 16) {
        const isResolvable = (acc) => {
          if (!isCompositeAccounts(acc)) {
            return !!(acc.address || acc.pda || acc.relations);
          }
          return acc.accounts.some(isResolvable);
        };
        const getPaths = (accs, path = [], paths = []) => {
          for (const acc of accs) {
            if (isCompositeAccounts(acc)) {
              paths.push(...getPaths(acc.accounts, [...path, acc.name]));
            } else {
              paths.push([...path, acc.name]);
            }
          }
          return paths;
        };
        const resolvableAccs = this._idlIx.accounts.filter(isResolvable);
        const unresolvedAccs = getPaths(resolvableAccs).filter((path) => !this.get(path)).map((path) => path.reduce((acc, p) => acc + "." + p)).map((acc) => `\`${acc}\``).join(", ");
        throw new Error([
          `Reached maximum depth for account resolution.`,
          `Unresolved accounts: ${unresolvedAccs}`
        ].join(" "));
      }
    }
  }
  resolveOptionals(accounts) {
    Object.assign(this._accounts, this.resolveOptionalsHelper(accounts, this._idlIx.accounts));
  }
  get(path) {
    const ret = path.reduce((acc, subPath) => acc && acc[subPath], this._accounts);
    if (ret && ret.toBase58) {
      return ret;
    }
  }
  set(path, value) {
    let cur = this._accounts;
    path.forEach((p, i) => {
      var _a;
      const isLast = i === path.length - 1;
      if (isLast) {
        cur[p] = value;
      }
      cur[p] = (_a = cur[p]) !== null && _a !== void 0 ? _a : {};
      cur = cur[p];
    });
  }
  resolveOptionalsHelper(partialAccounts, accounts) {
    const nestedAccountsGeneric = {};
    for (const accountItem of accounts) {
      const accountName = accountItem.name;
      const partialAccount = partialAccounts[accountName];
      if (partialAccount === void 0)
        continue;
      if (isPartialAccounts(partialAccount)) {
        if (isCompositeAccounts(accountItem)) {
          nestedAccountsGeneric[accountName] = this.resolveOptionalsHelper(partialAccount, accountItem["accounts"]);
        } else {
          nestedAccountsGeneric[accountName] = flattenPartialAccounts(partialAccount, true);
        }
      } else {
        if (partialAccount !== null) {
          nestedAccountsGeneric[accountName] = translateAddress(partialAccount);
        } else if (accountItem["optional"]) {
          nestedAccountsGeneric[accountName] = this._programId;
        }
      }
    }
    return nestedAccountsGeneric;
  }
  async resolveCustom() {
    if (this._customResolver) {
      const { accounts, resolved } = await this._customResolver({
        args: this._args,
        accounts: this._accounts,
        provider: this._provider,
        programId: this._programId,
        idlIx: this._idlIx
      });
      this._accounts = accounts;
      return resolved;
    }
    return 0;
  }
  /**
   * Resolve event CPI accounts `eventAuthority` and `program`.
   *
   * Accounts will only be resolved if they are declared next to each other to
   * reduce the chance of name collision.
   */
  resolveEventCpi(accounts, path = []) {
    for (const i in accounts) {
      const accountOrAccounts = accounts[i];
      if (isCompositeAccounts(accountOrAccounts)) {
        this.resolveEventCpi(accountOrAccounts.accounts, [
          ...path,
          accountOrAccounts.name
        ]);
      }
      const nextIndex = +i + 1;
      if (nextIndex === accounts.length)
        return;
      const currentName = accounts[i].name;
      const nextName = accounts[nextIndex].name;
      if (currentName === "eventAuthority" && nextName === "program") {
        const currentPath = [...path, currentName];
        const nextPath = [...path, nextName];
        if (!this.get(currentPath)) {
          this.set(currentPath, import_web33.PublicKey.findProgramAddressSync([Buffer.from("__event_authority")], this._programId)[0]);
        }
        if (!this.get(nextPath)) {
          this.set(nextPath, this._programId);
        }
        return;
      }
    }
  }
  resolveConst(accounts, path = []) {
    for (const accountOrAccounts of accounts) {
      const name = accountOrAccounts.name;
      if (isCompositeAccounts(accountOrAccounts)) {
        this.resolveConst(accountOrAccounts.accounts, [...path, name]);
      } else {
        const account = accountOrAccounts;
        if ((account.signer || account.address) && !this.get([...path, name])) {
          if (account.signer) {
            if (!this._provider.publicKey) {
              throw new Error("This function requires the `Provider` interface implementor to have a `publicKey` field.");
            }
            this.set([...path, name], this._provider.publicKey);
          }
          if (account.address) {
            this.set([...path, name], translateAddress(account.address));
          }
        }
      }
    }
  }
  async resolvePdasAndRelations(accounts, path = []) {
    let found = 0;
    for (const accountOrAccounts of accounts) {
      const name = accountOrAccounts.name;
      if (isCompositeAccounts(accountOrAccounts)) {
        found += await this.resolvePdasAndRelations(accountOrAccounts.accounts, [...path, name]);
      } else {
        const account = accountOrAccounts;
        if ((account.pda || account.relations) && !this.get([...path, name])) {
          found++;
          try {
            if (account.pda) {
              const seeds = await Promise.all(account.pda.seeds.map((seed2) => this.toBuffer(seed2, path)));
              if (seeds.some((seed2) => !seed2)) {
                continue;
              }
              const programId = await this.parseProgramId(account, path);
              const [pubkey] = import_web33.PublicKey.findProgramAddressSync(seeds, programId);
              this.set([...path, name], pubkey);
            }
          } catch {
          }
          try {
            if (account.relations) {
              const accountKey = this.get([...path, account.relations[0]]);
              if (accountKey) {
                const account2 = await this._accountStore.fetchAccount({
                  publicKey: accountKey
                });
                this.set([...path, name], account2[name]);
              }
            }
          } catch {
          }
        }
      }
    }
    return found;
  }
  async parseProgramId(account, path = []) {
    var _a;
    if (!((_a = account.pda) === null || _a === void 0 ? void 0 : _a.program)) {
      return this._programId;
    }
    const buf = await this.toBuffer(account.pda.program, path);
    if (!buf) {
      throw new Error(`Program seed not resolved: ${account.name}`);
    }
    return new import_web33.PublicKey(buf);
  }
  async toBuffer(seed2, path = []) {
    switch (seed2.kind) {
      case "const":
        return this.toBufferConst(seed2);
      case "arg":
        return await this.toBufferArg(seed2);
      case "account":
        return await this.toBufferAccount(seed2, path);
      default:
        throw new Error(`Unexpected seed: ${seed2}`);
    }
  }
  toBufferConst(seed2) {
    return this.toBufferValue("bytes", seed2.value);
  }
  async toBufferArg(seed2) {
    const [name, ...path] = seed2.path.split(".");
    const index = this._idlIx.args.findIndex((arg) => arg.name === name);
    if (index === -1) {
      throw new Error(`Unable to find argument for seed: ${name}`);
    }
    const value = path.reduce((acc, path2) => (acc !== null && acc !== void 0 ? acc : {})[path2], this._args[index]);
    if (value === void 0) {
      return;
    }
    const type2 = this.getType(this._idlIx.args[index].type, path);
    return this.toBufferValue(type2, value);
  }
  async toBufferAccount(seed2, path = []) {
    const [name, ...paths] = seed2.path.split(".");
    const fieldPubkey = this.get([...path, name]);
    if (!fieldPubkey)
      return;
    if (!paths.length) {
      return this.toBufferValue("pubkey", fieldPubkey);
    }
    if (!seed2.account) {
      throw new Error(`Seed account is required in order to resolve type: ${seed2.path}`);
    }
    const account = await this._accountStore.fetchAccount({
      publicKey: fieldPubkey,
      name: seed2.account
    });
    let accountValue = account;
    let currentPaths = paths;
    while (currentPaths.length > 0) {
      accountValue = accountValue[currentPaths[0]];
      currentPaths = currentPaths.slice(1);
    }
    if (accountValue === void 0)
      return;
    const type2 = this.getType({ defined: { name: seed2.account } }, paths);
    return this.toBufferValue(type2, accountValue);
  }
  /**
   * Converts the given idl valaue into a Buffer. The values here must be
   * primitives, e.g. no structs.
   */
  toBufferValue(type2, value) {
    switch (type2) {
      case "u8":
      case "i8":
        return Buffer.from([value]);
      case "u16":
      case "i16":
        return new import_bn2.default(value).toArrayLike(Buffer, "le", 2);
      case "u32":
      case "i32":
        return new import_bn2.default(value).toArrayLike(Buffer, "le", 4);
      case "u64":
      case "i64":
        return new import_bn2.default(value).toArrayLike(Buffer, "le", 8);
      case "u128":
      case "i128":
        return new import_bn2.default(value).toArrayLike(Buffer, "le", 16);
      case "u256":
      case "i256":
        return new import_bn2.default(value).toArrayLike(Buffer, "le", 32);
      case "string":
        return Buffer.from(value);
      case "pubkey":
        return value.toBuffer();
      case "bytes":
        return Buffer.from(value);
      default:
        if (type2 === null || type2 === void 0 ? void 0 : type2.array) {
          return Buffer.from(value);
        }
        throw new Error(`Unexpected seed type: ${type2}`);
    }
  }
  /**
   * Recursively get the type at some path of either a primitive or a user
   * defined struct.
   */
  getType(type2, path = []) {
    var _a;
    const typeName = (_a = type2 === null || type2 === void 0 ? void 0 : type2.defined) === null || _a === void 0 ? void 0 : _a.name;
    if (typeName) {
      if (typeName === "tokenAccount") {
        switch (path.at(0)) {
          case "mint":
          case "owner":
            return "pubkey";
          case "amount":
          case "delagatedAmount":
            return "u64";
          default:
            throw new Error(`Unknown token account path: ${path}`);
        }
      }
      const definedType = this._idlTypes.find((t) => t.name === typeName);
      if (!definedType) {
        throw new Error(`Type not found: ${typeName}`);
      }
      const [fieldName, ...subPath] = path;
      const fields = definedType.type.fields;
      const field = fields.find((field2) => field2.name === fieldName);
      if (!field) {
        throw new Error(`Field not found: ${fieldName}`);
      }
      return this.getType(field.type, subPath);
    }
    return type2;
  }
};
var AccountStore = class {
  constructor(_provider2, accounts, programId) {
    this._provider = _provider2;
    this._cache = /* @__PURE__ */ new Map();
    this._idls = {};
    this._idls[programId.toBase58()] = accounts;
  }
  async fetchAccount({ publicKey: publicKey3, name }) {
    const address = publicKey3.toBase58();
    if (!this._cache.has(address)) {
      const accountInfo = await this._provider.connection.getAccountInfo(publicKey3);
      if (accountInfo === null) {
        throw new Error(`Account not found: ${address}`);
      }
      if (name === "tokenAccount") {
        const account = decodeTokenAccount(accountInfo.data);
        this._cache.set(address, account);
      } else {
        const accounts = await this.getAccountsNs(accountInfo.owner);
        if (accounts) {
          const accountNs = Object.values(accounts)[0];
          if (accountNs) {
            const account = accountNs.coder.accounts.decodeAny(accountInfo.data);
            this._cache.set(address, account);
          }
        }
      }
    }
    return this._cache.get(address);
  }
  async getAccountsNs(programId) {
    const programIdStr = programId.toBase58();
    if (!this._idls[programIdStr]) {
      const idl = await Program.fetchIdl(programId, this._provider);
      if (idl) {
        const program = new Program(idl, this._provider);
        this._idls[programIdStr] = program.account;
      }
    }
    return this._idls[programIdStr];
  }
};
var MethodsBuilderFactory = class {
  static build(provider, programId, idlIx, ixFn, txFn, rpcFn, simulateFn, viewFn, accountNamespace, idlTypes, customResolver) {
    return (...args) => new MethodsBuilder(args, ixFn, txFn, rpcFn, simulateFn, viewFn, provider, programId, idlIx, accountNamespace, idlTypes, customResolver);
  }
};
function isPartialAccounts(partialAccount) {
  return typeof partialAccount === "object" && partialAccount !== null && !("_bn" in partialAccount);
}
function flattenPartialAccounts(partialAccounts, throwOnNull) {
  const toReturn = {};
  for (const accountName in partialAccounts) {
    const account = partialAccounts[accountName];
    if (account === null) {
      if (throwOnNull)
        throw new Error("Failed to resolve optionals due to IDL type mismatch with input accounts!");
      continue;
    }
    toReturn[accountName] = isPartialAccounts(account) ? flattenPartialAccounts(account, true) : translateAddress(account);
  }
  return toReturn;
}
var MethodsBuilder = class {
  constructor(_args, _ixFn, _txFn, _rpcFn, _simulateFn, _viewFn, provider, programId, idlIx, accountNamespace, idlTypes, customResolver) {
    this._args = _args;
    this._ixFn = _ixFn;
    this._txFn = _txFn;
    this._rpcFn = _rpcFn;
    this._simulateFn = _simulateFn;
    this._viewFn = _viewFn;
    this._accounts = {};
    this._remainingAccounts = [];
    this._signers = [];
    this._preInstructions = [];
    this._postInstructions = [];
    this._resolveAccounts = true;
    this._accountsResolver = new AccountsResolver(_args, this._accounts, provider, programId, idlIx, accountNamespace, idlTypes, customResolver);
  }
  args(args) {
    this._args = args;
    this._accountsResolver.args(args);
  }
  /**
   * Set instruction accounts with account resolution.
   *
   * This method only accepts accounts that cannot be resolved.
   *
   * See {@link accountsPartial} for overriding the account resolution or
   * {@link accountsStrict} for strictly specifying all accounts.
   */
  accounts(accounts) {
    return this.accountsPartial(accounts);
  }
  /**
   * Set instruction accounts with account resolution.
   *
   * There is no functional difference between this method and {@link accounts}
   * method, the only difference is this method allows specifying all accounts
   * even if they can be resolved. On the other hand, {@link accounts} method
   * doesn't accept accounts that can be resolved.
   */
  accountsPartial(accounts) {
    this._resolveAccounts = true;
    this._accountsResolver.resolveOptionals(accounts);
    return this;
  }
  /**
   * Set instruction accounts without account resolution.
   *
   * All accounts strictly need to be specified when this method is used.
   *
   * See {@link accounts} and {@link accountsPartial} methods for automatically
   * resolving accounts.
   *
   * @param accounts instruction accounts
   */
  accountsStrict(accounts) {
    this._resolveAccounts = false;
    this._accountsResolver.resolveOptionals(accounts);
    return this;
  }
  /**
   * Set instruction signers.
   *
   * Note that calling this method appends the given signers to the existing
   * signers (instead of overriding them).
   *
   * @param signers signers to append
   */
  signers(signers) {
    this._signers = this._signers.concat(signers);
    return this;
  }
  /**
   * Set remaining accounts.
   *
   * Note that calling this method appends the given accounts to the existing
   * remaining accounts (instead of overriding them).
   *
   * @param accounts remaining accounts
   */
  remainingAccounts(accounts) {
    this._remainingAccounts = this._remainingAccounts.concat(accounts);
    return this;
  }
  /**
   * Set previous instructions.
   *
   * See {@link postInstructions} to set the post instructions instead.
   *
   * @param ixs instructions
   * @param prepend whether to prepend to the existing previous instructions
   */
  preInstructions(ixs, prepend = false) {
    if (prepend) {
      this._preInstructions = ixs.concat(this._preInstructions);
    } else {
      this._preInstructions = this._preInstructions.concat(ixs);
    }
    return this;
  }
  /**
   * Set post instructions.
   *
   * See {@link preInstructions} to set the previous instructions instead.
   *
   * @param ixs instructions
   */
  postInstructions(ixs) {
    this._postInstructions = this._postInstructions.concat(ixs);
    return this;
  }
  /**
   * Get the public keys of the instruction accounts.
   *
   * The return type is an object with account names as keys and their public
   * keys as their values.
   *
   * Note that an account key is `undefined` if the account hasn't yet been
   * specified or resolved.
   */
  async pubkeys() {
    if (this._resolveAccounts) {
      await this._accountsResolver.resolve();
    }
    return this._accounts;
  }
  /**
   * Create an instruction based on the current configuration.
   *
   * See {@link transaction} to create a transaction instead.
   *
   * @returns the transaction instruction
   */
  async instruction() {
    if (this._resolveAccounts) {
      await this._accountsResolver.resolve();
    }
    return this._ixFn(...this._args, {
      accounts: this._accounts,
      signers: this._signers,
      remainingAccounts: this._remainingAccounts,
      preInstructions: this._preInstructions,
      postInstructions: this._postInstructions
    });
  }
  /**
   * Create a transaction based on the current configuration.
   *
   * This method doesn't send the created transaction. Use {@link rpc} method
   * to conveniently send an confirm the configured transaction.
   *
   * See {@link instruction} to only create an instruction instead.
   *
   * @returns the transaction
   */
  async transaction() {
    if (this._resolveAccounts) {
      await this._accountsResolver.resolve();
    }
    return this._txFn(...this._args, {
      accounts: this._accounts,
      signers: this._signers,
      remainingAccounts: this._remainingAccounts,
      preInstructions: this._preInstructions,
      postInstructions: this._postInstructions
    });
  }
  /**
   * Simulate the configured transaction.
   *
   * @param options confirmation options
   * @returns the simulation response
   */
  async simulate(options) {
    if (this._resolveAccounts) {
      await this._accountsResolver.resolve();
    }
    return this._simulateFn(...this._args, {
      accounts: this._accounts,
      signers: this._signers,
      remainingAccounts: this._remainingAccounts,
      preInstructions: this._preInstructions,
      postInstructions: this._postInstructions,
      options
    });
  }
  /**
   * View the configured transaction.
   *
   * Note that to use this method, the instruction needs to return a value and
   * all its accounts must be read-only.
   *
   * @param options confirmation options
   * @returns the return value of the instruction
   */
  async view(options) {
    if (this._resolveAccounts) {
      await this._accountsResolver.resolve();
    }
    if (!this._viewFn) {
      throw new Error([
        "Method does not support views.",
        "The instruction should return a value, and its accounts must be read-only"
      ].join(" "));
    }
    return this._viewFn(...this._args, {
      accounts: this._accounts,
      signers: this._signers,
      remainingAccounts: this._remainingAccounts,
      preInstructions: this._preInstructions,
      postInstructions: this._postInstructions,
      options
    });
  }
  /**
   * Send and confirm the configured transaction.
   *
   * See {@link rpcAndKeys} to both send the transaction and get the resolved
   * account public keys.
   *
   * @param options confirmation options
   * @returns the transaction signature
   */
  async rpc(options) {
    if (this._resolveAccounts) {
      await this._accountsResolver.resolve();
    }
    return this._rpcFn(...this._args, {
      accounts: this._accounts,
      signers: this._signers,
      remainingAccounts: this._remainingAccounts,
      preInstructions: this._preInstructions,
      postInstructions: this._postInstructions,
      options
    });
  }
  /**
   * Conveniently call both {@link rpc} and {@link pubkeys} methods.
   *
   * @param options confirmation options
   * @returns the transaction signature and account public keys
   */
  async rpcAndKeys(options) {
    return {
      signature: await this.rpc(options),
      pubkeys: await this.pubkeys()
    };
  }
  /**
   * Get instruction information necessary to include the instruction inside a
   * transaction.
   *
   * # Example
   *
   * ```ts
   * const { instruction, signers, pubkeys } = await method.prepare();
   * ```
   */
  async prepare() {
    return {
      instruction: await this.instruction(),
      signers: this._signers,
      pubkeys: await this.pubkeys()
    };
  }
};
var ViewFactory = class {
  static build(programId, idlIx, simulateFn, idl) {
    const isWritable = idlIx.accounts.find((a) => a.writable);
    const hasReturn = !!idlIx.returns;
    if (isWritable || !hasReturn)
      return;
    const view = async (...args) => {
      let simulationResult = await simulateFn(...args);
      const returnPrefix = `Program return: ${programId} `;
      let returnLog = simulationResult.raw.find((l) => l.startsWith(returnPrefix));
      if (!returnLog) {
        throw new Error("View expected return log");
      }
      let returnData = decode(returnLog.slice(returnPrefix.length));
      let returnType = idlIx.returns;
      if (!returnType) {
        throw new Error("View expected return type");
      }
      const coder = IdlCoder.fieldLayout({ type: returnType }, idl.types);
      return coder.decode(returnData);
    };
    return view;
  }
};
var NamespaceFactory = class {
  /**
   * Generates all namespaces for a given program.
   */
  static build(idl, coder, programId, provider, getCustomResolver) {
    const rpc = {};
    const instruction = {};
    const transaction = {};
    const simulate = {};
    const methods = {};
    const view = {};
    const idlErrors = parseIdlErrors(idl);
    const account = idl.accounts ? AccountFactory.build(idl, coder, programId, provider) : {};
    idl.instructions.forEach((idlIx) => {
      const ixItem = InstructionNamespaceFactory.build(idlIx, (ixName, ix) => coder.instruction.encode(ixName, ix), programId);
      const txItem = TransactionFactory.build(idlIx, ixItem);
      const rpcItem = RpcFactory.build(idlIx, txItem, idlErrors, provider);
      const simulateItem = SimulateFactory.build(idlIx, txItem, idlErrors, provider, coder, programId, idl);
      const viewItem = ViewFactory.build(programId, idlIx, simulateItem, idl);
      const methodItem = MethodsBuilderFactory.build(provider, programId, idlIx, ixItem, txItem, rpcItem, simulateItem, viewItem, account, idl.types || [], getCustomResolver === null || getCustomResolver === void 0 ? void 0 : getCustomResolver(idlIx));
      const name = idlIx.name;
      instruction[name] = ixItem;
      transaction[name] = txItem;
      rpc[name] = rpcItem;
      simulate[name] = simulateItem;
      methods[name] = methodItem;
      if (viewItem) {
        view[name] = viewItem;
      }
    });
    return [
      rpc,
      instruction,
      transaction,
      account,
      simulate,
      methods,
      view
    ];
  }
};
var Program = class _Program {
  /**
   * Address of the program.
   */
  get programId() {
    return this._programId;
  }
  /**
   * IDL in camelCase format to work in TypeScript.
   *
   * See {@link rawIdl} field if you need the original IDL.
   */
  get idl() {
    return this._idl;
  }
  /**
   * Raw IDL i.e. the original IDL without camelCase conversion.
   *
   * See {@link idl} field if you need the camelCased version of the IDL.
   */
  get rawIdl() {
    return this._rawIdl;
  }
  /**
   * Coder for serializing requests.
   */
  get coder() {
    return this._coder;
  }
  /**
   * Wallet and network provider.
   */
  get provider() {
    return this._provider;
  }
  /**
   * @param idl       The interface definition.
   * @param provider  The network and wallet context to use. If not provided
   *                  then uses [[getProvider]].
   * @param getCustomResolver A function that returns a custom account resolver
   *                          for the given instruction. This is useful for resolving
   *                          public keys of missing accounts when building instructions
   */
  constructor(idl, provider = getProvider(), coder, getCustomResolver) {
    this._idl = convertIdlToCamelCase(idl);
    this._rawIdl = idl;
    this._provider = provider;
    this._programId = translateAddress(idl.address);
    this._coder = coder !== null && coder !== void 0 ? coder : new BorshCoder(this._idl);
    this._events = new EventManager(this._programId, provider, this._coder);
    const [rpc, instruction, transaction, account, simulate, methods, views] = NamespaceFactory.build(this._idl, this._coder, this._programId, provider, getCustomResolver);
    this.rpc = rpc;
    this.instruction = instruction;
    this.transaction = transaction;
    this.account = account;
    this.simulate = simulate;
    this.methods = methods;
    this.views = views;
  }
  /**
   * Generates a Program client by fetching the IDL from the network.
   *
   * In order to use this method, an IDL must have been previously initialized
   * via the anchor CLI's `anchor idl init` command.
   *
   * @param programId The on-chain address of the program.
   * @param provider  The network and wallet context.
   */
  static async at(address, provider) {
    const programId = translateAddress(address);
    const idl = await _Program.fetchIdl(programId, provider);
    if (!idl) {
      throw new Error(`IDL not found for program: ${address.toString()}`);
    }
    return new _Program(idl, provider);
  }
  /**
   * Fetches an idl from the blockchain.
   *
   * In order to use this method, an IDL must have been previously initialized
   * via the anchor CLI's `anchor idl init` command.
   *
   * @param programId The on-chain address of the program.
   * @param provider  The network and wallet context.
   */
  static async fetchIdl(address, provider) {
    provider = provider !== null && provider !== void 0 ? provider : getProvider();
    const programId = translateAddress(address);
    const idlAddr = await idlAddress(programId);
    const accountInfo = await provider.connection.getAccountInfo(idlAddr);
    if (!accountInfo) {
      return null;
    }
    let idlAccount = decodeIdlAccount(accountInfo.data.slice(8));
    const inflatedIdl = inflate_1(idlAccount.data);
    return JSON.parse(decode$2(inflatedIdl));
  }
  /**
   * Invokes the given callback every time the given event is emitted.
   *
   * @param eventName The PascalCase name of the event, provided by the IDL.
   * @param callback  The function to invoke whenever the event is emitted from
   *                  program logs.
   */
  addEventListener(eventName, callback, commitment) {
    return this._events.addEventListener(eventName, callback, commitment);
  }
  /**
   * Unsubscribes from the given eventName.
   */
  async removeEventListener(listener) {
    return await this._events.removeEventListener(listener);
  }
};
new import_web33.PublicKey("11111111111111111111111111111111");

// src/sdk.ts
var import_pump_swap_sdk2 = require("@pump-fun/pump-swap-sdk");
var import_spl_token2 = require("@solana/spl-token");
var import_web34 = require("@solana/web3.js");

// src/decorator.ts
function memoize(duration, computeKey = (...args) => args[0]) {
  return function(_, _key, descriptor) {
    const originalMethod = descriptor.value;
    let cachedData = /* @__PURE__ */ new Map();
    let cachedTime = Date.now();
    const isExpired = () => duration > 0 && cachedTime < Date.now();
    descriptor.value = async function(...args) {
      const key = computeKey(...args);
      if (!cachedData.get(key) || isExpired()) {
        cachedTime = Date.now() + duration;
        cachedData.set(key, await originalMethod.apply(this, args));
      }
      return cachedData.get(key);
    };
    return descriptor;
  };
}

// src/sdk.ts
function getPumpProgram(connection, programId) {
  const pumpIdlAddressOverride = { ...pump_default };
  pumpIdlAddressOverride.address = programId.toString();
  return new Program(
    pumpIdlAddressOverride,
    new AnchorProvider(connection, null, {})
  );
}
var PUMP_PROGRAM_ID = new import_web34.PublicKey(
  "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
);
var PUMP_AMM_PROGRAM_ID = new import_web34.PublicKey(
  "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
);
var BONDING_CURVE_NEW_SIZE = 150;
var PumpSdk = class {
  constructor(connection, pumpProgramId = PUMP_PROGRAM_ID, pumpAmmProgramId = PUMP_AMM_PROGRAM_ID) {
    this.connection = connection;
    this.pumpProgram = getPumpProgram(connection, pumpProgramId);
    this.pumpAmmSdk = new import_pump_swap_sdk2.PumpAmmSdk(connection, pumpAmmProgramId.toBase58());
  }
  programId() {
    return this.pumpProgram.programId;
  }
  globalPda() {
    return globalPda(this.pumpProgram.programId);
  }
  bondingCurvePda(mint) {
    return bondingCurvePda(this.pumpProgram.programId, mint);
  }
  creatorVaultPda(creator) {
    return creatorVaultPda(this.pumpProgram.programId, creator);
  }
  pumpPoolAuthorityPda(mint) {
    return pumpPoolAuthorityPda(mint, this.pumpProgram.programId);
  }
  canonicalPumpPoolPda(mint) {
    return canonicalPumpPoolPda(
      this.pumpProgram.programId,
      this.pumpAmmSdk.programId(),
      mint
    );
  }
  decodeGlobal(accountInfo) {
    return this.pumpProgram.coder.accounts.decode(
      "global",
      accountInfo.data
    );
  }
  decodeBondingCurve(accountInfo) {
    return this.pumpProgram.coder.accounts.decode(
      "bondingCurve",
      accountInfo.data
    );
  }
  async fetchGlobal() {
    return await this.pumpProgram.account.global.fetch(this.globalPda());
  }
  async fetchBondingCurve(mint) {
    return await this.pumpProgram.account.bondingCurve.fetch(
      this.bondingCurvePda(mint)
    );
  }
  async createInstruction(mint, name, symbol, uri, creator, user) {
    return await this.pumpProgram.methods.create(name, symbol, uri, creator).accountsPartial({
      mint,
      user
    }).instruction();
  }
  async getGlobal() {
    return await this.fetchGlobal();
  }
  async cachedBondingCurve(mint) {
    return await this.fetchBondingCurve(mint);
  }
  async getBondingCurveAccountInfo(mint, isThrowErrorWhenNull = true) {
    try {
      const bondingCurvePda2 = this.bondingCurvePda(mint);
      return await this.connection.getAccountInfo(bondingCurvePda2);
    } catch (error) {
      if (isThrowErrorWhenNull) throw error;
      return null;
    }
  }
  async buyInstructions(mint, user, amount, solAmount, slippage, creator, isAutoCreateAccount = true) {
    const instructions = [];
    const global2 = await this.getGlobal();
    const associatedUser = (0, import_spl_token2.getAssociatedTokenAddressSync)(mint, user, true);
    const $creator = creator ?? (await this.cachedBondingCurve(mint)).creator;
    if (isAutoCreateAccount) {
      instructions.push(
        (0, import_spl_token2.createAssociatedTokenAccountIdempotentInstruction)(
          user,
          associatedUser,
          user,
          mint
        )
      );
    } else {
      const userTokenAccount = await (0, import_spl_token2.getAccount)(
        this.connection,
        associatedUser
      ).catch((e) => null);
      if (!userTokenAccount) {
        instructions.push(
          (0, import_spl_token2.createAssociatedTokenAccountInstruction)(
            user,
            associatedUser,
            user,
            mint
          )
        );
      }
    }
    instructions.push(
      await this.pumpProgram.methods.buy(
        amount,
        solAmount.add(
          solAmount.mul(new import_bn4.default(Math.floor(slippage * 10))).div(new import_bn4.default(1e3))
        )
      ).accountsPartial({
        feeRecipient: getFeeRecipient(global2),
        mint,
        associatedUser,
        user,
        creatorVault: this.creatorVaultPda($creator)
      }).instruction()
    );
    return instructions;
  }
  async sellInstructions(global2, bondingCurveAccountInfo, mint, user, amount, solAmount, slippage) {
    return this.withFixBondingCurve(
      mint,
      bondingCurveAccountInfo,
      user,
      async () => {
        return [
          await this.pumpProgram.methods.sell(
            amount,
            solAmount.sub(
              solAmount.mul(new import_bn4.default(Math.floor(slippage * 10))).div(new import_bn4.default(1e3))
            )
          ).accountsPartial({
            feeRecipient: getFeeRecipient(global2),
            mint,
            associatedUser: (0, import_spl_token2.getAssociatedTokenAddressSync)(mint, user, true),
            user
          }).instruction()
        ];
      }
    );
  }
  async fixExistingBondingCurve(mint, bondingCurveAccountInfo, user) {
    return this.withFixBondingCurve(
      mint,
      bondingCurveAccountInfo,
      user,
      async () => []
    );
  }
  async withFixBondingCurve(mint, bondingCurveAccountInfo, user, block) {
    if (bondingCurveAccountInfo === null || bondingCurveAccountInfo.data.length < BONDING_CURVE_NEW_SIZE) {
      return [
        await this.extendAccount(this.bondingCurvePda(mint), user),
        ...await block()
      ];
    }
    return await block();
  }
  async extendAccount(account, user) {
    return this.pumpProgram.methods.extendAccount().accountsPartial({
      account,
      user
    }).instruction();
  }
  async migrateInstruction(mint, user) {
    return this.pumpProgram.methods.migrate().accountsPartial({
      mint,
      user
    }).instruction();
  }
  async collectCoinCreatorFeeInstructions(coinCreator) {
    return [
      await this.pumpProgram.methods.collectCreatorFee().accountsPartial({
        creator: coinCreator
      }).instruction(),
      ...await this.pumpAmmSdk.collectCoinCreatorFee(coinCreator)
    ];
  }
  async getCreatorVaultBalance(creator) {
    const creatorVault = this.creatorVaultPda(creator);
    const accountInfo = await this.connection.getAccountInfo(creatorVault);
    if (accountInfo === null) {
      return new import_bn4.default(0);
    }
    const rentExemptionLamports = await this.connection.getMinimumBalanceForRentExemption(
      accountInfo.data.length
    );
    if (accountInfo.lamports < rentExemptionLamports) {
      return new import_bn4.default(0);
    }
    return new import_bn4.default(accountInfo.lamports - rentExemptionLamports);
  }
};
__decorateClass([
  memoize(0)
], PumpSdk.prototype, "getGlobal", 1);
__decorateClass([
  memoize(0, (mint) => mint.toBase58())
], PumpSdk.prototype, "cachedBondingCurve", 1);
function getFeeRecipient(global2) {
  const feeRecipients = [global2.feeRecipient, ...global2.feeRecipients];
  return feeRecipients[Math.floor(Math.random() * feeRecipients.length)];
}
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer-layout/lib/Layout.js:
  (**
   * Support for translating between Buffer instances and JavaScript
   * native types.
   *
   * {@link module:Layout~Layout|Layout} is the basis of a class
   * hierarchy that associates property names with sequences of encoded
   * bytes.
   *
   * Layouts are supported for these scalar (numeric) types:
   * * {@link module:Layout~UInt|Unsigned integers in little-endian
   *   format} with {@link module:Layout.u8|8-bit}, {@link
   *   module:Layout.u16|16-bit}, {@link module:Layout.u24|24-bit},
   *   {@link module:Layout.u32|32-bit}, {@link
   *   module:Layout.u40|40-bit}, and {@link module:Layout.u48|48-bit}
   *   representation ranges;
   * * {@link module:Layout~UIntBE|Unsigned integers in big-endian
   *   format} with {@link module:Layout.u16be|16-bit}, {@link
   *   module:Layout.u24be|24-bit}, {@link module:Layout.u32be|32-bit},
   *   {@link module:Layout.u40be|40-bit}, and {@link
   *   module:Layout.u48be|48-bit} representation ranges;
   * * {@link module:Layout~Int|Signed integers in little-endian
   *   format} with {@link module:Layout.s8|8-bit}, {@link
   *   module:Layout.s16|16-bit}, {@link module:Layout.s24|24-bit},
   *   {@link module:Layout.s32|32-bit}, {@link
   *   module:Layout.s40|40-bit}, and {@link module:Layout.s48|48-bit}
   *   representation ranges;
   * * {@link module:Layout~IntBE|Signed integers in big-endian format}
   *   with {@link module:Layout.s16be|16-bit}, {@link
   *   module:Layout.s24be|24-bit}, {@link module:Layout.s32be|32-bit},
   *   {@link module:Layout.s40be|40-bit}, and {@link
   *   module:Layout.s48be|48-bit} representation ranges;
   * * 64-bit integral values that decode to an exact (if magnitude is
   *   less than 2^53) or nearby integral Number in {@link
   *   module:Layout.nu64|unsigned little-endian}, {@link
   *   module:Layout.nu64be|unsigned big-endian}, {@link
   *   module:Layout.ns64|signed little-endian}, and {@link
   *   module:Layout.ns64be|unsigned big-endian} encodings;
   * * 32-bit floating point values with {@link
   *   module:Layout.f32|little-endian} and {@link
   *   module:Layout.f32be|big-endian} representations;
   * * 64-bit floating point values with {@link
   *   module:Layout.f64|little-endian} and {@link
   *   module:Layout.f64be|big-endian} representations;
   * * {@link module:Layout.const|Constants} that take no space in the
   *   encoded expression.
   *
   * and for these aggregate types:
   * * {@link module:Layout.seq|Sequence}s of instances of a {@link
   *   module:Layout~Layout|Layout}, with JavaScript representation as
   *   an Array and constant or data-dependent {@link
   *   module:Layout~Sequence#count|length};
   * * {@link module:Layout.struct|Structure}s that aggregate a
   *   heterogeneous sequence of {@link module:Layout~Layout|Layout}
   *   instances, with JavaScript representation as an Object;
   * * {@link module:Layout.union|Union}s that support multiple {@link
   *   module:Layout~VariantLayout|variant layouts} over a fixed
   *   (padded) or variable (not padded) span of bytes, using an
   *   unsigned integer at the start of the data or a separate {@link
   *   module:Layout.unionLayoutDiscriminator|layout element} to
   *   determine which layout to use when interpreting the buffer
   *   contents;
   * * {@link module:Layout.bits|BitStructure}s that contain a sequence
   *   of individual {@link
   *   module:Layout~BitStructure#addField|BitField}s packed into an 8,
   *   16, 24, or 32-bit unsigned integer starting at the least- or
   *   most-significant bit;
   * * {@link module:Layout.cstr|C strings} of varying length;
   * * {@link module:Layout.blob|Blobs} of fixed- or variable-{@link
   *   module:Layout~Blob#length|length} raw data.
   *
   * All {@link module:Layout~Layout|Layout} instances are immutable
   * after construction, to prevent internal state from becoming
   * inconsistent.
   *
   * @local Layout
   * @local ExternalLayout
   * @local GreedyCount
   * @local OffsetLayout
   * @local UInt
   * @local UIntBE
   * @local Int
   * @local IntBE
   * @local NearUInt64
   * @local NearUInt64BE
   * @local NearInt64
   * @local NearInt64BE
   * @local Float
   * @local FloatBE
   * @local Double
   * @local DoubleBE
   * @local Sequence
   * @local Structure
   * @local UnionDiscriminator
   * @local UnionLayoutDiscriminator
   * @local Union
   * @local VariantLayout
   * @local BitStructure
   * @local BitField
   * @local Boolean
   * @local Blob
   * @local CString
   * @local Constant
   * @local bindConstructorLayout
   * @module Layout
   * @license MIT
   * @author Peter A. Bigot
   * @see {@link https://github.com/pabigot/buffer-layout|buffer-layout on GitHub}
   *)

pako/dist/pako.esm.mjs:
  (*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) *)
*/
//# sourceMappingURL=index.js.map