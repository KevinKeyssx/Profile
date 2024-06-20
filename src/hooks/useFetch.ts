export const useFetch = async<T> ( url: string, method: string, body?: BodyInit, headers?: HeadersInit ) => {

    const response = await fetch(url, {
        method,
        body,
        headers
    });

    return await response.json() as T;
}
