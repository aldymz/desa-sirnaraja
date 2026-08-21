import { getDesaData } from '@/lib/dataService';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Hubungi Kami',
  description: 'Saluran komunikasi resmi Pemerintah Desa Sirnaraja.',
};

export default async function ContactPage() {
  const desaData = await getDesaData();
  return <ContactClient desaData={desaData} />;
}
