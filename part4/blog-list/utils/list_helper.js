const totalLikes = (blogs) => {
  let result = 0;

  blogs.forEach((element) => {
    result += element.likes;
  });

  return result;
};

module.exports = {
  totalLikes,
};
