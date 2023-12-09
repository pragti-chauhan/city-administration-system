import React, { useState, useEffect } from 'react';

import { getAllNotices } from "../../services/CommunicationService";

const UserNotices = () => {
    const [notices, setNotice] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getAllNotices()
            .then((resp) => {
                console.log(resp.data);
                setNotice(resp.data);
            })
            .catch((err) => {
                console.log(err);
                setNotice([]);
            });
    }, []);

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
    };

    // Filter reports based on the search term
    const filteredNotices = notices.filter((notice) =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Notices by the City</h2>
            {/* Search input */}
            <input
                type="text"
                placeholder="Search by title..."
                onChange={handleSearch}
                value={searchTerm}
            />

            <ul style={styles.list}>
                {filteredNotices.map((notice) => (
                    <li key={notice.id} style={styles.listItem}>
                        <strong style={styles.noticeTitle}>{notice.title}</strong>
                        <p style={styles.noticeContent}>{notice.content}</p>
                        <p style={styles.noticeInfo}>Issued on: {notice.issuedOn}</p>
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
    noticeTitle: {
        fontSize: '18px',
        marginBottom: '5px',
    },
    noticeContent: {
        fontSize: '14px',
        marginBottom: '10px',
    },
    noticeInfo: {
        fontSize: '12px',
        color: '#888',
    },
};

export default UserNotices;
