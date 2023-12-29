import $api from '../http';

export default class AuthService {
    static async login(email, password) {
        return $api.post('/auth/login', {email, password});
    }

    static async logout() {
        return $api.post('/auth/logout');
    }

    static async fetchUser() {
        return $api.get('/auth/me');
    }

    static async refresh() {
        return $api.post('/auth/refresh');
    }
}
