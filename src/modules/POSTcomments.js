const POSTcomment = async (path, id) => {
  const userName = document.querySelector('#f-name').value;
  const text = document.querySelector('#f-text').value;
  await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': ' application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      item_id: `${id}`,
      username: userName,
      comment: text,
    }),
  }).then((res) => res.json()).then((data) => data);
};

export default POSTcomment;