import './index.css';
import './popUp.css';

let id = '';

const getid = async () => {
  const data = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => res.json())
    .then((data) => data);
    [, , , id] = data.result.split(' ');
};

getid();

