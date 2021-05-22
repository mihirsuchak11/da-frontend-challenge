import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import { Column } from 'react-table';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import NoDataFound from '../../components/NoDataFound/NoDataFound';
import ColumnFilter from '../../components/Table/ColumnFilter/ColumnFilter';
import Table from '../../components/Table/Table/Table';
import Songs from '../../utils/Classes/Songs';
import { SongProp } from '../../utils/types';
import './SongsList.scss';

const SongList: React.FC = () => {
  const [data, setData] = useState<SongProp[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Extracting function from the class
  const { getSongs, deleteSong, getToggleVote } = new Songs();

  // Before calling getToggleVote changing up/devote value
  const handleToggleVote = (originalData: any): void => {
    const formData = {
      ...originalData,
      upVote: originalData?.upVote === true ? false : true,
    };
    getToggleVote(originalData.id, formData, setData, setIsLoading);
  };

  // First time songs will fetched from here and set loading false
  useEffect(() => {
    getSongs(setData, setIsLoading);
  }, []);

  // I have added confirm dialog but in a real app we can replace this with any other design (i.e. Popup)
  const handleDelete = (
    id: number,
    setData: React.Dispatch<React.SetStateAction<[] | SongProp[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ): void => {
    if (confirm('Are you sure you want to delete?')) {
      // Delete the song!
      deleteSong(id, setData, setIsLoading);
    }
  };

  const columns: Column<SongProp>[] = useMemo(
    () => [
      {
        Header: 'Song Name',
        accessor: 'song_name',
        Filter: ColumnFilter,
      },
      {
        Header: 'Album Name',
        accessor: 'album_name',
        Filter: ColumnFilter,
      },
      {
        Header: 'Lyrics',
        accessor: 'lyric_text',
        Filter: ColumnFilter,
      },
      {
        Header: 'Action',
        disableFilters: true,
        isSortable: false,
        // eslint-disable-next-line react/display-name
        Cell: ({ row }: any) => {
          return <Button type='danger' icon={FaTrash} onClick={() => handleDelete(row.original.id, setData, setIsLoading)} />;
        },
      },
      {
        Header: 'Vote',
        disableFilters: true,
        // eslint-disable-next-line react/display-name
        Cell: ({ row }: any) => {
          return <Button icon={row.original.upVote ? FaHeart : FaRegHeart} onClick={() => handleToggleVote(row.original)} />;
        },
      },
    ],
    [],
  );

  // eslint-disable-next-line react/jsx-no-undef
  /**
   * First check isLoading is true then show loader after word check length to show now data found.
   */

  /**
   * Since JSON server does not return statuses on error,
   * so always if there is not data NoDataFound component will be shown.`
   */
  return (
    <>
      <Helmet>
        <title>DA Frontend Challenge | Add Song</title>
      </Helmet>
      <Card title='Songs List'>{isLoading ? <Loader /> : data.length ? <Table columns={columns} data={data} /> : <NoDataFound />}</Card>
    </>
  );
};

export default SongList;
