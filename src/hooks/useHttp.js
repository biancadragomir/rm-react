import { useState, useEffect } from 'react';
import { apiUrl } from '../core/api'

export const useHttp = (route, dependencies) => {

    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    const completeUrl = apiUrl + route;

    useEffect(() => {
        console.log("Making http request to URL: " + completeUrl)
        setIsLoading(true);
        fetch(completeUrl)
            .then(response => {
                if (!response.ok) {
                    setIsLoading(false);
                    throw new Error('Failed to fetch.');
                }
                return response.json();
            })
            .then(data => {
                setIsLoading(false);
                setFetchedData(data);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, dependencies);

    // We are going to return an array of states since we need those states outside of the hook, inside of the components
    // where we'll use it. 
    return [isLoading, fetchedData]
}