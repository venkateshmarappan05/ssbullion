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

app.use('/api', graphqlHTTP({
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
let port=  process.env.PORT || 4000 

app.listen(port, () => console.log(`app listening on port ${port}`));
