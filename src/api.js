import { makeExecutableSchema } from 'graphql-tools';
import { Price, Market, Bank, Enquiry } from './dbSchema';

const typeDefs = `
type Price {
    id:String!
    sell9999:String!,
    sell999:String!,
    sell9950:String!,
    markets:[Market]
}
type Bank {
    id:String!
    name: String!
    bankName: String!
    branch:String!
    account:String!
    ifsc:String!
}
type Market {
    id:String!
  market : Boolean!
}
type Enquires {
    id:String!
    name:String!
    mobile: String!
    message:String!
    isRead:Boolean!
}

input PriceInput {
    sell9999:String!,
    sell999:String!,
    sell9950:String!,
}

input BankInput {
    name: String!
    bankName: String!
    branch:String!
    account:String!
}

input MarketInput {
    market : Boolean!
}

input EnquiresInput {
    name:String!
    mobile: String!
    message:String!
}

type Query {
    prices: [Price]
    enquires:[Enquires]
    bank:[Bank]
}

type Mutation {
    price(data:PriceInput):Price
    market(data:MarketInput):Market
    enquies(data:EnquiresInput):Enquires
    bank(data:BankInput):Bank
    deleteEnquiry(id:String!):Enquires
}

schema {
  query: Query
  mutation: Mutation
}
`;
const resolvers = {
    Query: {
        async  prices() {
            return await Price.find();
        },
        async enquires() {
            return await Enquiry.find();
        },
        async bank() {
            return await Bank.find();
        }
    },
    Mutation: {
        async price(obj, args) {
            let data = await Price.findOne()
            if (data !== null) {
                await Price.updateOne({ "_id": data._id }, { $set: args.data })
            } else {
                let insert = new Price(args.data)
                await insert.save()
            }
            return await Price.findOne()
        },
        async market(obj, args) {
            let data = await Market.findOne()
            if (data !== null) {
                await Market.updateOne({ "_id": data._id }, { $set: args.data })
            } else {
                let insert = new Market(args.data)
                await insert.save()
            }
            return await Market.findOne()

        },
        async enquies(obj, args) {
            let insert = new Enquiry(args.data)
            return await insert.save()
        },
        async bank(obj, args) {
            let data = await Bank.findOne()
            if (data !== null) {
                await Bank.updateOne({ "_id": data._id }, { $set: args.data })
            } else {
                let insert = new Bank(args.data)
                await insert.save()
            }
            return await Bank.findOne()
        },
        async deleteEnquiry(obj, args) {
            return Enquiry.findByIdAndRemove({ _id: args.id })
        }
    },
    Price: {
        async markets(obj, args) {
            return await Market.find();
        },
    },
};

export default makeExecutableSchema({
    typeDefs,
    resolvers,
});