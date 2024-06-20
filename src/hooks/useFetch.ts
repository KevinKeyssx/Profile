// eslint-disable-next-line no-undef
export const useFetch = async<T> ( url: string, method: string, body?: BodyInit, headers?: HeadersInit ) => {

    // eslint-disable-next-line no-undef
    const response = await fetch(url, {
        method,
        body,
        headers
    });

    return await response.json() as T;
}
