const totalLikes = (blogs) => {
  let result = 0;

  blogs.forEach((element) => {
    result += element.likes;
  });

  return result;
};

const favoriteBlog = (blogs) => {
  let res = Math.max.apply(
    Math,
    blogs.map(function (curr) {
      return curr.likes;
    })
  );

  return blogs.find((curr) => curr.likes === res);
};

module.exports = {
  totalLikes,
  favoriteBlog,
};
