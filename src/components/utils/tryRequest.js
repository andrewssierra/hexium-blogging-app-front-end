export const tryQuery = async (query, client) => {
    let result;
    try {
        result = await client.query({
            query
        });
    } catch (err) {
        alert(err.message);
        console.log(err.message);
    }
    return result;
};

export const tryMutation = async (mutation, client, variables) => {
    let result;
    try {
        result = await client.mutate({
            mutation,
            variables
        });
    } catch (err) {
        alert(err.message);
        console.log(err.message);
    }
    return result;
};
