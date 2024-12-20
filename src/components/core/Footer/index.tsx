'use client';

import Category from './Category';
import DeepBazar from './DeepBazar';
import MenuList from './MenuList';
import Schedule from './Schedule';

const Footer = () => {
  return (
    <footer className="w-full bg-primary text-white min-h-[400px] py-4">
      <div className="w-full flex justify-start flex-wrap max-w-[1201px] m-auto pt-3 px-3">
        <DeepBazar />
        <MenuList />
        <Category />
        <Schedule />
      </div>
      <div></div>
      <div className="w-full text-center py-4 border-t">
        <h3 className="text-center pt-[10px] pb-[6px]">
          © 2025 | Spot Store{' '}
        </h3>
      </div>
    </footer>
  );
};

export default Footer;
