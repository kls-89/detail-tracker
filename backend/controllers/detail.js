const getDetail = (req, res, next) => {
  res.send('Detail');
};

const postDetail = (req, res, next) => {
  res.send('post Detail');
};

const putDetail = (req, res, next) => {
  res.send('put Detail');
};

const deleteDetail = (req, res, next) => {
  res.send('delete this Detail.');
};

module.exports = {
  getDetail,
  postDetail,
  putDetail,
  deleteDetail
};
