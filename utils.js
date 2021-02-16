const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const toSnake = (s) => {
  const result = s.replace(/([A-Z])/g, " $1");
  return result.split(" ").join("_").toLowerCase();
};

const isArray = (a) => {
  return Array.isArray(a);
};

const isObject = (o) => {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

const camelize = (o) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = camelize(o[k]);
    });
    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return camelize(i);
    });
  }

  return o;
};

const decamelize = (o) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toSnake(k)] = decamelize(o[k]);
    });
    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return decamelize(i);
    });
  }

  return o;
};

module.exports = {
  camelize, decamelize
};
