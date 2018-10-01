const {ApolloServer, gql} = require('apollo-server');

const songs = [
    {
        id: 1,
        title: 'Some song title',
        keysPlayed: ['C', 'D', 'E']
    },
    {
        id: 2,
        title: 'Next ONe',
        keysPlayed: ['C', 'D', 'E']
    }
];
const song = 
    {
        id: 1,
        title: 'What\'a thing man',
        keysPlayed: ['C', 'D', 'E']
    };
const typeDefs = gql `
    type Song {
        id: ID!
        title: String
        keysPlayed: [String]
    }

    type Query {
      songs: [Song]
      say:String!
      song: Song
    }

    type Mutation {
        addSong(title: String, keysPlayed: [String]): Song
    }
`

const resolvers = {
    Query: {
      songs: () => songs,
      say:()=>'Can you hear me! :: Can you hear me!',
      song:()=>song
    },
    Mutation: {
        addSong: (_, {title, keysPlayed}) => {
            const newSong = {
                id: songs.length + 1,
                title,
                keysPlayed
            };
            songs.push(newSong);

            return newSong;
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server
    .listen()
    .then(({url}) => {
        console.log(`Apollo server running: ${url}`);
    });
