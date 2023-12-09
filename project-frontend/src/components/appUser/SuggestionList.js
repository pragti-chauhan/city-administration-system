import React, { useState, useEffect } from 'react';

import { getAllReports} from "../../services/CommunicationService";

const SuggestionList = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getAllReports()
            .then((resp) => {
                // console.log(resp.data);
                const suggestionReports = resp.data.filter(report => report.type === 'suggestion');
                console.log(suggestionReports);
                setSuggestions(suggestionReports);
            })
            .catch((err) => {
                console.log(err);
                setSuggestions([]);
            });
    }, []);

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
    };

    // Filter reports based on the search term
    const filteredReports = suggestions.filter((report) =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Suggestions by the Residents</h2>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search by title..."
                onChange={handleSearch}
                value={searchTerm}
            />

            <ul style={styles.list}>
                {filteredReports.map((suggestion) => (
                    <li key={suggestion.id} style={suggestion.listItem}>
                        <strong style={styles.suggestionTitle}>{suggestion.title}</strong>
                        <p style={styles.suggestionDescription}>{suggestion.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '10px',
    },
    list: {
        listStyle: 'none',
        padding: '0',
    },
    listItem: {
        marginBottom: '20px',
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '5px',
    },
    suggestionTitle: {
        fontSize: '18px',
        marginBottom: '5px',
    },
    suggestionDescription: {
        fontSize: '14px',
        marginBottom: '10px',
    },
};

export default SuggestionList;
