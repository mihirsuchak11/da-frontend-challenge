import React from 'react';
import { FilterValue } from 'react-table';
import Input from '../../Form/Input/Input';
import './ColumnFilter.scss';

interface ColumnFilterProps {
  column: { filterValue: FilterValue; setFilter: (updater: ((filterValue: FilterValue) => FilterValue) | FilterValue) => void };
}

const ColumnFilter: React.FC<ColumnFilterProps> = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div className='column-filter'>
      <Input
        onChange={(e: any) => {
          setFilter(e.target.value);
        }}
        value={filterValue || ''}
        name='song_name'
        placeholder='Search here'
      />
    </div>
  );
};

export default ColumnFilter;
