import { getAparaturData, getDesaData, getBannersData } from '@/lib/dataService';
import ProfilClient from './ProfilClient';

export const metadata = {
  title: 'Profil Desa',
  description: 'Mengenal lebih dekat gambaran umum, visi-misi, dan pemerintahan Desa Sirnaraja.',
};

export default async function ProfilPage() {
  const aparaturData = await getAparaturData();
  const desaData = await getDesaData();
  const banners = await getBannersData('profil');
  const heroImage = banners?.length > 0 ? banners[0].image_url : '/images/gerbang desa.jpeg';
  
  return <ProfilClient aparaturData={aparaturData} desaData={desaData} heroImage={heroImage} />;
}
