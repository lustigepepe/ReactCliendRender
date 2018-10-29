const {gql} = require('apollo-server');
const { find, filter } = require('lodash');

const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();
const POST_ADDED = 'POST_ADDED';



const songs = [
    {
        id: 1,
        title: 'Some song title',
        keysPlayed: [0, 3, 5]
    },
    {
        id: 2,
        title: 'Next ONe',
        keysPlayed: [0, 3, 5]
    }
];
const song = 
    {
        id: 1,
        title: 'What\'a thing man',
        keysPlayed: [0, 3, 5]
    };

// example data
const authors = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
  ];


const typeDefs = gql `
    type Song {
        id: ID!
        title: String
        keysPlayed: [Int]
    }

    type Author {
        id: Int!
        firstName: String
        lastName: String
      }

    type Query {
      songs: [Song]
      say: String
      songById(id: Int!): Song
      author(id: Int!): Author


    }

    type Mutation {
        newSong(title: String, keysPlayed: [Int]): Song
    }
    type Subscription {
        songAdded: Song
    }
`

const resolvers = {
    Query: {
      songs: () => songs,
      say:() =>'Can you hear me! :: Can you hear me!',
    //   songByTitle: (title_) => { 
    //       songs.find((song) => {
    //           song.title === title_
    //         })
    //     }
        songById: (_, { id }) => find(songs, {id} ),
        author: (_, { id }) => find(authors, {id} ),
    },
    Mutation: {
        newSong: (_, {title, keysPlayed}) => {
            const new_Song = {
                id: songs.length + 1,
                title,
                keysPlayed
            };
            songs.push(new_Song);
            pubsub.publish(POST_ADDED, { songAdded: new_Song });

            return new_Song;
        }
    },
    Subscription: {
        songAdded: {
          subscribe: () => pubsub.asyncIterator([POST_ADDED]),
        },
    }

}


const PORT = 4000;
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({app})

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);


httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})