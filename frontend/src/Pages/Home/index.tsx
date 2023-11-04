import React from 'react';
import { API_URL } from '../../context/settings';

const Home: React.FC = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>('');
    const [data, setData] = React.useState<string>('');

    React.useEffect(() => {
        fetch(API_URL)
            .then((res) =>
                res.json()
            ).then((data) => {
                setData(data.message);
                setLoading(false);
            }).catch((error) => {
                console.log(error)
                setError(error.message);
                setLoading(false);
            });
    }
        , []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return <div>{data}</div>;
};

export default Home;
