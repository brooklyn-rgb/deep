import CheckBox from '@/components/common/CheckBox';
import Input from '@/components/common/Input';
import Skeleton from '@/components/common/Skeleton';
import { useGetCategoryQuery } from '@/redux/services/categoryApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

export default function Sidebar() {
  const { data, isSuccess, isLoading } = useGetCategoryQuery();
  const [priceLength, setPriceLength] = useState<number>(0);
  const [prices, setPrices] = useState<{
    startPrice: number;
    endPrice: number;
  }>({
    startPrice: 0,
    endPrice: 0,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryName = searchParams.get('category');

  const categoryLoadingSkeleton = (
    <>
      <Skeleton width={'100%'} height={20} className="mb-2" />
      <Skeleton width={'100%'} height={20} className="mb-2" />
      <Skeleton width={'100%'} height={20} className="mb-2" />
      <Skeleton width={'100%'} height={20} className="mb-2" />
      <Skeleton width={'100%'} height={20} className="mb-2" />
    </>
  );

  // INPUT HANDLER
  const inputPriceChangeHandler = (
    field: 'startPrice' | 'endPrice',
    value: string
  ) => {
    const input = parseFloat(value);

    if (isNaN(input)) return;

    setPrices(prevS => ({
      ...prevS,
      [field]: Number(input),
    }));
  };

  // PRICE INPUT HANDLER
  const priceInputFilterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    const queryParams = new URLSearchParams(window.location.search);

    if (
      isNaN(prices.startPrice) ||
      isNaN(prices.endPrice) ||
      prices.startPrice < 0 ||
      prices.endPrice < 0
    )
      return;

    queryParams.set('startPrice', prices.startPrice.toString());
    queryParams.set('endPrice', prices.endPrice.toString());
    router.replace(`/shop?${queryParams.toString()}`);
  };

  // CATEGORY SELECT HANDLER
  const selectCategoryHandler = (category: string) => {
    const queryParams = new URLSearchParams(window.location.search);

    if (category === categoryName) {
      queryParams.delete('category');
    } else {
      queryParams.set('category', category);
    }
    router.replace(`/shop?${queryParams.toString()}`);
  };

  // SELECT PRE CREATED PRICE RANGE
  const priceOnSelectFilterHandler = (priceListLength: number) => {
    const queryParams = new URLSearchParams(window.location.search);

    // IF CLICK THE SAME PRICE AGAIN THEN REMOVE IT FROM QUERIES
    if (priceLength === priceListLength) {
      setPriceLength(0);
      queryParams.delete('startPrice');
      queryParams.delete('endPrice');

      return router.replace(`/shop?${queryParams}`);
    } else {
      setPriceLength(priceListLength);

      // IF USER SELECT ALL PRICE , THEN REMOVE PRICE QUERIES
      if (priceRangeList[priceListLength].text === 'All Price') {
        queryParams.delete('startPrice');
        queryParams.delete('endPrice');

        return router.replace(`/shop?${queryParams}`);
      }

      queryParams.set(
        'startPrice',
        priceRangeList[priceListLength].startPrice.toString()
      );
      queryParams.set(
        'endPrice',
        priceRangeList[priceListLength].endPrice.toString()
      );

      router.replace(`/shop?${queryParams.toString()}`);
    }
  };

  return (
    <div className="bg-white pt-4 px-4 rounded-[6px] border border-gray-200 border-dashed mb-4 max-w-[280px]">
      <h1 className="text-lg mb-[16px] font-medium">Category</h1>
      <ul className="border-b border-gray-200">
        {isLoading && categoryLoadingSkeleton}

        {isSuccess &&
          data.data.map(category => (
            <li
              key={category._id}
              onClick={() => selectCategoryHandler(category.name)}
              className="mb-3 flex items-center h-[20px] text-sm cursor-pointer active:scale-95 duration-150"
            >
              <CheckBox
                name={category.name}
                isChecked={
                  categoryName
                    ? categoryName.trim().toLowerCase() ===
                      category.name.toLowerCase()
                    : false
                }
              />
              <span className="ml-[8px]">{category.name}</span>
            </li>
          ))}
      </ul>

      <h1 className="text-lg mt-[30px] mb-[16px] font-medium">Price</h1>
      <div className="w-full flex items-center justify-between h-8">
        <Input
          placeholder="Min price"
          containerClassName="max-w-[47%] h-full"
          type="number"
          min={0}
          value={prices.startPrice === 0 ? '' : prices.startPrice}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            inputPriceChangeHandler('startPrice', event.target.value)
          }
          onKeyDown={priceInputFilterHandler}
          className="h-full w-full bg-white border border-gray-200 rounded-[6px]"
        />
        <Input
          placeholder="Max price"
          containerClassName="max-w-[47%] h-full"
          type="number"
          min={0}
          value={prices.endPrice === 0 ? '' : prices.endPrice}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            inputPriceChangeHandler('endPrice', event.target.value)
          }
          onKeyDown={priceInputFilterHandler}
          className="h-full w-full bg-white border border-gray-200 rounded-[6px]"
        />
      </div>
      <ul className="mt-4">
        {priceRangeList.map((price, i) => (
          <li
            key={price.id}
            onClick={() => priceOnSelectFilterHandler(i)}
            className="mb-3 flex items-center h-[20px] text-sm cursor-pointer active:scale-95 duration-150"
          >
            <CheckBox name={price.text} isChecked={i === priceLength} />
            <span className="ml-[8px]">{price.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const priceRangeList = [
  {
    id: 1,
    text: 'All Price',
    startPrice: 1,
    endPrice: 0,
  },
  {
    id: 2,
    text: 'Under R100',
    startPrice: 1,
    endPrice: 100,
  },
  {
    id: 3,
    text: 'R200 to R1000',
    startPrice: 200,
    endPrice: 1000,
  },
  {
    id: 4,
    text: 'R1000 to R5000',
    startPrice: 1000,
    endPrice: 5000,
  },
  {
    id: 5,
    text: 'R5000 to R10000',
    startPrice: 5000,
    endPrice: 10000,
  },
  {
    id: 6,
    text: 'R10000 to 100000',
    startPrice: 10000,
    endPrice: 100000,
  },
  {
    id: 7,
    text: 'R10000 to R200000',
    startPrice: 10000,
    endPrice: 200000,
  },
];
