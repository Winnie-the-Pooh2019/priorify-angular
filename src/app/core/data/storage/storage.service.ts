import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    setItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem<T>(key: string): T | null {
        const data = localStorage.getItem(key);

        if (data) {
            return JSON.parse(data) as T;
        }

        return null;
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}
