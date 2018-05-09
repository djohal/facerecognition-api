const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'de4b333d46fa4fa4b6245a4cb389c49f'
});

const handleImageApiCall = () => (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Unable to fetch image api'));
}

const handleImage = (db) => (req, res) => {
    const {
        id
    } = req.body;

    db('users')
        .where({
            id
        })
        .increment('entries', 1)
        .returning('entries')
        .then(count => {
            count[0] ?
                res.json(count[0]) :
                res.status(404).json('Unable to get entries!');
        })
        .catch(err => res.status(500).json('Oops, something went wrong. Try again!'));
}

module.exports = {
    handleImage,
    handleImageApiCall
}