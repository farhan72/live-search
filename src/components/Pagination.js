import React from 'react';

export default function Pagination(props) {
    const { totalData, limitPerPage, paginate, activePage } = props;
    const pageNumbers = [];
    for (let index = 1; index < Math.ceil(totalData / limitPerPage); index++) {
        pageNumbers.push(index);
    }
    return (
        <>
            <div className="d-flex justify-content-center mt-4">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {pageNumbers.map((number, index) => (
                            <li className={'page-item ' + (activePage === number ? 'active' : '')} key={index}>
                                <a className="page-link" onClick={() => paginate(number)} href="!#">{number}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}
