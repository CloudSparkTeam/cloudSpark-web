import React from 'react';

interface ErrorProps {
    message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => <p className="text-red-600">{message}</p>;

export default Error;
