/**
 * @jest-environment jsdom
 */

import { countLikes } from './src/likesCounter'; // Adjust the import path if needed

document.body.innerHTML = '<h3>Likes</h3><p class="cont">()</p>';

let likes;

describe('Test Counter Likes', () => {
  test('Counter likes Case 1', () => {
    likes = [
      { id: 1, username: 'Bianca' },
      { id: 2, username: 'Melanie' },
      { id: 3, username: 'User' },
    ];
    countLikes(likes);
    let res = '(0)';
    if (likes.length !== undefined) res = `(${likes.length})`;
    expect(document.querySelector('.cont').textContent).toBe(res);
  });

  test('Counter likes Case 2', () => {
    likes = [
      { id: 1, username: 'Bianca' },
      { id: 2, username: 'Melanie' },
      { id: 3, username: 'User' },
      { id: 4, username: 'User' },
      { id: 5, username: 'User' },
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
