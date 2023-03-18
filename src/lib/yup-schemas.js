import * as Yup from 'yup';

export const NamespaceNameCreationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
});