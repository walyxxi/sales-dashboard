import PropTypes from "prop-types";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children, title }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen min-w-full bg-gray-50 dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 relative flex flex-col">
          <Header title={title} />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;