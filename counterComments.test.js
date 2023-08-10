/**
* @jest-environment jsdom
*/

import { setCounter } from './src/modules/comments';
import { getComments } from './src/modules/GETcomments';

document.body.innerHTML = '<h3>Comments</h3><p class="cont">()</p>';

let comments;

describe('Test Counter Comments', () => {
  test('Counter comments Case 1', () => {
    comments = [{ comment: 'Hola', creation_date: '2023-08-10', username: 'Bianca' },
      { comment: 'testingggggg', creation_date: '2023-08-10', username: 'Melanie' },
      { comment: 'testinggg', creation_date: '2023-08-10', username: 'User' },
      { comment: 'testinggg', creation_date: '2023-08-10', username: 'User' },
      { comment: 'testinggg', creation_date: '2023-08-10', username: 'User' },
    ];
    setCounter(comments);
    let res = '(0)';
    if (comments.length !== undefined) res = `(${comments.length})`;
    expect(document.querySelector('.cont').textContent).toBe(res);
  });

  test('Counter comments Case 2', () => {

    comments = [{ comment: 'Hola', creation_date: '2023-08-10', username: 'Bianca' },
      { comment: 'testingggggg', creation_date: '2023-08-10', username: 'Melanie' },
      { comment: 'testinggg', creation_date: '2023-08-10', username: 'User' },
      { comment: 'testinggg', creation_date: '2023-08-10', username: 'User' },
      { comment: 'testinggg', creation_date: '2023-08-10', username: 'User' },
      { comment: 'testinggg', creation_date: '2023-08-10', username: 'User' },
      { comment: 'testinggg', creation_date: '2023-08-10', username: 'User' },
      { comment: 'testinggg', creation_date: '2023-08-10', username: 'User' },
    ];
    setCounter(comments);
    let res = '(0)';
    if (comments.length !== undefined) res = `(${comments.length})`;
    expect(document.querySelector('.cont').textContent).toBe(res);
  });

  test('Counter comments Case 3',  () => {
    comments = [];
    setCounter(comments);
    let res = '(11)';
    if (comments.length !== undefined) res = `(${comments.length})`;
    expect(document.querySelector('.cont').textContent).toBe(res);
  });
});