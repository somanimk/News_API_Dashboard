import React, { useState, useEffect } from 'react';

const PayoutTable = ({ articles }) => {
    
    const [payoutPerArticle, setPayoutPerArticle] = useState(() => {
        return Number(localStorage.getItem('payoutRate')) || 10;
    });

    // Calculate the total payout based on the number of articles
    const totalPayout = articles.length * payoutPerArticle;

    useEffect(() => {
        localStorage.setItem('payoutRate', payoutPerArticle.toString());
        const payoutDetails = {
            totalArticles: articles.length,
            payoutPerArticle,
            totalPayout
        };
        localStorage.setItem('payoutDetails', JSON.stringify(payoutDetails));
    }, [payoutPerArticle, articles]);

    return (
        <div className="stat p-7 bg-white shadow-inner rounded">
            <h1 className="text-lg font-bold">Payout Table</h1>
            <ul>
                <li><strong>Total Articles:</strong> {articles.length}</li>
                <li><strong>Payout per Article:</strong> ${payoutPerArticle}</li>
                <li><strong>Total Payout:</strong> ${totalPayout}</li>
            </ul>
        </div>
    );
};

export default PayoutTable;
