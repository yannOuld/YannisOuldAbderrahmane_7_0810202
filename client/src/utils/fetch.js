const myfetch = async (method, query, body, token) => {
    return fetch('http://localhost:3000/api' + query, {
        method, body: body && JSON.stringify(body), headers: { "content-type": "application/json; charset=utf-8" }, Bearer: { 'token': token }
    }).then((res) =>
        res.headers.get("Content-Type").startsWith("application/json")
            ? res.json()
            : res.text()
    )
}
export default myfetch;