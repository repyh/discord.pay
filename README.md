# discord.pay
Express server setup for easy payment with paypal-rest-sdk for Discord Bots

> ## Changelog
- New store page design.
- Save ID feature.

> ## What is discord.pay?
discord.pay is an express server that you can clone to integrate with your discord bot to easily add payment. discord.pay are made to be a standalone website apart from your discord bot.

> ## Cloning
1. Using `degit` - `$ npx degit repyh/discord.pay`
2. Git clone - `$ git clone https://github.com/repyh/discord.pay`

> ## What do I do?
Just a reminder, you obviously need to have a PayPal account.
1. Make a new application in https://developer.paypal.com/
2. Clone this repo.
3. Copy the application id and secret and paste it into `.env` file to their place.
4. If you're not hosting this on your local system (which is more likely), you'd need to replace all `http://localhost:2000/` in the file with your domain/ip. It should automatically fill it in for you but incase, it doesn't work, do the above. (This also needs to be done in the client-side javascript)
5. Copy your discord bot token and pate it into the `.env` file.
6. Run `node index.js`
7. Done! Your server should be running and listen to all the payments made! To go checkout your page, goto your domain/ip.

### onSuccess
You can add all the functionality to either modify or do something to the user that successfully made a purchase inside `/functions/onSuccess.js` file.

### Adding Products/Items
You can add and customize your products/items in the `items.json` file. Its pretty self-explanatory.

### Customizing
You can customize your store page by going into the `views` folder. discord.pay uses ejs for easier use.

### Production Mode
Once you're done testing your stuffs, you can go agead and change the `mode` property in `paypal.configure` function into `live`. For reference, you can google `paypal developer sandbox and live mode`.
`
I'm pretty bad at explaining stuffs and I accidentally deleted the previous draft and I only made this as quick as I can.
Many features will come soon and this will be updated too.

> ## Screenshot
[![ex.png](https://i.postimg.cc/xjhFzGWX/ex.png)](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
