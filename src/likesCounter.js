export async function countLikes() {
  const likeIcons = document.querySelectorAll(".like-icon");
  const likePromises = [];

  likeIcons.forEach((likeIcon) => {
    const itemId = likeIcon
      .closest(".item-card")
      .querySelector(".comments-button")
      .getAttribute("data-item-id");
    const apiUrl = `https://involvement-api.com/likes/${itemId}`;

    const promise = fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok. Status: ${response.status}`
          );
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error counting likes:", error);
        return { likes: 0 };
      });

    likePromises.push(promise);
  });

  try {
    const responses = await Promise.all(likePromises);

    likeIcons.forEach((likeIcon, index) => {
      const updatedLikeCount = responses[index].likes || 0;
      const likeCountElement = likeIcon.nextElementSibling;
      likeCountElement.textContent = updatedLikeCount;
    });
  } catch (error) {
    console.error("Error counting likes:", error);
  }
}
