export const tryQuery = async (query, client) => {
    let result;
    try {
        result = await client.query({
            query: query
        });
    } catch (err) {
        alert('error.message');
        console.log(err.message);
    }
    return result;
};
