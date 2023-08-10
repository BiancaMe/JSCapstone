import countLikes from '../src/countLikes';

describe('countLikes function', () => {
  // Mock fetch function globally
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => ({ likes: 5 }) }));

  // Clear mock after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should update like count correctly', async () => {
    // Create a dummy DOM structure for testing
    document.body.innerHTML = `
      <div class="item-card">
        <span class="like-icon">❤️</span>
        <span class="like-count">0</span>
        <button class="comments-button" data-item-id="item1">Comments</button>
      </div>
      <div class="item-card">
        <span class="like-icon">❤️</span>
        <span class="like-count">0</span>
        <button class="comments-button" data-item-id="item2">Comments</button>
      </div>
    `;

    // Call the countLikes function
    await countLikes();

    // Verify that fetch was called for both items
    expect(fetch).toHaveBeenCalledTimes(2);

    // Verify that like count was updated for both items
    const likeCountElements = document.querySelectorAll('.like-count');
    expect(likeCountElements[0].textContent).toBe('5');
    expect(likeCountElements[1].textContent).toBe('5');
  });

  test('should handle fetch error', async () => {
    // Mock fetch to simulate an error
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

    // Call the countLikes function
    await countLikes();

    // Verify that fetch was called
    expect(fetch).toHaveBeenCalledTimes(2);

    // Verify that error handling is triggered
    const likeCountElements = document.querySelectorAll('.like-count');
    expect(likeCountElements[0].textContent).toBe('0');
    expect(likeCountElements[1].textContent).toBe('0');
  });
});
