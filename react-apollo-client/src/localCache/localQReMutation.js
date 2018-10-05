import gql from 'graphql-tag';

let Id = 0;

const typeDefs = gql `
    type Song {
        id: ID!
        title: String
        keysPlayed: [String]
    }

    type Query {
      songs: [Song]
      say: String
      songById(id: Int!): Song
      song: Song
    }

    type Mutation {
        addSong(title: String, keysPlayed: [String]): Song
    }
    `
;

const resolvers = {
    Mutation: {
        addSong: (_, {title, keysPlayed}, { cache }) => {
            const query = gql`
            query GetSongs {
              songs @client {
                id
                title
                keysPlayed
              }
            }
          `;
          const previous = cache.readQuery({ query });
          const newSong = {
            id: Id++,
            title,
            keysPlayed,
            __typename: 'SongItem'
          };
          const data = {
            songs: previous.songs.concat([newSong]),
          };
          cache.writeData({ data });
          return newSong;
        },
    }
}


export {typeDefs, resolvers}
