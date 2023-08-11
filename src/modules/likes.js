// likes.js

// Function to fetch likes for a specific item
export const fetchLikes = async () => {
  const apiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ak1TTqB18F0chgbGj32L/likes';
  try {
    const data = await fetch(apiUrl);
    const likes = await data.json();
    return likes;
  } catch (error) {
    return error;
  }
};

const likesCounter = (likes, idItem) => {
  const likesArr = Array.from(likes);
  const res = likesArr.find((obj) => obj.item_id === idItem);
  if (res === undefined) return 0;
  return res.likes;
};

export const getLikes = async (idItem) => {
  const likes = await fetchLikes();
  return likesCounter(likes, idItem);
};

// Function to post a like for a specific item
export const postLike = async (itemId) => {
  const apiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ak1TTqB18F0chgbGj32L/likes';
  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': ' application/json; charset=UTF-8',
    },
    body: JSON.stringify({
       item_id: itemId,
    }),
  }).then(() => { console.log('posted'); });
};

// Function to update like count in UI
export function updateLikeCountUI(card, likes) {
  const likeCountElement = card.querySelector('.like-count');
  likeCountElement.innerHTML = likes;
}
