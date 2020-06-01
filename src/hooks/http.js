import { useState, useEffect } from 'react';

export const useHttp = (url, dependencies) => {

    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        console.log("Making http request to URL: " + url)
        setIsLoading(true);
        fetch(url)
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