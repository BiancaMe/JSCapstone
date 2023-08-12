/**
 * @jest-environment jsdom
 */

import { likesCounter } from '../modules/likes.js'; // Adjust the import path if needed

document.body.innerHTML = '<h3>Likes</h3><p class="cont">()</p>';

const likes = [
  { item_id: 1, likes: 5 },
  { item_id: 2, likes: 2 },
  { item_id: 3, likes: 6 },
];

describe('Test Counter Likes', () => {
  test('Counter likes Case 1', () => {
    const res = likesCounter(likes, 1);
    expect(5).toBe(res);
  });

  test('Counter likes Case 2', () => {
    const res = likesCounter(likes, 2);
    expect(2).toBe(res);
  });

  test('Counter likes Case 3', () => {
    const res = likesCounter(likes, 8);
    expect(0).toBe(res);
  });
});
