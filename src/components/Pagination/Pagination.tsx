import React from 'react';
import './Pagination.scss';

interface PaginationProps {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  pageIndex: number;
  previousPage: () => void;
  pageOptions: number[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  nextPage: () => void;
  pageSize: number | undefined;
  setPageSize: (pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  gotoPage,
  pageIndex,
  previousPage,
  pageOptions,
  canPreviousPage,
  canNextPage,
  pageCount,
  nextPage,
  pageSize,
  setPageSize,
}) => {
  return (
    <ul className='pagination'>
      <li className={`pagination__item ${!canPreviousPage ? 'disabled' : ''}`}>
        <span role='button' onClick={() => gotoPage(0)}>
          First
        </span>
      </li>
      <li className={`pagination__item ${!canPreviousPage ? 'disabled' : ''}`}>
        <span role='button' onClick={() => previousPage()}>
          Prev
        </span>
      </li>
      <li className={`pagination__item ${!canNextPage ? 'disabled' : ''}`}>
        <span role='button' onClick={() => nextPage()}>
          Next
        </span>
      </li>
      <li className={`pagination__item ${!canNextPage ? 'disabled' : ''}`}>
        <span role='button' onClick={() => gotoPage(pageCount - 1)}>
          Last
        </span>
      </li>
      <div className='pagination__page-info'>
        {pageIndex + 1} of {pageOptions.length}
      </div>
      {/* We can also make global component for select, like input and textarea */}
      <select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 25, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </ul>
  );
};

export default Pagination;
