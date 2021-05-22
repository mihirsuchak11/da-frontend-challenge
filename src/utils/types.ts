import { DeepMap, FieldError, FieldValues } from 'react-hook-form';

export interface SongProp {
  id?: string;
  song_name: string;
  album_name: string;
  lyric_text: string;
}

export interface FormProps {
  placeholder: string;
  label?: string;
  errorPrefix?: string;
  errors?: DeepMap<FieldValues, FieldError> | undefined;
  name: string;
  customValidation?: Record<string, unknown>;
  required?: boolean;
}
