class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  addNewCard({name, link}) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  changeAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
      credentials: 'include',
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.ciganru.nomoreparties.co',
  headers: {
    authorization: 'd7db98be-0f68-4b1c-bf6a-476af911ba25',
    'Content-Type': 'application/json',
  },
});

export default api;
