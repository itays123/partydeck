import { externalLink } from '../../components/buttonFactory';

const CookieDataPolicy = externalLink('Cookie & Data Policy', '/about/privacy'); // we need to close the modal as we redirect

export default function PrivacyStatement() {
  return (
    <p className="w-52 text-xs text-gray-700">
      By clicking 'GO', you agree to the website's{' '}
      <CookieDataPolicy className="underline font-medium" />
    </p>
  );
}
