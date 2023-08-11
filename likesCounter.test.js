/**
 * @jest-environment jsdom
 */

import { countLikes } from './src/likesCounter'; // Adjust the import path if needed

document.body.innerHTML = '<h3>Likes</h3><p class="cont">()</p>';

let likes;

describe('Test Counter Likes', () => {
  test('Counter likes Case 1', () => {
    likes = [
      { item_id: 1, likes: 5 },
      { item_id: 2, likes: 2  },
      { item_id: 3, likes: 6},
    ];
    likesCounter(likes, 1);
    if (likes.length !== undefined) res = `(${likes.length})`;
    expect(document.querySelector('.cont').textContent).toBe(res);
  });

  test('Counter likes Case 2', () => {
    likes = [
      { item_id 1, username: 'Bianca' },
      {item_id: 2, username: 'Melanie' },
      { item_id 3, username: 'User' },
      { item_id 4, username: 'User' },
      { item_id 5, username: 'User' },
    ];
    countLikes(likes);
    let res = '(0)';
    if (likes.length !== undefined) res = `(${likes.length})`;
    expect(document.querySelector('.cont').textContent).toBe(res);
  });

  test('Counter likes Case 3', () => {
    likes = [];
    countLikes(likes);
    let res = '(7)';
    if (likes.length !== undefined) res = `(${likes.length})`;
    expect(document.querySelector('.cont').textContent).toBe(res);
  });
});
