/**
* @jest-environment jsdom
*/

import itemCounter from '../item-counter';

document.body.innerHTML = '<div id="item-counter"></div><div id="kanbanBoard"></div>';

const append3items = () => {
  const div = document.createElement('div');
  div.setAttribute('class', 'row');
  div.innerHTML = `<div class='item-card'></div>
                <div class='item-card'></div>
                <div class='item-card'></div>`;
  document.querySelector('#kanbanBoard').appendChild(div);
};

describe('Test counterItems', () => {
  test('Counter items Case 1', () => {
    append3items();
    const div = document.querySelector('#kanbanBoard');
    itemCounter(div);
    expect('Shows (3)').toBe(document.querySelector('#item-counter').textContent);
  });
  test('Counter items Case 2', () => {
    append3items();
    const div = document.querySelector('#kanbanBoard');
    itemCounter(div);
    expect('Shows (6)').toBe(document.querySelector('#item-counter').textContent);
  });
  test('Counter items Case 1', () => {
    append3items();
    const div = document.querySelector('#kanbanBoard');
    itemCounter(div);
    expect('Shows (9)').toBe(document.querySelector('#item-counter').textContent);
  });
});