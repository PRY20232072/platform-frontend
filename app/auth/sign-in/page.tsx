import { Button } from '@nextui-org/react';
import Link from 'next/link';
export default function SignInPage() {
  return (
    <div className="justify-center items-center flex w-full flex-col pt-40 px-20 max-md:max-w-full max-md:px-5 max-md:py-24 ">
      <div className="text-center text-4xl font-bold leading-10 max-w-[520px] max-md:max-w-full">
        Sign In
      </div>
      <div className="text-center text-base leading-6 max-w-[568px] mt-6 max-md:max-w-full">
        Sign in to access your medical records
      </div>

      <Button className="bg-blue-600 text-white font-medium leading-6 whitespace-nowrap justify-center items-stretch w-[134px] max-w-full mt-6 px-4 py-2 rounded-xl">
        <Link href="/api/auth/signin">Login</Link>
      </Button>

      <div className="justify-center items-stretch flex w-[188px] max-w-full gap-1 mt-6">
        <div className=" text-sm leading-5">Forgot your password?</div>
        <div className="w-3 h-3 relative" />
      </div>
      <div className="justify-center items-stretch flex mb-0 w-[245px] max-w-full gap-1 mt-6 max-md:mb-2.5">
        <div>
          <span className="text-sm leading-5 w-full ">
            Don&apos;t have an account?
          </span>
          <span className="text-sm font-bold ml-1">Sign Up</span>
        </div>
        <div className="w-3 h-3 relative" />
      </div>
    </div>
  );
}
