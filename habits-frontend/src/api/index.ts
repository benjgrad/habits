import { Client as Appwrite, Databases, Account, Permission, Role, Models } from 'appwrite';
import { Server } from '../utils/config';

export type SdkType = {
    database: Databases,
    account: Account
}

export type ApiType = {
    sdk: SdkType | null,
    provider: () => SdkType,
    createAccount: (email: string, password: string, name: string) => Promise<Models.User<Models.Preferences>>,
    getAccount: () => Promise<Models.User<Models.Preferences>>,
    createSession: (email: string, password: string) => Promise<Models.Session>,
    deleteCurrentSession: () => Promise<{}>,
    createDocument: (collectionId: string, data: any, userId: string) => Promise<Models.Document>,
    listDocuments: (collectionId: string) => Promise<Models.DocumentList<Models.Document>>,
    updateDocument: (collectionId: string, documentId: string, data: any) => Promise<Models.Document>,
    deleteDocument: (collectionId: string, documentId: string) => Promise<{}>,
}


let api: ApiType = {
    sdk: null,

    provider: () => {
        if (api.sdk) {
            return api.sdk;
        }
        let appwrite = new Appwrite();
        appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
        const account = new Account(appwrite);
        const database = new Databases(appwrite);// TODO, Server.database);

        api.sdk = { database, account };
        return api.sdk;
    },

    createAccount: (email, password, name) => {
        return api.provider().account.create('unique()', email, password, name);
    },

    getAccount: () => {
        return api.provider().account.get();
    },

    createSession: (email, password) => {
        return api.provider().account.createEmailSession(email, password);
    },

    deleteCurrentSession: () => {
        return api.provider().account.deleteSession('current');
    },

    createDocument: (collectionId, data, userId) => {
        return api
            .provider()
            .database.createDocument(Server.database, collectionId, 'unique()', data, [
                Permission.read(Role.user(userId)),
                Permission.update(Role.user(userId)),
                Permission.delete(Role.user(userId))
            ]);
    },

    listDocuments: (collectionId) => {
        return api.provider().database.listDocuments(Server.database, collectionId);
    },

    updateDocument: (collectionId, documentId, data) => {
        return api
            .provider()
            .database.updateDocument(Server.database, collectionId, documentId, data);
    },

    deleteDocument: (collectionId, documentId) => {
        return api.provider().database.deleteDocument(Server.database, collectionId, documentId);
    },
};

export default api;