const itemCounter = (div) => {
  const numberItmes = document.getElementById('item-counter');
 numberItmes.innerHTML = `Shows (${div.getElementsByClassName('item-card').length})`;
};

export default itemCounter;
