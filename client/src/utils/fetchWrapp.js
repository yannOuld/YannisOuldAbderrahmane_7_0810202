import { useAuthStore } from '../stores/auth';


// wrapp des requetes fetchs sert a mettre en place les procédures selon les requetes 
export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

// decomposition du corps de la requete fetch dans une fonction
function request(method) {
    return (url, body) => {
        // options du fetch avec la method (GET,POST,PUT,DELETE) et la fonction authHeader si il y a besoin d'un token d'identification
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        // mise en place des headers en cas de body : type de contenu et mise en forme en  chaine de caracter du corps de la requetes
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        // envoie du fetch et prise en charge avec la fonction handleResponse de la reponse de l'api
        return fetch(url, requestOptions).then(handleResponse);
    }
}


// fonctions d'envoie du token pour les headers des requetes fetch quand l'utilisateur est connecté
function authHeader(url) {

    // variable user du store d'authentification 
    const { userData } = useAuthStore();

    // verification deu user token 
    const isLoggedIn = !!userData?.token;

    // on verifie que l'url de l'url de  l'api est correcte 
    const isApiUrl = url.startsWith('http://localhost:3000/api');

    // si il y a un token et que l'api est correcte
    if (isLoggedIn && isApiUrl) {
        // alors le token d'authentification des requetes fetch est le user token 
        return { Authorization: `Bearer ${userData.token}` };
    } else {
        // sinon en renvoie un objet vide à la place du headers des requetes
        return {};
    }
}

// fonction de prise en charge de la réponse et déconnection en cas de réponse 401 (fetch non autorisé ) ou 403 (navigateur n'a pas la permission de voir la page demander )
function handleResponse(response) {

    //recuperation et parse du texte de la reponse 
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        // si la requete a echouée 
        if (!response.ok) {
            //récuperation de la fonction logout du store auth
            const { userData, logout } = useAuthStore();
            if ([401, 403].includes(response.status) && userData) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
            }
            //retour du message d'erreur 
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        // envoie du texte de la reponse fetch
        return data;
    });
}