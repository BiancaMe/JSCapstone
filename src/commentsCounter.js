export async function countComments() {
  const commentIcons = document.querySelectorAll(".comment-icon");
  const commentPromises = [];

  commentIcons.forEach((commentIcon) => {
    const itemId = commentIcon
      .closest(".item-card")
      .querySelector(".comments-button")
      .getAttribute("data-item-id");
    const apiUrl = `https://involvement-api.com/comments/${itemId}`;

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
        console.error("Error counting comments:", error);
        return { comments: 0 };
      });

    commentPromises.push(promise);
  });

  try {
    const responses = await Promise.all(commentPromises);

    commentIcons.forEach((commentIcon, index) => {
      const updatedCommentCount = responses[index].comments || 0;
      const commentCountElement = commentIcon.nextElementSibling;
      commentCountElement.textContent = updatedCommentCount;
    });
  } catch (error) {
    console.error("Error counting comments:", error);
  }
}
