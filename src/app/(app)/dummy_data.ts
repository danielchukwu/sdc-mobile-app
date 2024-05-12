
export type TOffender = {
  id: string,
  name: string,
  email: string,
  matricNo: string,
  statement: string,
};

export type TCase = {
  id: string,
  title: string,
  location: string,
  description: string,
  offenders: TOffender[],
  createdAt: string,
}

export const DemoOffender: TOffender = {
  id: Math.random().toString(),
  name: 'Anointing danjuma',
  email: 'biga_dape@gmail.com',
  matricNo: 'BHU/20/04/05/0010',
  statement: 'I was out with the boys when we were caught smoking indian hem, mr harry was the one that caught us and we taught he wasnt going to be a snitch but boy did he plan to surprise us. Which he did, we are extremely sorry.'
}

export const DemoCase: TCase = {
  id: '5',
  location: 'Back of girls hostel',
  title: 'Caught 4 boys smoking',
  offenders: Array.from({length: 10}).fill(DemoOffender) as TOffender[],
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen bookLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  createdAt: '11/12/13'
}