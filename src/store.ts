import { create } from 'zustand';
import { TCaseSchema, TOffenderSchema } from '@/lib/types';

type TCaseForm = TCaseSchema & {
  update: (formData: TCaseSchema) => void,
}

const useCaseForm = create<TCaseForm>((set) => ({
  title: '',
  type: '',
  description: '',
  location: '',
  update: (formData) => set({...formData})
}));

type TCaseFormOffendersStore =  {
  offenders: TOffenderSchema[],
  update: (data: TOffenderSchema) => void,
}

export const useCaseFormOffendersStore = create<TCaseFormOffendersStore>((set) => ({
  offenders: [],
  update: (newData) => set((fields) => ({offenders: [...fields.offenders, newData]})),
}));