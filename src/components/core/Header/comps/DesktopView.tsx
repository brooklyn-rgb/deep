import Link from 'next/link';
import { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaCaravan } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';

import { loginOpenModal } from '@/redux/features/loginFirstSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { PATH_USER } from '@/utils/routes';
import { useRouter } from 'next/navigation';
import DeliveryLocation from './DeliveryLocation';
import HamburgerMenuIcon from './Icon';
import Logo from './Logo';
import ProfileButtons from './ProfileButtons';
import SearchBar from './SearchBar';

export default function DesktopView() {
  const user = useAppSelector(state => state.authSlice.user);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const trackOrderHandler = () => {
    if (!user._id)
      return dispatch(loginOpenModal({ redirectUrl: PATH_USER.trackOrder }));
    router.push(PATH_USER.trackOrder);
  };

  return (
    <div className="hidden w-full h-full lg:block">
      <div className="w-full bg-[#F5F5F5] px-4">
        <div className="h-[42px] max-w-[1201px] text-[#666666] font-light mx-auto flex items-center justify-between">
          <h1 className="text-sm">Welcome to worldwide Spot Store!</h1>
          <div className="flex space-x-4">
            <button>
              <Link href="tel:+27781515716" className="flex items-center">
                <CiLocationOn className="text-primary" />
                <p className="ml-[6px] text-sm">
                  Deliver to <b>RSA</b>
                </p>
              </Link>
            </button>
            <span className="bg-[#D9D9D9] h-[18px] w-[1px]" />

            <button onClick={trackOrderHandler} className="flex items-center">
              <FaCaravan className="text-primary" />
              <p className="ml-[6px] text-sm">Track your order</p>
            </button>
            <span className="bg-[#D9D9D9] h-[18px] w-[1px]" />

            <Link href="/best-offers">
              <button className="flex items-center">
                <MdLocalOffer className="text-primary" />
                <p className="ml-[6px] text-sm">Best Offers</p>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-[#EDEDED] px-4">
        <div className="max-w-[1201px] h-full min-h-[90px] mx-auto flex items-center justify-between w-full">
          <div className="flex items-center">
            <HamburgerMenuIcon open={open} setOpen={setOpen} />
            <Logo />
            <DeliveryLocation />
          </div>

          <div className="w-full max-w-[828px] flex items-center justify-end">
            <SearchBar />
            <ProfileButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
