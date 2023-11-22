import { useState } from "react";
import { AxiosResponse } from "axios";

export const useApi = () => {
    const [response, setResponse] = useState({
        data: null,
        isLoading: false,
        error: null,
        isSuccess: false
    });

    const fetchData = async (apiFunction: Promise<AxiosResponse<any, any>>) => {
        setResponse({ 
            data: null,
            isLoading: true,
            error: null,
            isSuccess: false
        })
        
        await apiFunction
            .then((response) => {
                setResponse({
                    data: response.data,
                    isLoading: false,
                    error: null,
                    isSuccess: true
                });
                console.log(response.data);
            })
            .catch((error) => {
                setResponse({
                    data: null,
                    isLoading: false,
                    error: error,
                    isSuccess: false
                });
            });
    };

    return {response, fetchData};
};