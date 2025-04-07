import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
