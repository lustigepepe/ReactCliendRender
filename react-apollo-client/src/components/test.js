import React from 'react';
import gql from 'graphql-tag';
import {Subscription} from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

const SONG_SUBSCRIPTION = gql`
subscription songAdded {
  songAdded {
    id,
    title,
    keysPlayed
  }
}
`;

const cache = new InMemoryCache({

});

export default class Test extends React.PureComponent {
    render() {
        return (
            <Subscription subscription={SONG_SUBSCRIPTION}>
                {data => {
                    console.log(data);
                    return null;
                }}
            </Subscription>
        );
    }
}