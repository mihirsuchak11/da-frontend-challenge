import { toast } from 'react-toastify';
import Api from '../Api';
import { SongProp } from '../types';

type SetData = React.Dispatch<React.SetStateAction<[] | SongProp[]>>;
type SetLoading = React.Dispatch<React.SetStateAction<boolean>>;

/**
 * Songs class helps to call different methods.
 * @return {addSong} - function to add a song
 */
export default class Songs {
  /**
   * getSongs will give all the songs.
   * @param setData Function to update a state.
   */
  getSongs = async (setData: SetData, setLoading: SetLoading): Promise<void> => {
    setLoading(true);
    await Api.get<SongProp[]>('/')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Is server running?, run npm run server', { autoClose: 5000 });
        setLoading(false);
      });
  };

  /**
   * addSong will add a single song in a list.
   * @param data Function to update a state.
   */
  addSong = async (formData: SongProp, cb: () => void): Promise<void> => {
    await Api.post<SongProp>('/', formData).then(() => {
      cb();
      toast.success('Successfully added!', { autoClose: 3000 });
    });
  };

  /**
   * deleteSong will delete the single song
   * @param id To delete the record.
   * @param setData Function to update a state.
   */
  deleteSong = async (id: number, setData: SetData, setLoading: SetLoading): Promise<void> => {
    await Api.delete<SongProp>(`/${id}`)
      .then(() => {
        this.getSongs(setData, setLoading);
        toast.success('Successfully deleted!', { autoClose: 3000 });
      })
      .catch(() => {
        toast.error('Something went wrong, please again later', { autoClose: 3000 });
      });
  };
  /**
   * getToggleVote will help to toggle up and down vote the single song
   * @param id To delete the record.
   * @param formData song data.
   * @param setData Function to update a state.
   */
  getToggleVote = async (id: number, formData: SongProp, setData: SetData, setLoading: SetLoading): Promise<void> => {
    await Api.put<SongProp>(`/${id}`, formData).then(() => this.getSongs(setData, setLoading));
  };
}
