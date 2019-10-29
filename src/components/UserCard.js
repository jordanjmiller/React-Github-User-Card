import React from 'react'

export default function UserCard(props) {
    // console.log('UC Props: ', props)
    return (
        <div className='card'>
            <div><img src={`${props.avatar_url}`}/></div>
            <div className='userInfo'>
                <h1>{props.name}</h1>
                <p>{props.login}</p>
                <p>Location: {props.location}</p>
                <p>Public Repos: {props.public_repos}</p>
                <p>Followers: {props.followers}</p>
                <p>Following: {props.following}</p>
            </div>
        </div>
    )
}
