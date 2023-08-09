const getComments = async (path) => {
  try {
    const data = await fetch(path);
    const comments = await data.json();
    return comments.resultl;
  } catch (error) {
    return error
  }
};

export default getComments;