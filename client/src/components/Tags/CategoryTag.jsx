import React, { useState, useEffect } from 'react';

function CategoryTag() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch('/tags')
            .then(response => response.json())
            .then(data => setTags(data))
            .catch(error => console.error('Error fetching tags:', error));
    }, []);

    return (
        <div>
            <h2>All Tags</h2>
            {tags.length === 0 ? (
                <p>No tags available.</p>
            ) : (
                <ul>
                    {tags.map(tag => (
                        <li key={tag.id}>
                            
                            <strong>Category:</strong> {tag.category}<br />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CategoryTag;
