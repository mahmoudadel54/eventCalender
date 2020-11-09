import React from 'react'
import {Link} from 'react-router-dom'
export default function Home() {
    return (
        <div className='col'>
            <h1 style={{textAlign:'center'}}>Home Page</h1>
            <div style={{textAlign:'center', margin:'3vw'}}>
                <Link className='btn btn-danger' to ="/event">Event Page </Link>
            </div>            
        </div>
    )
}
