import React, { useState, useEffect } from 'react';
import EmailComponent from './Email';

const updateServer = (statusEmails, tab) => fetch('http://localhost:3005/api/update',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            statusEmails,
            tab
        })
    }).then(res => res.json())

const deleteSelect = (selectStatus, tab) => fetch('http://localhost:3005/api/deleteSelect',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            selectStatus,
            tab
        })
    }).then(res => res.json())


const EmailList = (props) => {
    const [emails, setEmails] = useState(props.emails);
    const [tab, setTab] = useState(props.tab);
    const [totalPages, setTotalPages] = useState(Math.max(1, Math.ceil((props.emails.length) / 10)));
    const [currPage, setCurrPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [pageEmails, setPageEmails] = useState(props.emails.slice(0, Math.min(10, props.emails.length)));
    const [endIndex, setEndIndex] = useState(Math.min(10, props.emails.length));
    const [selectStatus, setSelectStatus] = useState(new Array(emails.length).fill(0));
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setStartIndex(((currPage - 1) * 10));
        setEndIndex(Math.min(((currPage) * 10), emails.length));
    }
        , [currPage, emails])

    useEffect(() => {
        const emails1 = emails.slice(startIndex, endIndex);
        setPageEmails(emails1);
    }
        , [startIndex, emails])

    useEffect(() => {
        setTotalPages(Math.max(1, Math.ceil((emails.length) / 10)));
    }, [emails, pageEmails])

    useEffect(() => {
    }, [selectStatus]);

    const handleDelete = (idx) => {
        const statusEmails = new Array(emails.length).fill(0);
        statusEmails[idx] = 1;
        if(selectStatus[idx] === 1) {
            setCounter(counter-1);
        }
        selectStatus.splice(idx, 1);
        updateServer(statusEmails, tab).then(data => setEmails(data));
    }

    const handleDeleteAll = () => {
        updateServer(selectStatus, tab).then(data => setEmails(data));
        let newSelectStatus = [...selectStatus];
        newSelectStatus = newSelectStatus.filter((email, idx) => newSelectStatus[idx] === 0)
        setSelectStatus(newSelectStatus);
        setCounter(0);
    }

    const handleChangeArray = (idx, status) => {
        const newSelectStatus = [...selectStatus];
        if (status) {
            newSelectStatus[idx] = 1;
            setCounter(counter + 1);
        }
        else {
            newSelectStatus[idx] = 0;
            setCounter(counter - 1);
        }
        setSelectStatus(newSelectStatus);
    }

    return (
        <div>
            <button className="right" disabled={currPage === totalPages ? true : false} onClick={() => {
                setCurrPage(currPage + 1);
            }}>Next</button>

            <button className="right" disabled={currPage === 1 ? true : false} onClick={() => {
                setCurrPage(currPage - 1);
            }}>Previous</button>

            <button className="center" disabled={counter === 0 ? true : false} onClick={() => {
                handleDeleteAll()
            }}>Delete Marked</button>

            <br></br>
            <br></br>

            {pageEmails
                .map((email, idx) =>
                    <EmailComponent
                        from={email.from}
                        subject={email.subject}
                        to={email.to}
                        important={Math.random() < 0.3}
                        status={selectStatus[Number(startIndex + idx)]}
                        message={email.message}
                        onDelete={() => handleDelete(Number(startIndex + idx))}
                        changeArray={(e) => { handleChangeArray(Number(startIndex + idx), e.target.checked) }} />)}
        </div>
    );


}

export default EmailList;