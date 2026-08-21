import { getPotensiData } from '@/lib/dataService';
import PotensiClient from './PotensiClient';

export const metadata = {
  title: 'Potensi Desa',
  description: 'Eksplorasi kekayaan alam, UMKM, dan budaya Desa Sirnaraja.',
};

export default async function PotensiPage() {
  const potensiData = await getPotensiData();
  return <PotensiClient initialData={potensiData} />;
}
