// eslint-disable-next-line import/no-cycle
import displayComments from './displayComments';

const POSTcomment = async (id) => {
  const userName = document.querySelector('#f-name').value;
  const text = document.querySelector('#f-text').value;
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ak1TTqB18F0chgbGj32L/comments/?item_id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': ' application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      item_id: `${id}`,
      username: userName,
      comment: text,
    }),
  }).then(() => {
    document.querySelector('form').reset();
  });

  displayComments(id);
};

export default POSTcomment;