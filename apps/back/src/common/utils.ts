export const addKeyFromExistingField = (node, newKey, field) => {
  if (Array.isArray(node)) {
    node.forEach((item) => addKeyFromExistingField(item, newKey, field));
  } else if (typeof node === 'object') {
    if (node[field]) {
      node[newKey] = node[field];
    }
    for (const key in node) {
      if (typeof node[key] === 'object') {
        addKeyFromExistingField(node[key], newKey, field);
      }
    }
  }

  return node;
};

export const renameKey = (node, newKey, oldKey) => {
  if (Array.isArray(node)) {
    node.forEach((item) => renameKey(item, newKey, oldKey)); // Change "changeKeyTo" to "renameKey"
  } else if (typeof node === 'object') {
    if (node[oldKey]) {
      node[newKey] = node[oldKey];
      delete node[oldKey]; // Remove the old key
    }
    for (const key in node) {
      if (typeof node[key] === 'object') {
        renameKey(node[key], newKey, oldKey); // Change "changeKeyTo" to "renameKey"
      }
    }
  }

  return node;
};
