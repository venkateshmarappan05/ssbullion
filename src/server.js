import express from 'express'; 
import cors from 'cors'
import bodyParser from 'body-parser';
import schema from './api'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose';

let app = express()


app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors())

mongoose.connect('mongodb+srv://ssbullion:ssbullion@cluster0-onpzi.mongodb.net/ssbullion?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
mongoose.connection.once('open', () => {
    console.log('db connected')
});

app.use('', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.use((req, res) => {
	res.status(404).json({
		errors: {
			global: "Page Not Found."
		}
	})
})


app.listen(4000, () => console.log('Example app listening on port 4000!'))

