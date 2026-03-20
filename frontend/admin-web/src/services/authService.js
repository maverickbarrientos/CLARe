    import authApi from "./authApi";

    export const login = async ( email, password ) => {

        const formData = new URLSearchParams();
        formData.append('grant_type', 'password');
        formData.append('username', email);
        formData.append('password', password);
        formData.append('scope', '');
        formData.append('client_id', 'string');
        formData.append('client_secret', '');

        const response = await authApi.post("/auth/jwt/login", formData.toString());

        console.log("response", response)

        const { access_token } = response.data;

        try {
            localStorage.setItem('access_token', access_token);
            console.log("Token saved successfullly");
        } catch (error) {
            console.log("Local Storage error : ", error);
        }

        return response;

    }