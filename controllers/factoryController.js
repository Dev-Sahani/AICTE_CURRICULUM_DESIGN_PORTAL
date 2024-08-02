const filterAPI = require("../utils/filterAPI");

exports.postOne = (Model) => async (req, res, next) => {
  const data = await Model.create(req.body);
  res.status(200).send({
    status: "success",
    data,
  });
};
exports.patchOne = (Model) => async (req, res, next) => {
  const data = await Model.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send({
    status: "success",
    data,
  });
};
exports.getOne = (Model) => async (req, res, next) => {
  const data = await Model.findById(req.params.id);
  res.status(200).send({
    status: "success",
    data,
  });
};

exports.getByQuery = (Model) => async (req, res, next) => {
  const query = Model.find();
  const filteredQuery = new filterAPI(query, req.query)
    .sort()
    .select()
    .paging();
  const data = await filteredQuery.query;
  res.status(200).send({
    status: "success",
    length: data.length,
    data,
  });
};

exports.deleteById = (Model) =>
  async function (req, res, next) {
    const id = req.params.id;
    const data = await Model.deleteOne({ _id: id });
    if (!data) {
      return next(new BAD_REQUEST("data with given id not found"));
    } else {
      res.status(200).send({
        status: "success",
        data,
      });
    }
  };
