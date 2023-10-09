import React from 'react';

const TextLines = ({ messages }) => {
    return (
        <div className="text-lines">
            {messages.map((message, index) => (
                <div key={index} className="text-line">
                    {message}
                </div>
            ))}
        </div>
    );
};

export default TextLines;
