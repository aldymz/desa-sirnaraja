import { getDesaData, getPotensiData, getBannersData, getStatistikData } from '@/lib/dataService';
import HomeClient from './HomeClient';

export const metadata = {
  title: 'Beranda | Desa Sirnaraja',
  description: 'Portal informasi resmi Pemerintah Desa Sirnaraja, Kecamatan Cigalontang, Kabupaten Tasikmalaya.',
};

export default async function HomePage() {
  const [desaData, potensiData, banners, statData] = await Promise.all([
    getDesaData(),
    getPotensiData(),
    getBannersData('beranda'),
    getStatistikData()
  ]);

  return <HomeClient desaData={desaData} potensiData={potensiData} banners={banners} statData={statData} />;
}
