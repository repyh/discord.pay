module.exports = async (client, {user_id, item}) => {
    const user = client.users.cache.get(user_id) || await client.users.fetch(user_id);
    console.log(`${user.username} is a chad.`)
}