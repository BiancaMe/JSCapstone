const getComments = async (path) => {
  try {
    const data = await fetch(path);
    const comments = await data.json();
    return comments;
  } catch (error) {
    return error;
  }
};

export default getComments;