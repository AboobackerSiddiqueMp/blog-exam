import React from 'react';
import Card from 'react-bootstrap/Card';

function Blogcards(data) {
    console.log("vvv",data)
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{data.title.title}</Card.Title>
                    <Card.Text>{data.title.blogs}</Card.Text>
                    
                </Card.Body>
            </Card>
        </div>
    );
}

export default Blogcards;
