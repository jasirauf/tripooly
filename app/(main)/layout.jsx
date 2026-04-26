import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
