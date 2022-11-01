import { useState } from 'react'

export default function Sample(){
    const [ user, setUser ] = useState('samole')
    return (
        <>
            <h1>{user}</h1>
            <button onClick={() => setUser('Changed User0')}>
                Changed User0
            </button> 
            <button onClick={() => setUser('Changed User1')}>
                Changed User1
            </button> 
            <button onClick={() => setUser('Changed User2')}>
                Changed User2
            </button> 
            <button onClick={() => setUser('Changed User3')}>
                Changed User3
            </button> 
            <button onClick={() => setUser('Changed User4')}>
                Changed User4
            </button>
        </>
    );
}