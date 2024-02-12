const express = require('express');
const app = express();

const CharacterAI = require("node_characterai");
const characterAI = new CharacterAI();

const { Log_in } = require('character.ai/dist'); // Change import to require

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    try {
        const auth = async () => {
            // Authenticating as a guest (use `.authenticateWithToken()` to use an account)
            await characterAI.authenticateWithToken("1528f735797b314cf21b0c78c238bcfe46580b0a");

            // Place your character's id here
            const characterId = "srIDzyWFRvShfPXvWrdJU5Y7Ryr80NlWE_KclaE28mQ";

            const chat = await characterAI.createOrContinueChat(characterId);

            // Send a message
            const response = await chat.sendAndAwaitResponse("Chào Bác, Bác có thể giới thiệu những thành tích nổi bật của Bác không?", true);
            //const response = await chat.getSavedConversations(20);
            const response2 = await characterAI.searchCharacters("Võ Nguyên Giáp");
            // let history = response.histories[0].msgs.map((h) => {
            //     return {
            //         "id": h.id,
            //         "text": h.text,
            //     }
            // });

            res.send(response);
        }
        auth();
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}
);

app.get('/search', (req, res) => {
    try {
        const auth = async () => {
            // Authenticating as a guest (use `.authenticateWithToken()` to use an account)
            await characterAI.authenticateWithToken("1528f735797b314cf21b0c78c238bcfe46580b0a");
            const response = await characterAI.searchCharacters("Tran Hung Dao");

            res.send(response);
        }
        auth();
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}
);

app.get('/chat', async (req, res) => {
    try {
        // Authenticating as a guest (use `.authenticateWithToken()` to use an account)
        if (!characterAI.isAuthenticated()) {
            await characterAI.authenticateWithToken("1528f735797b314cf21b0c78c238bcfe46580b0a");
        }

        // Place your character's id here
        const characterId = "Owi1SGQug7Zhr3wYbFw6Z4UHAwTRi50fjxsKD6t_NLM";
        const chat = await characterAI.createOrContinueChat(characterId);

        const messageRequest = req.query.message;
        console.log(messageRequest);

        // Send a message
        const response = await chat.sendAndAwaitResponse(messageRequest, true);

        console.log(response);

        res.send(response);
    } catch (error) {
        // Handle the error and send an error response
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = app;