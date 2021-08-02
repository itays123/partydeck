import { Wrapper } from '../Filters/ConditionalWrapper';
import Footer from './Footer';

export default function ScrollablePageWrapper({ children }: Wrapper) {
  return (
    <div className="scrollable">
      <div className="px-8 py-4">{children}</div>
      <Footer />
    </div>
  );
}
