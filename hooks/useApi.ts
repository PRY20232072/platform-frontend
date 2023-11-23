import { useState } from "react";
import { AxiosResponse } from "axios";

interface IResponse {
    data: any;
    isLoading: boolean;
    error: any;
    isSuccess: boolean;
}

export const useApi = () => {
    const [response, setResponse] = useState<IResponse>({
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
            })
            .catch((error) => {
                setResponse({
                    data: error,
                    isLoading: false,
                    error: error,
                    isSuccess: false
                });
            });
    };

    return {response, fetchData};
};