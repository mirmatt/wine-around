declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGODB_URI: string;
            NEXT_PUBLIC_BASE_API_URL: string;
            NEXT_PUBLIC_GET_ENDPOINT: string;
            NEXT_PUBLIC_UPDATE_ENDPOINT: string;
            NEXT_PUBLIC_DELETE_ENDPOINT: string;
            NEXT_PUBLIC_TOGGLE_ENDPOINT: string;
        }
    }
}

export { }