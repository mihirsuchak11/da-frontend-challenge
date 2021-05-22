import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Input from '../../components/Form/Input/Input';
import Textarea from '../../components/Form/Textarea/Textarea';
import Songs from '../../utils/Classes/Songs';
import { COMMON_INPUT_VALIDATION } from '../../utils/helper/formHelper';
import { SongProp } from '../../utils/types';

const AddSong: React.FC = () => {
  const history = useHistory();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SongProp>({
    mode: 'onChange',
  });

  const { addSong } = new Songs();
  /**
   * On a success first we show it will be redirected to the home (songs list) page.
   * @param data - form data.
   *
   */
  // NOTE: We can add toast message to show success full added the song.
  const onSubmit = (data: SongProp): any => {
    const formData = {
      ...data,
      id: uuidv4(),
    };
    addSong(formData, () => {
      reset();
      history.push('/');
    });
  };

  return (
    <>
      <Helmet>
        <title>DA Frontend Challenge | Add Song</title>
      </Helmet>
      <Card title='Add New Song'>
        <div className='form_wrapper'>
          <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Input
              label='Song Name'
              name='song_name'
              errorPrefix='Song name'
              placeholder='Song Name'
              errors={errors}
              register={register}
              customValidation={COMMON_INPUT_VALIDATION}
            />
            <Input
              label='Album Name'
              name='album_name'
              errorPrefix='Album name'
              placeholder='Album Name'
              errors={errors}
              register={register}
              customValidation={COMMON_INPUT_VALIDATION}
            />
            <Textarea
              label='Lyrics'
              name='lyric_text'
              errorPrefix='Lyrics'
              placeholder='Lyrics'
              errors={errors}
              register={register}
              customValidation={COMMON_INPUT_VALIDATION}
            />
            <Button onClick={handleSubmit(onSubmit)} text='Submit' />
          </form>
        </div>
      </Card>
    </>
  );
};

export default AddSong;
