exports.thinObject = (obj) => {
  if (obj && obj.id) return {id: obj.id, name: obj.name};
  return null;
};

exports.standarizeData = (docData, id) => {
  const data = {
    ...docData,
    createdAt: docData.createdAt.toDate(),
    updatedAt: docData.updatedAt.toDate(),
    id: id,
  };
  return data;
};
