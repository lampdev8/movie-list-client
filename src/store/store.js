import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';

export default class Store {
    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(email, password, errorCallback) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('access_token', response.data.data.access_token);
            this.setAuth(true);
            this.fetchUser();
        } catch(error) {
            console.error(error.message);
            errorCallback(error.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
        } catch(error) {
            console.error(error.message);
        } finally {
            this.setAuth(false);
            this.setUser({});
            localStorage.removeItem('access_token');
        }
    }

    async fetchUser() {
        try {
            const response = await AuthService.fetchUser();
            this.setAuth(true);
            this.setUser(response.data.data);
        } catch(error) {
            console.error(error.message);
        }
    }
}
