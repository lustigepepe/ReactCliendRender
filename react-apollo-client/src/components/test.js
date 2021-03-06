import React from 'react';
import gql from 'graphql-tag';
import {Subscription} from 'react-apollo';

const SONG_SUBSCRIPTION = gql`
    subscription songAdded {
        songAdded {
            id,
            title,
            keysPlayed
        }
    }
`;


export default class Test extends React.PureComponent {
    render() {
        return (
            <Subscription subscription={SONG_SUBSCRIPTION}>
                {data => {
                    return null;
                }}
            </Subscription>
        );
    }
}