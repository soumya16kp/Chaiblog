import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite"; // Fixed typo in Query

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ tittle, slug, content, featuredImage, status, userId,description }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                    userId,
                    description,
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, { tittle, content, featuredImage, status,description }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                    description
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost error", error);
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId, // Fixed order of arguments
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                
            );
            
        } catch (error) {
            console.log("Appwrite service :: getPosts error", error);
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile error", error);
            return false;
        }
    }

    
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
    
}

const service = new Service();
export default service;
