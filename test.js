function writeToFile(filename, data) {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Data has been written to ${filename}`);
        }
    });
}

class JsonPlaceholderApi {
    baseUrl = 'https://jsonplaceholder.typicode.com';
  
    async fetchData(endpoint) { //общий метож
      const response = await fetch(`${this.baseUrl}/${endpoint}`);
      if (!response.ok) {
        throw new Error('An error occurred while fetching the data.');
      }
      return await response.json();
    }
  
    async getUsers() { //получение всех пользователей
      return await this.fetchData('users');
    }
  
    async getUserPosts(userId) {//все посты конкретного пользователя
      return await this.fetchData(`posts?userId=${userId}`);
    }
  
    async getUserTodos(userId) { // все задания 
      return await this.fetchData(`todos?userId=${userId}`);
    }
  
    async getPost(postId) { //получение конкретного поста
      return await this.fetchData(`posts/${postId}`);
    }
  
    async createPost(data) { //метод создания нового поста
      const response = await fetch(`${this.baseUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    }
  
    async updatePost(postId, data) { ///обновление существующего поста
      const response = await fetch(`${this.baseUrl}/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    }
  
    async deletePost(postId) { //удаление поста 
      const response = await fetch(`${this.baseUrl}/posts/${postId}`, {
        method: 'DELETE',
      });
      return response.ok;
    }
  }
  const fs = require('fs');
  const api = new JsonPlaceholderApi();

//   api.getUsers().then(users => console.log(users)); как выводить данные в терминал
//   api.getUserPosts(1).then(posts => console.log(posts));
//   api.getUserTodos(1).then(todos => console.log(todos));
  
api.getUsers().then(users => writeToFile('users.json', users));
api.getUserPosts(1).then(posts => writeToFile('posts.json', posts));
api.getUserTodos(1).then(todos => writeToFile('todos.json', todos));