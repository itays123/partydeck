import Head from 'next/head';
import { Stylable, WrapperProps } from '../types';

export interface LayoutProps extends WrapperProps, Stylable {
  title?: string;
  description?: string;
}

export default function Layout({
  title = 'Partydeck',
  description = 'A Cool Online Card Game',
  children,
  className,
}: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col md:flex-row-reverse items-stretch w-screen h-screen bg-base-100">
        <div className="flex-grow relative">{children}</div>
      </div>
    </div>
  );
}
