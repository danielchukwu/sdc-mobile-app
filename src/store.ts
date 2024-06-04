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

type TCasesStore = {
  cases: TCaseSchema[],
  selectedIndex: number | null,
  updateSelectedIndex: (i: number) => void,
  updateCases: (data: TCaseSchema[]) => void,
}
export const useCasesStore = create<TCasesStore>((set) => ({
  cases: [],
  selectedIndex: null,
  updateSelectedIndex: (i) => set({selectedIndex: i}),
  updateCases: (data) => set({cases: data}),
}))