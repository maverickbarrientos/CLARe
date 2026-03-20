import authApi from "./authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async ( username: string, password: string ) => {
    
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);
    formData.append('scope', '');
    formData.append('client_id', 'string');
    formData.append('client_secret', '');

    const response = await authApi.post('/auth/jwt/login', formData.toString());

    console.log("response data:", response.data);

    const { access_token, refresh_token } = response.data;
    try {
        await AsyncStorage.setItem('access_token', access_token);
        console.log("token saved successfully");
    } catch (storageErr) {
        console.log("AsyncStorage error:", storageErr);
    }

    return response.data;
}

export const logout = async () => {

    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');

}