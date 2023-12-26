class Api {
  constructor(options) {
    this._options = options;
  }
  _checkResponse(res) {
    if (res.ok) {return res.json()}
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  }
  
  setUserInfo(name, about) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      }),
    }).then(this._checkResponse)
  }

  generateCard(mesto, link) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: mesto,
        link: link
      }),
    }).then(this._checkResponse)
  }

  deleteCard(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  }

  likeCard(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  }

  deleteLikeCard(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  }

  addAvatar(avatar) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      }),
    }).then(this._checkResponse)
  }
}
const api = new Api({
  baseUrl: 'https://api.zhenya.nomoredomainsmonster.ru/'
});

export {api};
export {Api};
