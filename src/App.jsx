import { useState, useEffect } from 'react';
import './App.css';

// let baseUrl = 'http://localhost:8080';
function App() {
    const [animals, setAnimals] = useState([]);
    // const [searchUrl, setSearchUrl] = useState(baseUrl);

    // useEffect(() => {
    //     fetch(searchUrl)
    //         .then((res) => res.json())
    //         .then((data) => setAnimals(data));
    // }, [searchUrl]);

    // const search = (q) => {
    //     setSearchUrl(baseUrl + '?q=' + q);
    // };

    useEffect(() => {
        const lastQuery = localStorage.getItem('lastQuery');
        search(lastQuery);
    }, []);

    const search = async (q) => {
        const response = await fetch(
            'http://localhost:8080?' + new URLSearchParams({ q })
        );
        const data = await response.json();
        setAnimals(data);

        localStorage.setItem('lastQuery', q);
    };

    return (
        <main>
            <h1>Animal Farm</h1>

            <input
                type='text'
                placeholder='Search'
                onChange={(e) => search(e.target.value)}
            />

            <ul>
                {animals.map((animal) => (
                    <Animal key={animal.id} {...animal} />
                ))}

                {animals.length === 0 && 'No animals found'}
            </ul>
        </main>
    );
}

function Animal({ type, name, age }) {
    return (
        <li>
            <strong>{type}</strong> {name} ({age} years old )
        </li>
    );
}

export default App;
