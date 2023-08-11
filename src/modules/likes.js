// likes.js

// Function to fetch likes for a specific item
export async function fetchLikes(itemId) {
  const apiUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ak1TTqB18F0chgbGj32L/likes?item_id=${itemId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data.likes || 0;
  } catch (error) {
    console.error("Error fetching like count:", error);
    return 0;
  }
}

// Function to post a like for a specific item
export async function postLike(itemId) {
  const apiUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ak1TTqB18F0chgbGj32L/likes`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_id: itemId }),
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }

    return true; // Like was successfully posted
  } catch (error) {
    console.error("Error posting like:", error);
    return false;
  }
}

// Function to update like count in UI
export function updateLikeCountUI(card, updatedLikes) {
  const likeCountElement = card.querySelector(".like-count");
  likeCountElement.textContent = updatedLikes;
}
