import React from 'react';
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { PER_PAGE } from '../../../utils/constants';
import { SongProp } from '../../../utils/types';
import Button from '../../Button/Button';
import Pagination from '../../Pagination/Pagination';
import ColumnFilter from '../ColumnFilter/ColumnFilter';
import './Table.scss';

const Table: React.FC<any> = ({ columns, data }) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setAllFilters,
    preGlobalFilteredRows,
    state: { pageIndex, pageSize, filters },
  } = useTable<SongProp>(
    { columns, data, defaultColumn, initialState: { pageSize: PER_PAGE } },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  return (
    <>
      {/* Disabled button if filters length is less than or equal to 0 */}
      <div className='d-flex justify-content-between align-items-center'>
        <span className='text-grey'> Total - {preGlobalFilteredRows?.length} Songs</span>
        <div className='reset-button'>
          <Button
            disabled={filters.length <= 0}
            type='secondary'
            text='Reset All Filter'
            onClick={() => {
              setAllFilters([]);
            }}
          />
        </div>
      </div>
      <table className='table' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, i) => (
                <th {...column.getHeaderProps()} key={i} className={column.id.toLowerCase()}>
                  <div className={`table__header ${!column.canSort ? 'not-sortable' : ''}`}>
                    <span {...column.getSortByToggleProps()} className={column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : ''}>
                      {column.render('Header')}
                    </span>
                  </div>
                  {column.canFilter ? column.render('Filter') : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, i) => {
                  return (
                    <td {...cell.getCellProps()} key={i}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        gotoPage={gotoPage}
        pageIndex={pageIndex}
        previousPage={previousPage}
        pageOptions={pageOptions}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        nextPage={nextPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  );
};

export default Table;
