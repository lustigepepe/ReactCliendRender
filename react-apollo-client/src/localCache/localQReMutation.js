import gql from 'graphql-tag';

let Id = 0;


const typeDefs = gql `
    type Song {
        id: ID!
        title: String
        keysPlayed: [Int]
    }

    type sSong {
      id: String
      title: String
      keysPlayed: [Int]
    }

    type Query {
      songs: [Song]
      say: String
      songById(id: Int!): Song
      getPlaySong: sSong
    }

    type Mutation {
        addSong(title: String, keysPlayed: [Int]): Song,
        playSong(title: String, keysPlayed: [Int]):sSong
    }
    `
;

const resolvers = {
    Mutation: {
        addSong: (_, {title, keysPlayed}, { cache }) => {
          console.log(cache)
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
            id: Id,
            title,
            keysPlayed,
            __typename: 'Song'
          };
          // previous.songs = [];
          const data = {
            songs: previous.songs.concat([newSong]),
          };
          cache.writeData({ data });
          return newSong;
        },
        playSong: (_, {title, keysPlayed}, { cache }) => {
          const new_Song = {
            id: 'Active',
            title,
            keysPlayed,
            __typename: 'sSong'
          };
          // console.log("cache")
          // previous.songs = [];
          const data = {
            getPlaySong: new_Song
          };
          cache.writeData({ data });
          return new_Song;
        }
    }
}

export { typeDefs, resolvers };

