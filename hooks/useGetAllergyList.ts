import allergyIntoleranceService from '@/services/allergyIntoleranceService';
import { useApi } from '@/hooks/useApi';
import { useEffect } from 'react';

export const useGetAllergyList = () => {
    const { response, fetchData } = useApi();

    
    
    useEffect(() => {
        fetchData(allergyIntoleranceService.getAllergyList());
    }, []);
    
    return { response };
};
