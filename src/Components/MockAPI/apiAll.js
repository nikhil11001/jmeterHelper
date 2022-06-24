const api = [
    {
        "apiName": "Get Post",
        "apiPath": "https://jsonplaceholder.typicode.com/posts",
        "httpMethod": "GET",
        "requestBody": ""
    },
    {
        "apiName": "Add Post",
        "apiPath": "https://jsonplaceholder.typicode.com/posts",
        "httpMethod": 'POST',
        "requestBody": JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        "headers": {
        'Content-type': 'application/json; charset=UTF-8',
        },
    },
    {
        "apiName": "Updating Post",
        "apiPath": "https://jsonplaceholder.typicode.com/posts/10",
        "httpMethod": 'PUT',
        "requestBody": JSON.stringify({
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1,
          }),
        "headers": {
        'Content-type': 'application/json; charset=UTF-8',
        },
    },
    {
        "apiName": "Deleting Post",
        "apiPath": "https://jsonplaceholder.typicode.com/posts/1",
        "httpMethod": 'DELETE',
    },
]

export default api;