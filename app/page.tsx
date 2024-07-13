import Card from '@/components/Card';
import prisma from '../lib/prisma';
import ShoppingCart from '@/components/ShoppingCart';

const getItems = async () => {
  const items = await prisma.item.findMany();
  return items;
};

export default async function Home() {
  const items = await getItems();

  return (
    <main
      className="
      md:grid grid-cols-[1fr_300px] lg:grid-cols-[1fr_385px] py-10 md:pt-24 md:pb-24 max-w-7xl 
      mx-auto gap-x-5 w-full px-6
      "
    >
      <div>
        <h1 className="text-rose-950 font-bold text-4xl">Desserts</h1>
        <div className="md:grid flex flex-col gap-y-6 grid-cols-2 xl:grid-cols-3 mt-8 gap-x-5 md:gap-y-9">
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <ShoppingCart />
    </main>
  );
}
