import React, {useState, useEffect} from 'react';
import SimpleLink from '../link/SimpleLink';
import cl from './Pagination.module.css';

const Pagination = ({currentPage, lastPage, selectPage}) => {
    const [pages, setPages] = useState([]);

    const getPages = (firstPage, lastPage) => {
        let pages = [];

        for (let i = firstPage; i <= lastPage; i++) {
            pages.push(i);
        }

        return pages;
    }

    useEffect(() => {
        setPages(getPages(1, lastPage));
    }, []);

    return (
        <div className={cl.paginationWrapper}>
            {pages.map(page =>
                <SimpleLink
                    key={page}
                    args={page}
                    active={page === currentPage ? true : false}
                    moveTo={selectPage}
                    style={{margin: '1rem',}}
                >
                    {page}
                </SimpleLink>
            )}
        </div>
    );
}

export default Pagination;
